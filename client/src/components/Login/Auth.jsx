import React from 'react'
import { useState } from 'react';
import '../../assets/css/style.css'
import RegisterModal from '../Register/RegisterModal';
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillWarning } from "react-icons/ai";
import facebook from '../../assets/images/logo.png'
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { createToast } from '../../utility/toast';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/action';

const Auth = () => {

    // useDispatch
    const dispatch = useDispatch()

    // use Navigate
    const navigate = useNavigate()

    // state for show hide pass
    const [showPass, setShowPass] = useState(false)

    // state for error box
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
          <div className="auth-left">
              <img src={ facebook } alt="" />
              <h2>Facebook helps you connect and share with the people in your life.</h2>
          </div>
          <div className="auth-right">
            <div className="auth-box">
              <form onSubmit={handleLoginForm}>
                  <div className={`auth-form ${error ? "err-border" : ""} ` }>
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
                  <div className="auth-form">
                      <input className='authShowHidePass' name='password' value={input.password} onChange={handleLoginInput} type={showPass ? "text" : "password"} placeholder="Password" />
                      {
                        input.password && <span onClick={() => setShowPass(!showPass)} className='showHide'> {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> } </span>
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
            <p><a href="#">Create a Page</a> for a celebrity, brand or business.</p>
          </div>
        </div>
      </div>

        <Footer />

        { register && <RegisterModal setRegister={setRegister} /> } 

    </>
  )
};

export default Auth;