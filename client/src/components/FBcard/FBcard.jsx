import React from 'react'
import './FBcard.css'

const FBcard = ({children}) => {
  return (
    <>
        <div className="fbcard">
            <div className="fb-card-wrapper"> {children} </div>
        </div>
    </>
  )
}

export default FBcard