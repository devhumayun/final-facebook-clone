import React from 'react'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import './Friends.scss'

const Friends = () => {
  return (
    <>
      <HomeHeader />
      <div className="friends-area">
        <div className="friends-area-menu"></div>
        <div className="friends-area-container"></div>
      </div>
    </>
  )
}

export default Friends
