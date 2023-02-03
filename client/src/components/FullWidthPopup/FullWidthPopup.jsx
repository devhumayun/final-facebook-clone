import React from 'react'
import './FullWidthPopup.css'
import FullWidthPopupHeader from '../FullWidthPopupHeader/FullWidthPopupHeader'

const FullWidthPopup = ({hide, children}) => {
  return (
    <>
      <div className="full-width-slider">
        <div className="full-width-slider-wraper">
            <FullWidthPopupHeader hide={hide} />
            {
                children
            }
        </div>
      </div>
    </>
  )
}

export default FullWidthPopup
