import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avater from '../../../Avater/Avater'
import FBmodal from '../../../FBmodal/FBmodal'
import './FbProfile.css'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../../utility/cropImage'
import { userProfilePhoto } from '../../../../redux/auth/action'
import axios from 'axios'

const FbProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const slider = useRef(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      setImage(croppedImage)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const handleImageUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setImage(img)
  }

  const zoomIn = () => {
    slider.current.stepUp()
    setZoom(slider.current.value)

    // if (zoom < 5) {
    //   setZoom((prev) => prev + 0.2)
    // }
  }
  const zoomOut = () => {
    slider.current.stepDown()
    setZoom(slider.current.value)
    // if (zoom > 1) {
    //   setZoom((prev) => prev - 0.2)
    // }
  }

  const handleProfilePhotoUpdate = async (e) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
    setImage(croppedImage)
    setCroppedImage(croppedImage)
    const finalBlob = await fetch(croppedImage).then((res) => res.blob())
    const finalImage = new File([finalBlob], 'profile_photo.png', {
      type: 'image/png',
    })
    const form_data = new FormData()
    form_data.append('profile', finalImage)

    await axios
      .put(`api/v1/user/profile-photo-update/${user._id}`, form_data)
      .then((res) => {
        setProfilePhoto(false)
        setImage(null)
        dispatch({
          type: 'USER_PROFILE_PHOTO_UPDATE',
          payload: { profile_photo: res.data.filename },
        })
      })
    // dispatch(
    //   userProfilePhoto({
    //     form_data,
    //     id: user._id,
    //   }),
    //   {
    //     setImage,
    //     setProfilePhoto,
    //   }
    // )
  }

  return (
    <>
      {profilePhoto && (
        <FBmodal title="Update profile picture" closePopup={setProfilePhoto}>
          {!image && (
            <div className="profilePhoto-upload">
              <div className="linebar"></div>
              <label htmlFor="profilephotoupload">
                <input
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="profilephotoupload"
                  type="file"
                />
                <i class="bx bx-plus"></i>
                <span id="profilephotoupload"> Upload </span>
              </label>
            </div>
          )}
          {image && (
            <>
              <div className="profilePhoto-manage">
                <div className="profile-descrip">
                  <textarea placeholder="Description"></textarea>
                </div>
                <div className="crop-zone">
                  <Cropper
                    image={image}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1 / 1}
                    showGrid={false}
                    cropShape="round"
                    cropSize={{ width: 300, height: 300 }}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className="photo-slider">
                  <button onClick={() => zoomOut()}>
                    <i class="bx bx-minus"></i>
                  </button>
                  <input
                    type="range"
                    value={zoom}
                    ref={slider}
                    min={1}
                    max={5}
                    step={0.2}
                    onChange={(e) => setZoom(e.target.value)}
                  />
                  <button onClick={() => zoomIn()}>
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
                <div className="croping-button">
                  <button onClick={showCroppedImage}>
                    <i class="bx bx-crop"></i> Crop Photo
                  </button>
                  <button>
                    <i class="bx bxs-time-five"></i> Make Temporary
                  </button>
                </div>
                <div className="profile-public">
                  <div
                    style={{
                      backgroundImage:
                        'url(https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/y_BPJE9xgw8.png?_nc_eui2=AeFQLf9RlgyY4PItRyAjycjZoST64FICJaGhJPrgUgIlofcQpZsHvtbhUXKmL0Q9QCj_SdlJcCJkVOaxJPPxNbh3)',
                    }}
                    className="profile-publc-icon"
                  ></div>
                  <span>Your profile picture is public.</span>
                </div>
                <div className="profile-photo-upload-footer">
                  <button className="profilePhoto-upload-cancel">Cancel</button>
                  <button
                    className="profilePhoto-upload-save"
                    onClick={handleProfilePhotoUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </FBmodal>
      )}
      <div class="fb-profile-details">
        <div class="profile-info">
          <div class="profile-photo">
            <Avater />
            <button
              onClick={() => setProfilePhoto(!profilePhoto)}
              className="profile-upload-icon"
            >
              <i class="bx bxs-camera"></i>
            </button>
          </div>
          <div class="profile-desc">
            <h1>
              {user.first_name} {user.surname} <span> (BLACK)</span>
            </h1>
            <div class="profile-follow-details">
              <span class="profile-followers">15k follower.</span>
              <span class="profile-following">1k following</span>
            </div>
            <div class="profile-friends-list">
              <ul>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="profile-action">
          <button>
            <span class="follow-icon"></span> <span>Follow</span>
          </button>
          <button>
            <span class="message-icon"></span> <span>Message</span>
          </button>
          <button>
            <span class="add-friend-icon"></span> <span>Add friend</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default FbProfile
