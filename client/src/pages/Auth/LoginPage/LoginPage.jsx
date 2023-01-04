import React from 'react'
import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillWarning } from "react-icons/ai";
import '../../../assets/css/style.css'
import '../../../assets/css/Custom.css'
import facebook from '../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterModal from '../../../components/Register/RegisterModal';
import Footer from '../../../components/Footer/Footer';
import { createToast } from '../../../utility/toast';
import { userLogin } from '../../../redux/auth/action';

const LoginPage = () => {

    // useDispatch
    const dispatch = useDispatch()

    // use Navigate
    const navigate = useNavigate()

    // state for show hide password
    const [showPass, setShowPass] = useState(false)

    // state for errorbox
    const [error, setError] = useState(false)

    // register modal controll
    const [ register, setRegister ] = useState(false)

    // state for login input
    const [ input, setInput ] = useState({
      auth : "",
      password : ""
    });

    // update input value
    const handleLoginInput = (e) => {
      setInput((preState) => ({
        ...preState,
        [e.target.name] : e.target.value
      }))
    };

    // Handle login form
    const handleLoginForm = (e) => {
        e.preventDefault()

        if(!input.auth || !input.password){
          createToast("All fields are requried")
          setError(true)
        } else {
          
          dispatch(userLogin({
            auth : input.auth,
            password : input.password
          }, navigate))
        }
        
    }

  return (
    <>

      <div className="fb-auth">
        <div className="auth-wraper">
          <div style={{ margin: "auto", textAlign: "center" }} className="auth-right">
          <img style={{ width: "250px", height: "auto", objectFit : "contain" }} src={ facebook } alt="" />
            <div style={{ marginBottom : "80px", position: "relative" }} className="auth-box">
              <form onSubmit={handleLoginForm}>
                  <div className={`auth-form ${error ? "err-border" : ""}`}>
                      <input name='auth' value={input.auth} onChange={handleLoginInput} type="text" placeholder="Email address or phone number" />
                      {
                        error && <span className='login-warning'> <AiFillWarning /> </span>
                      }
                  </div>
                  {
                    error && 
                    <div style={{marginTop:"-8px", marginBottom:"8px"}} className="error_message">
                    <span style={{color:"red", fontSize: "13px"}}> The email address or mobile number you entered isn't connected to an account. <Link style={{color: "red", fontWeight: "600"}} to="/forgot-password"> Find your account and log in. </Link> </span>
                    </div>   
                  }
                  <div className="auth-form hideShowParent">
                      <input name='password' value={input.password} onChange={handleLoginInput} type={showPass ? "test" : "password"} placeholder="Password" />
                      {
                    input.password && <div className="hideshow">
                    <span onClick={() => setShowPass(!showPass)}> {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}  </span>
                  </div>
                  }
                  </div>
                  <div className="auth-form">
                      <button type="submit">Log In</button>
                  </div>                        
              </form>

              <Link to="/forgot-password">Forgotten password?</Link>

              <div className="divider"></div>

              <button onClick={() => setRegister(true)}> Create  New Account</button>

            </div>
          </div>
        </div>
      </div>

        <Footer />

        { register && <RegisterModal setRegister={setRegister} /> } 

    </>
  )
};

export default LoginPage;