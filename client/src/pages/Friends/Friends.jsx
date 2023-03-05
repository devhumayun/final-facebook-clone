import React from 'react'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import './Friends.scss'
import './FriendsContainer/FriendsContainer.scss'
import FriendsContainer from './FriendsContainer/FriendsContainer'
import FriendsMenuList from './FriendsMenu/FriendsMenuList'

const Friends = () => {
  return (
    <>
      <HomeHeader />
      <div className="friends-area">
        <div className="friends-area-menu">
          <FriendsMenuList />
        </div>
        <div className="friends-area-container">
          <FriendsContainer />
        </div>
      </div>
    </>
  )
}

export default Friends
