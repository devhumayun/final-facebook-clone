import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FBmodal from '../../../FBmodal/FBmodal'

const FbCoverPhoto = () => {
  const { user } = useSelector((state) => state.auth)
  const [coverPhotoModal, setCoverPhotoModal] = useState(false)
  const [coverPhoto, setCoverPhoto] = useState(null)

  return (
    <>
      {coverPhotoModal && <FBmodal>HI</FBmodal>}

      <div class="fb-cover-photo">
        <img
          src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-1323206.jpg&fm=jpg"
          alt=""
        />

        <label htmlFor="coverphotoupload">
          <input
            type="file"
            id="coverphotoupload"
            style={{ display: 'none' }}
          />
          <div className="coverphoto-icon">
            <span id="coverphotoupload" class="camera-icon"></span> Edit cover
            photo
          </div>
        </label>
      </div>
    </>
  )
}

export default FbCoverPhoto
