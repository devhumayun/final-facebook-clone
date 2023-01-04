import axios from 'axios'
import './Forget.css'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { createToast } from '../../../utility/toast'
import AuthHeader from '../../../components/AuthHeader/AuthHeader'
import Footer from '../../../components/Footer/Footer'

const Forgot = () => {

    const navigate = useNavigate()

    // state for input field
    const [ auth, setAuth ] = useState("")

    // state for error box
    const [errorBox, setErrorBox] = useState(false)

    // update unput
    const handleInputChange = (e) => {
        setAuth(e.target.value)
    }

    //  handle search button
    const handleSearch = async (e) => {
        e.preventDefault()

        if(!auth){
            createToast("Input Field is requried")
            setErrorBox(true)
        } else {
            
            await axios.post("/api/v1/user/find-user-account", {
                auth
            })
            .then(res => {
                navigate('/find-account')
            })
            .catch(error => {
                createToast(error.response.data.message)
            });

        }
    }


  return (
    <>
       <AuthHeader />

       <div className="reset-area">
            <div className="reset-wraper">
                <div className="reset-box">
                    <div className="reset-box-header">
                        <span className="title">Find Your Account</span>
                    </div>
                    <div className="reset-body">
                        {
                            errorBox && <div className="error-box">
                            <h4> Please fill in at least one field </h4>
                            <span> Fill in at least one field to search your account </span>
                           </div>

                        }
                        <p>
                        Please enter your email address or mobile number to search for
                        your account.
                        </p>
                        <div className="code-box">
                        <input
                            className="w-100"
                            type="text"
                            value={auth}
                            onChange={handleInputChange}
                            placeholder="Email address or mobile number"
                        />
                        </div>
                    </div>
                    <div className="reset-footer">
                        <div className="reset-btns">
                        <Link className="cancel" to='/login' >Cancel</Link>
                        <a onClick={handleSearch} className="continue" href="/">Search</a>
                        </div>
                    </div>
                </div>
            </div>
       </div>

       <Footer />
    </>
  )
}

export default Forgot
