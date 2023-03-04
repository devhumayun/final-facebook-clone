import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import FBmodal from '../../../FBmodal/FBmodal'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../../utility/cropImage'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { loaderReducer } from '../../../../redux/loader/loaderReducer'
import { LOADER_END, LOADER_START } from '../../../../redux/loader/loaderTypes'

const FbCoverPhoto = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [coverPhoto, setCoverPhoto] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [width, setWidth] = useState()
  const coverRef = useRef(null)
  useEffect(() => {
    setWidth(coverRef.current.clientWidth)
  }, [window.innerWidth])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        coverPhoto,
        croppedAreaPixels,
        rotation
      )
      setCoverPhoto(croppedImage)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const handleCoverPhoto = async (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    console.log(img)
    setCoverPhoto(img)
  }

  const handleCoverPhotoUpdate = async (e) => {
    const croppedImage = await getCroppedImg(
      coverPhoto,
      croppedAreaPixels,
      rotation
    )
    setCoverPhoto(croppedImage)
    setCroppedImage(croppedImage)
    const finalBlob = await fetch(croppedImage).then((res) => res.blob())
    const finalImage = new File([finalBlob], 'profile_photo.png', {
      type: 'image/png',
    })
    const form_data = new FormData()
    form_data.append('profile', finalImage)
    dispatch({
      type: LOADER_START,
    })
    await axios
      .put(`api/v1/user/cover-photo-update/${user._id}`, form_data)
      .then((res) => {
        dispatch({
          type: 'USER_PROFILE_PHOTO_UPDATE',
          payload: { cover_photo: res.data.filename },
        })
      })
    dispatch({
      type: LOADER_END,
    })
    setCoverPhoto(false)
  }

  return (
    <>
      <div class="fb-cover-photo" ref={coverRef}>
        {coverPhoto && (
          <div className="save-cover-changes">
            <div className="cover-changes-left">
              <div
                style={{
                  backgroundImage:
                    'url(https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/y_BPJE9xgw8.png?_nc_eui2=AeFQLf9RlgyY4PItRyAjycjZoST64FICJaGhJPrgUgIlofcQpZsHvtbhUXKmL0Q9QCj_SdlJcCJkVOaxJPPxNbh3)',
                }}
                className="public-icon"
              ></div>
              <span> Your cover photo is public.</span>
            </div>
            <div className="cover-changes-right">
              <button
                onClick={() => setCoverPhoto(false)}
                className="cover-changes-cancel"
              >
                {' '}
                Cancel{' '}
              </button>
              <button
                onClick={handleCoverPhotoUpdate}
                className="cover-changes-save"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
        {coverPhoto && (
          <Cropper
            image={coverPhoto}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={width / 470}
            showGrid={false}
            onCropChange={setCrop}
            // cropSize={{ width: 1250, height: 470 }}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            // onZoomChange={setZoom}
            objectFit="horizontal-cover"
          />
        )}

        {!coverPhoto && (
          <img
            src={
              user.cover_photo
                ? `/profile/${user.cover_photo}`
                : 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg'
            }
            alt=""
          />
        )}

        <label htmlFor="coverphotoupload">
          <input
            type="file"
            onChange={handleCoverPhoto}
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
