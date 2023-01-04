import User from "../models/User.js";
import createError from "../utility/createError.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { randomCode } from "../utility/math.js";
import { sendActivationLink, sendpasswordResetLink } from "../utility/sendMail.js";
import { sendOTP } from "../utility/sendSMS.js";
import { createToken, tokenVerify } from "../utility/token.js";
import { isEmail, isMobile } from "../utility/validation.js";

/**
 * @route /api/user/register
 * @desc  user register
 * @method POST
 * @access public
*/
export const register = async ( req, res, next ) => {
    try {
        
        // get body data
        const { first_name, sur_name, auth, password, gender, birth_date, birth_month, birth_year } = req.body

        // validation
        if( !first_name || !sur_name || !auth || !password || !gender ){
            return next(createError(404, "All fields are requried"))
        }

        // initial mobile and email value
        let email_data = null
        let mobile_data = null
        if(isEmail(auth)){
            email_data = auth

            // check email user
            const email_check = await User.findOne({ email : auth })
            if(email_check){
                next(createError(400,"Email already exists"))
            }
        } else if (isMobile(auth)){
            mobile_data = auth

              // check mobile user
              const mobile_check = await User.findOne({ mobile : auth })
              if(mobile_check){
                  next(createError(400,"Mobile Number already exists"))
              }
        }else {
            next(createError(400, "Invalid email or mobile number"))
        }
        
        // activition code
        let activation_code = randomCode(100000, 999999)

        // check activation code
        const check_code = await User.findOne({ access_token : activation_code })
        if(!check_code){
            activation_code = randomCode(100000, 999999)
        }

        // create user
        const user = await User.create({
            first_name, 
            sur_name, 
            email : email_data,
            mobile : mobile_data, 
            password : hashPassword(password),
            gender, 
            birth_date, 
            birth_month, 
            birth_year,
            access_token : activation_code

        })
      
        if( user ){

            if(email_data){
            // create activation expeir token link
            const activation_token = createToken({ id : user._id }, '30d')

            // send email
            sendActivationLink(user.email, {

                name : user.first_name +" "+ user.sur_name,
                link : `${process.env.APP_URL+":"+process.env.SERVER_PORT }/api/v1/user/account-activate/${activation_token}`,
                code : activation_code

            })

            res.status(200).cookie('otp', user.email, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                message : "User Registration successfull",
                user : user
            })

            }


            if(mobile_data){
                sendOTP(user.mobile,
                    `Hi, ${user.first_name} ${user.sur_name}, Your account verifaction code is ${activation_code} `
                 )
                
                res.status(200).cookie('otp', user.mobile, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                    message : "User Registration successfull",
                    user : user
                })

            }

        }

    } catch (error) {
        next(error)
    }

};


/**
 * @route /api/user/resend-activation
 * @desc  resend account activation link
 * @method POST
 * @access public
*/

export const resendActivationLink = async (req, res, next) => {
    const { auth } = req.body
    try {

           // initial mobile and email value
           let email_data = null
           let mobile_data = null
           let email_check;
           let mobile_check;

           if(isEmail(auth)){
               email_data = auth
   
               // check email user
                email_check = await User.findOne({ email : auth })
               if(!email_check){
                   next(createError(404,"Email User Account Not Found"))
               }
               if(email_check.isActivited){
                   next(createError(400,"Account Already Activated"))
               }

           } else if (isMobile(auth)){
               mobile_data = auth
   
                 // check mobile user
                  mobile_check = await User.findOne({ mobile : auth })
                 if(!mobile_check){
                     next(createError(400,"Mobile Number User Account Not Found"))
                 }
                 if(mobile_check.isActivited){
                    next(createError(400,"Mobile Number User Account Already Activate"))
                 }

           }else {
               next(createError(400, "Invalid email or mobile number"))
           }

        
        // activition code
        let activation_code = randomCode(100000, 999999)
        // check activation code
        const check_code = await User.findOne({ access_token : activation_code })
        if(!check_code){
            activation_code = randomCode(100000, 999999)
        }

        // send otp
        if(mobile_data){
            sendOTP(mobile_check.mobile,
                `Hi, ${mobile_check.first_name} ${mobile_check.sur_name}, Your account verifaction code is ${activation_code} `
             )
            
             // update access token
             await User.findByIdAndUpdate(mobile_check._id, {
                access_token : activation_code
            })
            
            
            res.status(200).cookie('otp', mobile_check.mobile, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                message : "Activation OPT sent again",
            })

        }

        if(email_data){
             // create activation expeir token link
             const activation_token = createToken({ id : email_check._id }, '30d')

             // send email
            sendActivationLink(email_check.email, {
 
                 name : email_check.first_name +" "+ email_check.sur_name,
                 link : `${process.env.APP_URL+":"+process.env.SERVER_PORT }/api/v1/user/account-activate/${activation_token}`,
                 code : activation_code
 
             })
 
             // update access token
             await User.findByIdAndUpdate(email_check._id, {
                 access_token : activation_code
             })
             
             res.status(200).cookie('otp', email_check.email, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                 message : "Activation Link has been sent again",
             })
        }

    } catch (error) {
        next(error)
    }
}

