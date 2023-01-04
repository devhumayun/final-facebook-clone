import React from 'react'
import'./Account.css'
import { FaFacebook } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { AiOutlineDesktop } from "react-icons/ai";
import { useState } from 'react';

const Account = () => {

    const [modal, setModal] = useState(false)

  return (
    <>

        <div className="account-header">
            <div className="account-header-wraper">
                <div className="account-logo">
                    <span>
                        <FaFacebook />
                    </span>
                </div>
            </div>
         </div>

        <div className="account-area">
            <div className="account-wraper">
                <div className="account-box">
                    <div className="account-box-header">
                        <h3> Get back on Facebook </h3>
                    </div>
                    <div className="account-body">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/uuuuHZUxqoC.png" alt="" />
                        <h3> We don't recognise your device </h3>
                        <p> We can't match the device you're using to the account you're trying to access. </p>
                        <h4> How to try this again </h4>
                    </div>
                    <div className="icon-box">
                        <div className="icon">
                            <span> <AiOutlineDesktop /> </span>
                        </div>
                        <div className="content">
                            <span> Use another device. This must be a device you've used to log into this account before.</span>
                        </div>
                    </div>
                    <div className="button">
                        <button onClick={() => setModal(true)} href='/'> This Won't Work </button>
                    </div>
                </div>
            </div>
        </div>

 
        {
            modal &&
            <div className="account-modal">
            <div className="modal-wraper">
                <div className="modal-body">
                    <div className="modal-header">
                        <h4> I can't try another device </h4>
                        <span onClick={() => setModal(false)}> <ImCross /> </span>
                    </div>
                    <div className="content">
                        <span> If you can no longer access your login email or phone number, and you don't have access to a device you've used to log into this account before, it's not safe for us to give you another way to log in. </span>
                        <span> We understand that this might not help you get back on Facebook, but we have to take this action to stop anyone who doesn't own this account from getting into it. </span>
                    </div>
                    <div className="footer">
                        <button onClick={() => setModal(false)}> Close </button>
                    </div>
                </div>
            </div>
        </div>
        } 
        
    </>
  )
}

export default Account
