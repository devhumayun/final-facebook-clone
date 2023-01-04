import React from 'react'
import { useSelector } from 'react-redux';
import favicon from '../../assets/icons/favicon.ico'
import userProfile from '../../assets/images/user.jpg'
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Auth from '../../components/Login/Auth';
import SideBar from '../../components/SideBar/SideBar';
import StoryReels from '../../components/StoryReels/StoryReels';
import TimeLine from '../../components/TimeLine/TimeLine';


const Home = () => {
  const {loginStatus} = useSelector(state => state.auth)
  return (
    <>

      {
        
        loginStatus ? 
        <>
             <HomeHeader />
          <div class="fb-home-body">
             <SideBar />
             <TimeLine />
           </div>
        </>
       : 
       <Auth />

      }

     
    
    </>
  )
};

export default Home;