export const resendResetPasswordOTP = async (req, res, next) => {
    const { auth } = req.body
    try {

           // initial mobile and email value
           let email_data = null
           let mobile_data = null
           let email_check;
           let mobile_check;

           if(isEmail(auth)){
               email_data = auth
   
               // check email user
                email_check = await User.findOne({ email : auth })
               if(!email_check){
                   next(createError(404,"Email User Account Not Found"))
               }
           } else if (isMobile(auth)){
               mobile_data = auth
   
                 // check mobile user
                  mobile_check = await User.findOne({ mobile : auth })
                 if(!mobile_check){
                     next(createError(400,"Mobile Number User Account Not Found"))
                 }
           }else {
               next(createError(400, "Invalid email or mobile number"))
           }

        
        // activition code
        let activation_code = randomCode(100000, 999999)
        // check activation code
        const check_code = await User.findOne({ access_token : activation_code })
        if(!check_code){
            activation_code = randomCode(100000, 999999)
        }

        // send otp
        if(mobile_data){
            sendOTP(mobile_check.mobile,
                `Hi, ${mobile_check.first_name} ${mobile_check.sur_name}, Your account verifaction code is ${activation_code} `
             )
            
             // update access token
             await User.findByIdAndUpdate(mobile_check._id, {
                access_token : activation_code
            })
                     
            res.status(200).cookie('otp', mobile_check.mobile, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                message : "Reset Password OTP has sent",
            })

        }

        if(email_data){
             // create activation expeir token link
             const activation_token = createToken({ id : email_check._id }, '30d')

             // send email
            sendActivationLink(email_check.email, {
 
                 name : email_check.first_name +" "+ email_check.sur_name,
                 link : `${process.env.APP_URL+":"+process.env.SERVER_PORT }/api/v1/user/account-activate/${activation_token}`,
                 code : activation_code
 
             })
 
             // update access token
             await User.findByIdAndUpdate(email_check._id, {
                 access_token : activation_code
             })
             
             res.status(200).cookie('otp', email_check.email, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                 message : "Reset Password Link has sent",
             })
        }

    } catch (error) {
        next(error)
    }
}


/**
 * @route /api/user/login
 * @desc  user login
 * @method POST
 * @access public
*/
export const login = async ( req, res, next ) => {
   // form-data
   const { auth, password } = req.body
   // validation
   if( !auth || !password ){
    next(createError(404, "All fields are requried"))
   }
   // email or mobile user initail value   
   let email_data = null
   let mobile_data = null
   // check email user 
   if( isEmail(auth) ){
       email_data = auth
       const email_user = await User.findOne({ email : auth })
       if(!email_user){
        return next(createError(400, "User Not Found"))
     } else {
        if( !passwordVerify(password, email_user.password) ){
            next(createError(404, "Wrong Password"))
        }else {

            const token = createToken({ id : email_user._id }, '365d') 

            res.status(200).cookie('authToken', token).json({
                success : true,
                user : email_user,
                token: token
            })

        }
     }
       
   } 

   //  chekc mobile user  
   if( isMobile(auth) ){
       mobile_data = auth
       const mobile_user = await User.findOne({ mobile : auth })
      
       if(!mobile_user){
        return next(createError(400, "User Not Found"))
      } else {

        if( !passwordVerify(password, mobile_user.password) ){
            next(createError(404, "Wrong Password"))
        }else {

            const token = createToken({ id : mobile_user._id }, '365d') 

            res.status(200).cookie('authToken', token).json({
                success : true,
                user : mobile_user,
                token: token
            })

        }
      }    
   } 
 
};


/**
 * @route /api/user/me
 * @desc  get logged in  user
 * @method get
 * @access admin
*/
export const loggedInUser = async ( req, res, next ) => {

    try {
        
        // get token
        const auth_token  = req.headers.authorization
        
        // check token
        if(!auth_token){
            next(createError(400, "Token Not Found"))
        } 

        if(auth_token){

            const token = auth_token.split(' ')[1]
            const user = tokenVerify(token)

            // match token
            if(!user){
                next(createError(400, "Invalid Token"))
            }

            if(user){

                const loggedin_user = await User.findById(user.id)

                // check logged in user
                if( !loggedin_user ){
                    next(createError(400, "User Not Found"))
                }

                if(loggedin_user){
                    res.status(200).json({
                        message : "Action successful",
                        user : loggedin_user
                    })
                }

            }

        }

    } catch (error) {
        next(error)
    }
  
};


