import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Avater from '../../../Avater/Avater'
import FBmodal from '../../../FBmodal/FBmodal'
import './FbProfile.css'
import Cropper from 'react-easy-crop'

const FbProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [image, setImage] = useState(null)

  const handleImageUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setImage(img)
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
                <div className="crop-zone"></div>
                <div className="photo-slider">
                  <button>
                    <i class="bx bx-minus"></i>
                  </button>
                  <input type="range" value={''} min={1} max={5} step={0.01} />
                  <button>
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
                <div className="croping-button">
                  <button>
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
                  <button> Cancel </button>
                  <button> Save </button>
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
