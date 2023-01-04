import React from 'react'
import '../../assets/css/style.css'
import corssIcon from '../../assets/icons/cross.png'
import { MdError } from 'react-icons/md';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { createToast } from '../../utility/toast.js';
import {  userRegister } from '../../redux/auth/action.js';

const RegisterModal = ({ setRegister }) => {

    // use Navigate
    const navigate = useNavigate()
    // use Dispatch
    const dispatch = useDispatch()

    // Input validation initial value
    const [errBor, setErrBor] = useState({})
    const [tool, setTool] = useState({})
    const [toolEdit, setToolEdit] = useState({})

    // day
    const month = [ "Jan", "Feb", "March", "Api", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec" ]
    
    // month
    const day = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ]

    // year
    const year = Array.from({ length: 110 }, (_, i) => new Date().getFullYear() - i);

    // current date init
    const date = new Date()

    // update register input value
    const [ input, setInput ] = useState({
        fname : '',
        surname: '',
        mobileORemail : '',
        password : '',
        gender : '',
        day : date.getDate(),
        month : month[date.getMonth()],
        year : date.getFullYear()
    });

      
    // update input value
    const handleInputValue = (e) => {
        setInput((preState) => ({
            ...preState,
            [e.target.name] : e.target.value
        }))
    };

        // handle register form
        const handleRegister = async ( e ) => {
            e.preventDefault()
         
            if(!input.fname || !input.surname || !input.mobileORemail || !input.password || !input.gender){
                createToast("All fields are requried", "error")
                setErrBor((pre) => ({
                    ...pre,
                    [e.target.name] : true
                }))
            } else {
              
                dispatch(userRegister({
                    first_name : input.fname,
                    sur_name : input.surname,
                    auth : input.mobileORemail,
                    password : input.password,
                    gender : input.gender,
                    birth_date : input.day,
                    birth_month : input.month,
                    birth_year : input.year
                },
                    e, setInput, setRegister, navigate
                ))
    
            }
        }

    // handle blur validation
    const handleBlurValidation = (e) => {
        setTool(prev => ({
            ...prev,
            [e.target.name] : false
        }))
        setToolEdit(prev => ({
            ...prev,
            [e.target.name] : true
        }))
        if(e.target.value ){

            setErrBor((pre) => ({
                ...pre,
                [e.target.name] : false
            }))
       } else {
            setErrBor((pre) => ({
                ...pre,
                [e.target.name] : true
            }))
       }


    };


    // handle Focus Validation
    const handleFocusValidation = (e) => {
        setErrBor((pre) => ({
            ...pre,
            [e.target.name] : false
        }))
        if(e.target.value){
            setTool((pre) => ({
                ...pre,
                [e.target.name] : false
            }))
        }else{
            setTool((pre) => ({
                ...pre,
                [e.target.name] : true
            }))
        }

    };

   
  return (
    <>
      
      <div className="blur-box">
        <div className="sign-up-card">
            <div className="sign-up-header">
                <div className="sign-up-content">
                    <span>Sign Up</span>
                    <span>It's quick and easy.</span>
                </div>
                <button onClick={() => setRegister(false)}><img src={ corssIcon } alt="" /></button>
            </div>
            <div className="sign-up-body">
                <form onSubmit={handleRegister} action="">
                    <div className="reg-form reg-form-inline">
                        
                        <div className="finput">
                            <input className={errBor.fname ? 'error-border' : "" }  onBlur={ handleBlurValidation } onFocus={ handleFocusValidation }  name='fname' value={ input.fname } onChange={ handleInputValue } type="text" placeholder="First Name" />

                            {
                                errBor.fname &&  <span className='input-worning'> <MdError/> </span> 
                            }
                           {
                              tool.fname && toolEdit.fname && (<div className='fname-validate'> What's your name </div>)
                           }

                           
                        </div>
                       <div className="surinput">
                           <input name='surname'  className={errBor.surname? 'error-border' : ""} onBlur={ handleBlurValidation } onFocus={ handleFocusValidation } value={ input.surname } onChange={ handleInputValue } type="text" placeholder="Surname" />
                            {
                                errBor.surname && <span className='surname-worning'> <MdError/> </span>
                            }
                            {
                                tool.surname && toolEdit.surname && <div className='surname-validate'> What's ? your name </div>
                            }         
                       </div>
                    </div> 

                    <div className="reg-form">
                        <input name='mobileORemail'  className={errBor.mobileORemail ? 'error-border' : ""} onBlur={ handleBlurValidation } onFocus={ handleFocusValidation } value={ input.mobileORemail } onChange={ handleInputValue } type="text" placeholder="Mobile number or email address" />
                           {
                            errBor.mobileORemail && <span className='surname-worning'> <MdError/> </span>
                           }
                           {
                            tool.mobileORemail && toolEdit.mobileORemail &&  <div className='mobileORemail-validate'> You'll use this when you log in and if you ever need <br /> to reset your password  </div>
                           }
                         

                    </div>
                     <div className="reg-form pass-field">
                        <input name='password'  className={errBor.password ? 'error-border' : ""} onBlur={ handleBlurValidation } onFocus={ handleFocusValidation } value={ input.password } onChange={ handleInputValue } type="text" placeholder="New password" />
                        {
                            errBor.password && <span className='surname-worning'> <MdError/> </span> 
                        }
                        {
                            tool.password && toolEdit.password && <div className='password-validate'> Enter a combination at least six numbers, letters and puncations marks (such as ! and &) </div>
                        }
                        
                    </div>
                    <div className="reg-form">
                        <span>Date of birth</span>
                        <div className="reg-form-select">

                            <select onChange={ handleInputValue } className={errBor.day ? 'error-border' : ""} onBlur={ handleBlurValidation } name="day" id="">
                                {
                                    day.map((item, index) => 
                                    <option selected={ item === input.day ? true : false } value={ item } key={ index } >
                                        {item}
                                    </option>
                                    )
                                }
                            </select>

                            <select onChange={ handleInputValue } className={errBor.month ? 'error-border' : ""} onBlur={ handleBlurValidation } name="month" id="">
                                {
                                    month.map((item,index) =>
                                    <option selected={ item === input.month ? true : false } key={index} value={ item }>
                                        {item}
                                    </option>
                                    )
                                }
                            </select>

                            <select onChange={ handleInputValue }  className={errBor.year ? 'error-border' : ""} onBlur={ handleBlurValidation } name="year" id="">
                                {
                                    year.map((item ,index) =>                                   
                                    <option key={index} value={item}>
                                        { item }
                                    </option>
                                    )
                                }
                            </select>

                        </div>

                    </div>

                    <div className="reg-form">
                        <span>Gender</span>
                        <div className="reg-form-select">
                            <label>
                                Female
                                <input type="radio" name="gender" value="Female" onChange={ handleInputValue } />
                            </label>
                            <label>
                                Male
                                <input type="radio" name="gender" value="Male" onChange={ handleInputValue } />
                            </label>
                            <label>
                                Custom
                                <input type="radio" name="gender" value="Custom" onClick={handleInputValue} />
                            </label>
                        </div>
                        {
                            input.gender === 'Custom' && (
                            <div className="custom-box">
                                <select className='custon-select-option' name="" id="">
                                    <option value=""> Select your pronoun </option>
                                    <option value=""> She: "Wish her happy birthday!" </option>
                                    <option value=""> He: "Wish him happy birthday!" </option>
                                    <option value=""> They: "Wish them happy birthday!" </option>
                                </select>
                                <label>
                                    Your pronoun is visible to everyone.
                                    <input type="text" placeholder='Gender (Optional)' />
                                </label>
                            </div>)
                        }
                    </div> 

                     <div className="reg-form">
                        <p>People who use our service may have uploaded your contact information to Facebook. <a href="/">Learn more.</a></p>
                    </div>
                    <div className="reg-form">
                        <p>By clicking Sign Up, you agree to our <a href="/">Terms</a>, <a href="/">Privacy Policy</a> and <a href="/">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
                    </div> 

                    <div className="reg-form">
                        <button type='submit'>Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
      </div> 

    </>
  )
}

export default RegisterModal