/**
 * @route /api/user/account-activate/:token
 * @desc  account activation by email
 * @method get
 * @access public
*/

export const accountActivation  = async ( req, res, next ) => {

    try {

        // get token
        const {token} = req.params;

        // verify token
        const tokenData = tokenVerify(token)

        // check token
        if(!token){
            next(createError(400, 'Invalid Activation URL'))
        }

        // verify token
        if(!tokenData){
            next(createError(400, 'Invalid Token URL, Try again'))
        }

        // activate account
        if(tokenData){
            
            const account = User.findById(tokenData.id)

            if( !account.isActivited == true ){
                next(createError(400, 'Account already activate'))
            }else{

                await User.findByIdAndUpdate(tokenData.id, {
                    isActivited : true,
                    access_token : ""
                })

            }

        }

    } catch (error) {
        next(error)
    }    

};


/**
 * @route /api/v1/user/code-activation
 * @desc   account actavitaiion by code
 * @method POST
 * @access public
*/
export const accountActivationByCode = async (req,res,next) => {
  try {
    
    // get activation code
    const { code, auth } = req.body
    
    // get activation user
    const user = await User.findOne().or([{ email : auth }, {mobile : auth}])
    
    // check user`
    if(!user){
        next(createError(400, "Activation user not found"))
    } else {

        if(user.isActivited == true){
            next(createError(400, "Account already activated"))
        } else {

            if(user.access_token != code){
                next(createError(400, "OPT doesn't match"))
            } else {
                await User.findByIdAndUpdate(user._id, {
                    isActivited : true,
                    access_token : ""
                })
        
                res.status(200).json({
                    message : "Account activation successfull"
                })
            }
        }

    }

  } catch (error) {
    next(error)
  }        
};


/**
 * @route /api/v1/user/forget-password
 * @desc   forget password
 * @method POST
 * @access public
*/
export const forgetPassword = async ( req, res, next ) => {

    try {
        
        // get email
        const { email } = req.body

        // find out user by email
        const user = await User.findOne({ email : email })

        // check user
        if( !user ){
            next(createError(400, "User not found"))
        }

        if(user){

             // activition code
            let activation_code = randomCode(10000, 99999)

            // check activation code
            const check_code = await User.findOne({ access_token : activation_code })
            if(!check_code){
                activation_code = randomCode(10000, 99999)
            }

            // create activation expeir token link
            const passwordReset_token = createToken({ id : user._id }, '30m')

            // send email
            sendpasswordResetLink(user.email, {

                name : user.first_name +" "+ user.sur_name,
                link : `${process.env.APP_URL+":"+process.env.SERVER_PORT }/api/v1/user/forget-password/${passwordReset_token}`,
                code : activation_code

            })
            
            res.status(200).json({
                message : "Password Reset Link send on your email",
                access_token : activation_code
            })

        }

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }

}



/**
 * @route /api/user/account-activate/:token
 * @desc  account activation by email
 * @method get
 * @access public
*/

export const resetPasswordAction  = async ( req, res, next ) => {

    try {

        // get token
        const {token} = req.params;
        const { password } = req.body;

        // verify token
        const tokenData = tokenVerify(token)

        // check token
        if(!token){
            next(createError(400, 'Invalid Reset Password URL'))
        }

        // verify token
        if(!tokenData){
            next(createError(400, 'Invalid Token'))
        }

        // activate account
        if(tokenData){
            
            const user = await User.findById(tokenData.id)

            if(!user){
                next(createError(400, "reset user not found"))
            }

            if(user){

                await User.findByIdAndUpdate(user._id, {
                    password : hashPassword(password),
                    access_token : ''
                })

                res.status(200).json({
                    message : "Password Reset Done"
                })

            }
            

        }

    } catch (error) {
        next(error)
    }    

};

/**
 * Find user account for reset passowrd
 */
export const findUserAccount = async ( req, res, next ) => {
    const { auth } = req.body
    try {

        // activition code
        let activation_code = randomCode(100000, 999999)

        // check activation code
        const check_code = await User.findOne({ access_token : activation_code })
        if(!check_code){
            activation_code = randomCode(100000, 999999)
        }
     
        // initial mobile and email value
        let email_data = null
        let mobile_data = null
        let email_check;
        let mobile_check;

        if(isEmail(auth)){
            email_data = auth

            // check email user
            email_check = await User.findOne({ email : auth })
            if(!email_check){
                next(createError(400,"Email User Not Found"))
            } else {
                // create activation expeir token link
                const activation_token = createToken({ id : email_check._id }, '30d')

                res.status(200).cookie('findUser', JSON.stringify({ 
                    name : email_check.first_name + " " + email_check.sur_name,
                    email : email_check.email,
                    photo : email_check.profile_photo
                 }) ,{ expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                    message : "User Registration successfull",
                })
                }
        } else if (isMobile(auth)){
            mobile_data = auth

                // check mobile user
                mobile_check = await User.findOne({ mobile : auth })
                if(!mobile_check){
                    next(createError(400,"Mobile user not found"))
                }

                res.status(200).cookie('findUser', JSON.stringify({ 
                    name : mobile_check.first_name + " " + mobile_check.sur_name,
                    email : mobile_check.mobile,
                    photo : mobile_check.profile_photo
                 }), { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                    message : "User Registration successfull",
                })

        }else {
            next(createError(400, "Invalid email or mobile number"))
        }

        if(email_data){

        }
        
    } catch (error) {
        next(error)
    }
};

