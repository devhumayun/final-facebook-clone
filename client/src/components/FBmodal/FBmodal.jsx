import React from 'react'
import './FBmodal.css'
import cross from '../../assets/icons/cross.png'

const FBmodal = ({children, title, closePopup, back=null}) => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
            <div className="bf-modal-popup">
                <div className="fb-modal-header">
                  {
                    back && 
                    <button className='back' onClick={() => back()}>
                        <i class='bx bx-left-arrow-alt'></i>
                    </button>
                  }
                    <span className="title"> {title} </span>
                  {
                    closePopup &&
                    <button onClick={() => closePopup(false)}>
                      <img src={cross} alt="" />
                    </button>
                  }  
              
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