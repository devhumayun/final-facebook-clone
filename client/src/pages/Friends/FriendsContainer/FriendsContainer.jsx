import React from 'react'
import { Link } from 'react-router-dom'
import FriendBox from '../../../components/FriendBox/FriendBox'
import './FriendsContainer.scss'

const FriendsContainer = () => {
  return (
    <div className="friends-container">
      <div className="friends-wraper">
        <div className="friends-req-section">
          <div className="friend-req-header">
            <h2> Friend requests </h2>
            <Link to=""> Sell all</Link>
          </div>
          <div className="friend-req-list">
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
          </div>
          <div className="friend-pagi">
            <span> See More </span>
            <i class="bx bxs-down-arrow"></i>
          </div>
        </div>
        <div className="spacebar"></div>
        <div className="friends-req-section">
          <div style={{ marginTop: '-25px' }} className="friend-req-header">
            <h2> People you may know </h2>
            <Link to=""> Sell all</Link>
          </div>
          <div className="friend-req-list">
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
            <Link to="">
              <FriendBox />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendsContainer
