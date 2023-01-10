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
               <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis nihil consectetur eos, illo maxime sapiente? Dolore, ipsam explicabo temporibus mollitia beatae iusto, delectus nam consequatur aperiam totam ad quod soluta.</p>
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