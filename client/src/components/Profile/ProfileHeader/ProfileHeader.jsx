import React from 'react'
import Avater from '../../Avater/Avater'
import FbCoverPhoto from './FbCoverPhoto/FbCoverPhoto'
import FbProfile from './FbProfileDetails/FbProfile'

const ProfileHeader = () => {
  return (
    <>
      <div class="fb-profile-header">
        <div class="fb-header-shad"></div>
        <FbCoverPhoto />
        <FbProfile />
        <div class="fb-profile-menu">
          <ul>
            <li>
              <a href="#">Posts</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Followers</a>
            </li>
            <li>
              <a href="#">Photos</a>
            </li>
            <li>
              <a href="#">Videos</a>
            </li>
            <li>
              <a href="#">Articlse</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
