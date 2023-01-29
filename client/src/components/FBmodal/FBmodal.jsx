import React from 'react'
import './FBmodal.css'
import cross from '../../assets/icons/cross.png'

const FBmodal = ({children, title, closePopup}) => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
            <div className="bf-modal-popup">
                <div className="fb-modal-header">
                    <span className="title"> {title} </span>
                    <button onClick={() => closePopup(false)}>
                        <img src={cross} alt="" />
                    </button>
                </div>
                <div className="fb-modal-body">
                    {
                      children
                    }
                </div>
                <div className="fb-modal-footer"></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default FBmodal