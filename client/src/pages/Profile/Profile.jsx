import React from 'react'
import CreatePost from '../../components/CreatePost/CreatePost';
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
            test
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