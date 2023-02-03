import React from 'react'
import './QuickUpdate.css'

const QuickUpdate = ({ hide, data, data2, save}) => {

  
  return (
    <>
      <div className="add-or-edit-bio-box">
       <textarea style={{ height:"50px", textAlign: "left !important" }} value={data.data} onChange={(e) => data.setData(e.target.value)}  placeholder={data.placeholder} name='data1'>  </textarea>

       {
        data2 && 
         <textarea style={{marginTop: "5px", height:"50px", textAlign: "left !important" }} value={data2.data} onChange={(e) => data2.setData(e.target.value)}  placeholder={data2.placeholder} name=''> { data2.data }</textarea>
       }

        <div className="boi-status">
            <div className="status">
                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeHiL_qbYn2BkAdVc96qMtPWc6lHD9kG4H5zqUcP2QbgfmyQS770hxOzgJjTYi4RhRWWM8OxeAnN_32UrgBL4W3c)'}} className="earth-icon"></div>
                <span> Public </span>
            </div>
            <div className="boi-btn">
                <button onClick={() => hide(false)}> Cancel </button>
                <button onClick={save} className='active-save-btn'> Save </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default QuickUpdate
