import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../../redux/auth/action'
import { createToast } from '../../../utility/toast'
import { ImCross } from "react-icons/im";
import { BsQuestion } from "react-icons/bs";
import AuthHeader from '../../../components/AuthHeader/AuthHeader'
import Footer from '../../../components/Footer/Footer'
import PasswordChecker from '../../../components/PasswordChecker'

const Password = () => {

    // useDispatch
    const dispatch = useDispatch()
    // useNavigate
    const navigate = useNavigate()

    // strong password info state
    const [modal, setModal] = useState(false)

    // state for show hide password
    const [ showPass, setShowPass ] = useState(false)

    // state for password
    const [password, setPassword] = useState("")

    const user_id = Cookies.get("cpid")
    const code = Cookies.get("cpcode")

    // handle password reset
    const handlePasswordReset =(e) => {
        e.preventDefault()

        if(!password){
            createToast("Set a password")
        } else {
            dispatch(resetPassword({
                password,
               id : user_id,
               code : code
            }, navigate))
        }
    }

  return (
    <>

       <AuthHeader />
        <div className="reset-area">
            <div className="reset-wraper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span classNameName="title">Choose a new password</span>
                </div>
                <div className="reset-body">
                    <p>
                    Create a new password that is at least 6 characters long. A strong
                    password has a combination of letters, digits and punctuation
                    marks.
                    </p>
                    <div className="code-box">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-100" type={showPass ? "text" : "password"} placeholder="New password" />
                    <div className="pass-halper">
                        <span onClick={() => setModal(true)}> <BsQuestion /> </span>
                    </div>
                    </div>
                     {
                        password && <div className="icon">
                        <span className='showHidePass' onClick={() => setShowPass(preState => !preState)}> { showPass ? "Hide" : "Show" }  </span>
                      </div>
                     }
                </div>
                <div className="password-error-box">
                     {
                        password &&  <PasswordChecker password={password} />
                     }
                </div>

                <div className="reset-footer">
                    <a href="#"></a>
                    <div className="reset-btns">
                    <Link className="cancel" to="/login">Skip</Link>
                    <a onClick={handlePasswordReset} className="continue" href="/password-reset">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

       <Footer />

        {
            modal && <div className="account-modal">
            <div className="modal-wraper">
                <div className="modal-body">
                    <div className="modal-header password-modal-header">
                        <h4> Create a strong password </h4>
                        <span onClick={() => setModal(false)}> <ImCross /> </span>
                    </div>

                    <div className="content password-content">
                        <span> As you create your password, remember the following </span>
                        <span> It <strong> should not </strong> contain your name. </span>
                        <span> It <strong> should not </strong> contain a common dictionary word. </span>
                        <span> It <strong> Should </strong> contain one or more numbers. </span>
                        <span> It <strong> Should </strong> have both uppercase and lowercase characters. </span>
                        <span> It <strong> Should </strong> be at least six characters long. </span>
                    </div>

                    <div className="footer">
                        <button onClick={() => setModal(false)}> OK </button>
                    </div>
                </div>
            </div>
        </div>
        }
      
    </>
  )
}

export default Password
