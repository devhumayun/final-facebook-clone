import React, { useState } from 'react'
import FBmodal from '../../../FBmodal/FBmodal'
import baner from '../../../../assets/images/baner.png'
import FullWidthPopup from '../../../FullWidthPopup/FullWidthPopup'
import StorySlider from '../../../StorySlider/StorySlider'

const ProfileFeatured = () => {
  // state for featured slider
  const [featuredShow, setFeaturedShow] = useState(false)
  const [featuredAddShow, setFeaturedAddShow] = useState(false)
  const [featuredUpload, setFeatureUpload] = useState(false)
  const [featuredPhotos, setFeaturedPhotos] = useState([])
  const [featuredPhotosChecked, setFeaturedPhotosChecked] = useState([])
  const [featuredPhotosNext, setFeaturedPhotosNext] = useState(false)
  const [featuredFinalChecked, setFeaturedFinalChecked] = useState([])
  console.log(featuredFinalChecked)
  //
  const cover_url = featuredPhotosChecked.length
    ? URL.createObjectURL(featuredPhotosChecked[0])
    : ''

  console.log(cover_url)

  // upload featured back
  const handleUploadBack = () => {
    setFeaturedAddShow(true)
    setFeatureUpload(false)
    setFeaturedPhotos([])
  }
  // upload photo
  const handleFeaturePhoto = (e) => {
    setFeaturedPhotos((preState) => [
      ...preState,
      ...Array.from(e.target.files),
    ])
    setFeaturedPhotosChecked((preState) => [
      ...preState,
      ...Array.from(e.target.files),
    ])
  }

  const handleFeaturePreviewChange = (e) => {
    const imageList = [...featuredPhotosChecked]
    const val = featuredPhotos.find((data) => data.name === e.target.value)

    if (featuredPhotosChecked.includes(val)) {
      imageList.splice(imageList.indexOf(val), 1)
    } else {
      imageList.push(val)
    }
    setFeaturedPhotosChecked(imageList)
  }

  const handleFinalFeatureNext = () => {
    setFeaturedFinalChecked([...featuredPhotosChecked])
    setFeaturedPhotosNext(true)
  }
  const handleFinalFeature = (e) => {
    const finalPhotoList = [...featuredFinalChecked]
    const value = finalPhotoList.find((data) => data.name === e.target.value)

    if (featuredFinalChecked.includes(value)) {
      finalPhotoList.splice(finalPhotoList.indexOf(value), 1)
    } else {
      finalPhotoList.push(value)
    }

    setFeaturedFinalChecked(finalPhotoList)
  }

  return (
    <>
      <div className="featured-img-box">
        <div className="featured-wraper">
          <div className="featured-img">
            <div
              className="featured-item"
              onClick={() => setFeaturedShow(!featuredShow)}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGngqhUHTdoUH_hrxRS66jNK4XYRy0AwNU6laJO6y0NWfHN_ngNjIC6Zs4DnhkyWrNVs&usqp=CAU"
                alt=""
              />
            </div>
            <span> + 11 </span>
          </div>
        </div>
        {featuredShow && (
          <FullWidthPopup hide={setFeaturedShow}>
            <StorySlider hide={setFeaturedShow} />
          </FullWidthPopup>
        )}
        {featuredAddShow && (
          <FBmodal title={'Edit Featured'} closePopup={setFeaturedAddShow}>
            <div className="add-show-featured">
              <img src={baner} alt="" />
              <button onClick={() => setFeatureUpload(true)}> Add New </button>
            </div>
          </FBmodal>
        )}
        {featuredUpload && (
          <FBmodal title={'Edit featured collection'} back={handleUploadBack}>
            <div className="featured-upload">
              <div className="upload-field">
                <label htmlFor="upload">
                  <span> Upload Photos </span>
                  <input
                    multiple={true}
                    onChange={handleFeaturePhoto}
                    type="file"
                    id="upload"
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="upload-area">
                <div className="upload-title">
                  <h4> Stories </h4>
                  <span>
                    {' '}
                    This includes any active stories and your story archive.{' '}
                  </span>
                </div>
                <div className="upload-all-item">
                  <h4> Uploaded photos </h4>
                  <div className="upload-item-wraper">
                    {featuredPhotos.map((item, index) => {
                      const pre_url = URL.createObjectURL(item)
                      return (
                        <>
                          <div className="upload-item" key={index}>
                            <label htmlFor={`img_checkbox${index}`}>
                              <img src={pre_url} alt="" />
                            </label>
                            <div className="round-check">
                              <label>
                                <input
                                  onChange={handleFeaturePreviewChange}
                                  type="checkbox"
                                  checked={featuredPhotosChecked.includes(item)}
                                  value={item.name}
                                  id={`img_checkbox${index}`}
                                />
                              </label>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="featured-upload-footer">
                <button onClick={handleUploadBack} className="featured-cancel">
                  {' '}
                  Cancel{' '}
                </button>
                <button
                  onClick={handleFinalFeatureNext}
                  className="featured-next"
                >
                  {' '}
                  Next{' '}
                </button>
              </div>
            </div>
          </FBmodal>
        )}
        {featuredPhotosNext && (
          <FBmodal title="Edit featured collection">
            <div className="featured-next-warper">
              <div className="featured-next">
                <div className="featured-cover">
                  <span>Cover</span>
                  <div className="collection-cover-photo">
                    {featuredPhotosChecked.length && (
                      <img src={cover_url} alt="" />
                    )}
                    <div
                      style={{
                        backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/pW2TMyFiB4i.png)`,
                      }}
                      className="featured-camera"
                    ></div>
                  </div>
                </div>
                <div className="featured-collection-name">
                  <input type="text" placeholder="Collection Name" />
                </div>
                <div className="featured-collection-box">
                  <div className="featured-collection-item">
                    <div className="upload-item">
                      <button>
                        {' '}
                        <i class="bx bx-add-to-queue"></i>{' '}
                      </button>
                    </div>

                    {featuredFinalChecked.map((item, index) => {
                      const update_url = URL.createObjectURL(item)
                      return (
                        <>
                          <div className="upload-item" key={index}>
                            <label htmlFor={`img_checkbox${index}`}>
                              <img src={update_url} alt="" />
                            </label>
                            <div className="round-check">
                              <label>
                                <input
                                  onChange={handleFinalFeature}
                                  type="checkbox"
                                  checked={featuredFinalChecked.includes(item)}
                                  value={item.name}
                                  id={`img_checkbox${index}`}
                                />
                              </label>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="featured-next-footer">
                <div className="featured-footer-left">
                  <span>public</span>
                </div>
                <div className="featured-footer-right">
                  <button> Cancel </button>
                  <button> Save </button>
                </div>
              </div>
            </div>
          </FBmodal>
        )}
        <button
          onClick={() => setFeaturedAddShow(true)}
          className="edit-button"
        >
          Edit Featured
        </button>
      </div>
    </>
  )
}

export default ProfileFeatured
