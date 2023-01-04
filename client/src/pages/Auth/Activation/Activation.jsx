import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Activation.css'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useState } from 'react'
import { accountActivationByCode , resendActivationLink, checkResetOTP, resendResetPasswordCode } from '../../../redux/auth/action'
import { createToast } from '../../../utility/toast'
import axios from 'axios'
import AuthHeader from '../../../components/AuthHeader/AuthHeader'
import Footer from '../../../components/Footer/Footer'
import { CiWarning } from "react-icons/ci";



const Activation = () => {

    const navigate = useNavigate()

    const activation_email = Cookies.get('otp')

    const dispatch = useDispatch()
    
    const { type } = useParams()

   useEffect(() => {
        if(!activation_email){
            navigate('/login')
        }
   })


    // State for activation error box
    const [ errorBox, setErrorBox ] = useState(false) 
    // state for code
    const [ code, setCode ] = useState("")

    // update code
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }

    // handle activation cancel
    const handleActivationCancel = (e) => {
        e.preventDefault()

        navigate('/login')
        Cookies.remove('otp')
    }

    // handle activation cancel
    const handleActivationContinue = (e) => {
        e.preventDefault()

        if(!code){
            createToast("OTP is requried")
            setErrorBox(true)
        } else {
            dispatch(accountActivationByCode({
                code : code,
                auth : Cookies.get('otp')
            }, navigate))
        }
    }

    // Handle Resend Code
    const handleResendCode = (e) => {
        e.preventDefault()

        dispatch(resendActivationLink(activation_email, navigate))
    }


    // handleResetCodeCheck
    const handleResetCodeCheck = (e) => {
        e.preventDefault()

        if( !code ){
            createToast("OTP is requried")
            setErrorBox(true)
        } else {
            dispatch(checkResetOTP({
                code : code,
                auth : Cookies.get('otp') 
            },
                navigate
            ))
        }
    }


    // handle reset password code
    const handleResendResetPassOTP = (e) => {
        e.preventDefault()
        let auth = Cookies.get("otp")
       dispatch(resendResetPasswordCode(auth))
    }


  return (
    <>

        <AuthHeader />

            <div className="reset-area">
                <div className="reset-wraper">
                    <div className="reset-box">
                        <div className="reset-box-header">
                            <span className="title">Enter security code</span>
                        </div>
                        <div className="reset-body reset-activation">
                            {
                                errorBox &&
                                <div className="activation-error-box">
                                    <span className='error-icon'> <CiWarning /> </span>
                                    <span className='text'> The number that your've entered doesn't match your code. Please try again </span>
                                </div>
                            }
                            <p>
                            Please check your emails for a message with your code. Your code
                            is 6 numbers long.
                            </p>
                            <div className="code-box activation-code">
                                <input value={code} onChange={handleCodeChange} type="text" />
                                <div className="code-text activation-text">
                                    <span>We sent your code to:</span>
                                    <span> { activation_email } </span>
                                </div>
                            </div>
                        </div>
                        <div className="reset-footer">
                            <a onClick={ type === "account" ? handleResendCode : handleResendResetPassOTP} href="/">Didn't get a code?</a>
                            <div className="reset-btns">
                            <a onClick={handleActivationCancel} className="cancel" href="/">Cancel</a>
                            <a onClick={ type === 'account' ? handleActivationContinue : handleResetCodeCheck } className="continue" href="/">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <Footer />
    </>
  )
}

export default Activation