
import express from 'express'
import { accountActivation, 
    accountActivationByCode, 
    loggedInUser, 
    updateUser,
    login, 
    register, 
    forgetPassword, 
    resetPasswordAction, 
    resendActivationLink, 
    findUserAccount, 
    passwordResetOtporLink,
    passwordResetOtpCheck,  
    changePassword,
    resendResetPasswordOTP} from '../controllers/userController.js';

// router
const router = express.Router();

// user auth route manage
router.post('/login', login)
router.post('/register', register)
router.get('/me', loggedInUser)
router.put('/update-user/:id', updateUser)
router.get('/account-activate/:token', accountActivation)
router.post('/code-activation', accountActivationByCode )
router.post('/resend-activation', resendActivationLink )
router.post('/forget-password', forgetPassword )
router.post('/find-user-account', findUserAccount )
router.post('/reset-password/:token', resetPasswordAction )
router.post('/password-reset-otp', passwordResetOtporLink )
router.post('/password-reset-otp-check', passwordResetOtpCheck )
router.post('/change-password', changePassword )
router.post('/resend-reset-otp', resendResetPasswordOTP )

// export router
export default router1