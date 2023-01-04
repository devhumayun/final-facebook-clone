import React from 'react'
import './FindAccount.css'
// import userProfile from '../../../assets/images/user.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'
import AuthHeader from '../../../components/AuthHeader/AuthHeader'
import Footer from '../../../components/Footer/Footer'
import { hideMailMobile } from '../../../utility/helper'
import { createToast } from '../../../utility/toast'


const FindAccount = () => {

  const navigate = useNavigate()

  const [findUser, setFindUser] = useState({
    name : "",
    email : "",
    mobile : "",
    photo : ""
  });

  // handle not you
  const handleNotYou = (e) => {
    e.preventDefault()

    Cookies.remove("findUser")
    navigate('/forgot-password')

  }

  // handle continue
  const handleResetOtporLink = async (e) => {
    e.preventDefault()

    axios.post("/api/v1/user/password-reset-otp", {
      auth : findUser.email ?? findUser.mobile
    })
    .then( res => {
      createToast(res.data.message, "success")
      navigate('/activation/reset-pass')
    })
    .catch(error => {
      createToast(error.response.data.message)
    });
  }

  useEffect(() => {

    // get cookie data
    const user_data = JSON.parse(Cookies.get("findUser")) ?? null

    if(user_data){
      setFindUser({
        name : user_data.name,
        email : user_data.email ?? null,
        mobile : user_data.mobile ?? null,
        photo : user_data.photo
      })
    }

  },[]);
 
  return (
    <>
      <AuthHeader />

        <div class="reset-area">
            <div class="reset-wraper">
                <div class="reset-box">
                <div class="reset-box-header">
                    <span class="title">Reset your password</span>
                </div>
                <div class="reset-body">
                    <div class="find-user-account">
                    <img src= {findUser.photo ? findUser.photo : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="" />
                    <span>{ findUser.name }</span>
                    {
                      findUser.email && <p>Email : {hideMailMobile( findUser.email)}</p>
                    }
                    {
                      findUser.mobile && <p>Mobile : {hideMailMobile(findUser.mobile)}</p>
                    }               
                    <p>To reset your account password, please continue</p>
                    </div>
                </div>
                <div class="reset-footer">
                    <div className="no-longer-access">
                      <Link to="/account">  No longer have access to these?</Link>
                    </div>
                    <div class="reset-btns">
                      <a onClick={handleNotYou} class="cancel" href='/'>Not you ?</a>
                      <a onClick={ handleResetOtporLink } class="continue" href="/">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        

      <Footer />
    </>
  )
}

export default FindAccount