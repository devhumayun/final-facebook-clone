import React from 'react'
import './FBmodal.css'
import cross from '../../assets/icons/cross.png'

const FBmodal = () => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
            <div className="bf-modal-popup">
                <div className="fb-modal-header">
                    <span className="title"> Edit details </span>
                    <button>
                        <img src={cross} alt="" />
                    </button>
                </div>
                <div className="fb-modal-body">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum asperiores quod, commodi minus error ratione minima, libero ipsa ut enim rerum laboriosam quam ducimus consequuntur illum itaque sapiente repellendus incidunt.</p>
                </div>
                <div className="fb-modal-footer"></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default FBmodal