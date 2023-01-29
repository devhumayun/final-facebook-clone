import React from 'react'
import './QuickUpdate.css'

const QuickUpdate = ({placeholder}) => {
  return (
    <>
      <div className="add-or-edit-bio-box">

        <input type="text" className="form-control" placeholder='Company' />
       <textarea value=''  placeholder={placeholder} name=''>  </textarea>

        <div className="boi-status">
            <div className="status">
                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeHiL_qbYn2BkAdVc96qMtPWc6lHD9kG4H5zqUcP2QbgfmyQS770hxOzgJjTYi4RhRWWM8OxeAnN_32UrgBL4W3c)'}} className="earth-icon"></div>
                <span> Public </span>
            </div>
            <div className="boi-btn">
                <button> Cancel </button>
                <button className='active-save-btn'> Save </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default QuickUpdate