/**
 * send password reset otp or link
 */
export const passwordResetOtporLink = async ( req, res, next ) => {
   const { auth } = req.body
    try {
    
        let email_data = null
        let mobile_data= null
        let email_check;
        let mobile_check;

        if(isEmail(auth)){
            email_data = auth
            email_check = await User.findOne({ email : auth })
        } else if (isMobile(auth)){
            mobile_data = auth
            mobile_check = await User.findOne({ mobile : auth })
        } else {
            next(createError(400, "Invalid Email Or Mobile number"))
        }

        // activition code
        let activation_code = randomCode(100000, 999999)

        // check activation code
        const check_code = await User.findOne({ access_token : activation_code })
        if(!check_code){
            activation_code = randomCode(100000, 999999)
        }

        
        if(email_data){
            // create activation expeir token link
            const activation_token = createToken({ id : email_check._id }, '30d')

            // send email
            sendActivationLink(email_check.email, {

                name : email_check.first_name +" "+ email_check.sur_name,
                link : `${process.env.APP_URL+":"+process.env.SERVER_PORT }/api/v1/user/account-activate/${activation_token}`,
                code : activation_code

            })

            //   update access token
              await User.findByIdAndUpdate(email_check._id, {
                access_token : activation_code
            })

            res.status(200).cookie('otp', email_check.email, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                message : "Reset OPT has sent"
            })

        }


        if(mobile_data){
            sendOTP(mobile_check.mobile,
                `Hi, ${mobile_check.first_name} ${mobile_check.sur_name}, Your account verifaction code is ${activation_code} `
             )
            
             // update access token
             await User.findByIdAndUpdate(mobile_check._id, {
                access_token : activation_code
            })
            
            
            res.status(200).cookie('otp', mobile_check.mobile, { expires: new Date(Date.now() + 1000 * 60 *15)}).json({
                message : "Reset Password OTP has sent",
            })
        }

        
    } catch (error) {
        next(error)
    }
}


/**
 * Password reset otp check
 */
export const passwordResetOtpCheck = async (req, res, next) => {
    
    const { auth, code } = req.body

    try {
       
        if( isEmail(auth) ){
            const userData = await User.findOne({ email : auth })

            if( !userData ){
               return next(createError(400, "Invalid reset password request"))
            } else {
                
                if( userData.access_token != code ){
                    return next(createError(400, "OTP doesn't match"))
                } else {
                    res
                    .cookie('cpcode', code , { expires: new Date(Date.now() + 1000 * 60 *15)})
                    .cookie('cpid', userData._id.toString(), { expires: new Date(Date.now() + 1000 * 60 *15)})
                    .status(200).json({
                        message : "You can change your password"
                    })
                }
            }

        }

        if( isMobile(auth) ){
            const userData = await User.findOne({ mobile : auth })

            if( !userData ){
                return next(createError(400, "Invalid reset password request"))
             } else {
                 
                 if( userData.access_token != code ){
                     return next(createError(400, "OTP doesn't match"))
                 } else {
                     res
                     .cookie('cpcode', code , { expires: new Date(Date.now() + 1000 * 60 *15)})
                    .cookie('cpid', userData._id.toString(), { expires: new Date(Date.now() + 1000 * 60 *15)})
                     .status(200).json({
                         message : "You can change your password"
                     })
                 }
             }
        }


    } catch (error) {
        next(error)
    }
}


/**
 * Reset password
 */
export const changePassword = async ( req, res, next ) => {
    const { id, password, code } = req.body

    try {

        const userData = await User.findOne({ _id : id })
        
        if(!userData){

            return next(createError(400, "User Not found"))
        } else {

            if(userData.access_token != code ){
                return next(createError(400, "Invalid OTP"))
            } else {
                await User.findByIdAndUpdate(id, {
                    password : hashPassword(password),
                    access_token : ""
                })
                res.clearCookie("cpid").clearCookie("cpcode").clearCookie("findUser").clearCookie("otp")
                .status(200).json({
                    message : "Password reset successfull"
                })
            }
        }


    } catch (error) {
        next(error)
    }
}
