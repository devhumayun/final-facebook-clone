import React from 'react'
import CreatePost from '../../components/CreatePost/CreatePost';
import FBcard from '../../components/FBcard/FBcard';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import UserPost from '../../components/UserPost/UserPost';

const Profile = () => {
  return (
    <>
       <HomeHeader />
       <ProfileHeader />
       <div class="fb-profile-body">
         <div className="fb-profile-wrapper">
          <div className="fb-profile-left">
            <FBcard>
               <h3> Intro </h3>
               <div className="bio-box"> 
                  <p> Don't Judge a Person By His Dress. Eat↔Sleep↔ Namaz↔Teaching↔Coding </p>
                  <button> Edit Bio </button>
               </div>
            </FBcard>
          </div>
          <div className="fb-profile-right">
            <CreatePost />
            <UserPost />
          </div>
         </div>
       </div>

    </>
  )
};

export default Profile;