import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ProfileBio = () => {
  const { user } = useSelector((state) => state.auth)

  // state for bio update
  const [bioShow, setBioShow] = useState(false)
  const [bio, setBio] = useState(user.bio)
  // const [remain, setRemain] = useState( 101 - bio.length )
  const [saveBtn, setSaveBtn] = useState(true)

  const handleBioShow = () => {
    setBioShow(!bioShow)
    setSaveBtn(true)
    setBio('')
  }
  const handleCharacterChange = (e) => {
    setBio(e.target.value)
    // setRemain(101 - e.target.value.length)
    setSaveBtn(false)
  }

  return (
    <>
      <h3> Intro </h3>
      <div className="bio-box">
        {user.bio && !bioShow && (
          <>
            <p> {user.bio} </p>
            <button className="edit-button" onClick={handleBioShow}>
              {' '}
              Edit Bio{' '}
            </button>
          </>
        )}
        {!user.bio && !bioShow && (
          <button className="edit-button" onClick={handleBioShow}>
            {' '}
            Add Bio{' '}
          </button>
        )}
      </div>
      {bioShow && (
        <div className="add-or-edit-bio-box">
          <textarea
            value={bio}
            onChange={handleCharacterChange}
            placeholder="Discribe who you are "
            name=""
          >
            {' '}
            {user.bio}{' '}
          </textarea>

          <span> 101 characters remaining </span>
          <div className="boi-status">
            <div className="status">
              <div
                style={{
                  backgroundImage:
                    'url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeHiL_qbYn2BkAdVc96qMtPWc6lHD9kG4H5zqUcP2QbgfmyQS770hxOzgJjTYi4RhRWWM8OxeAnN_32UrgBL4W3c)',
                }}
                className="earth-icon"
              ></div>
              <span> Public </span>
            </div>
            <div className="boi-btn">
              <button onClick={handleBioShow}> Cancel </button>
              <button
                className={`${!saveBtn ? 'active-save-btn' : ''}`}
                disabled={saveBtn}
              >
                {' '}
                Save{' '}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileBio
