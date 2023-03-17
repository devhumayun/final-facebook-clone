import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FriendBox from '../../../components/FriendBox/FriendBox'
import './FriendsContainer.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../redux/auth/action'

const FriendsContainer = () => {
  const { users, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  console.log(user.request)

  useEffect(() => {
    dispatch(getAllUsers(user._id))
  }, [getAllUsers])

  return (
    <div className="friends-container">
      <div className="friends-wraper">
        <div className="friends-req-section">
          <div className="friend-req-header">
            <h2> Friend requests </h2>
            <Link to=""> Sell all</Link>
          </div>
          <div className="friend-req-list">
            {users.map((item, index) => {
              if (user.request.includes(item._id)) {
                return (
                  <Link to="" key={index}>
                    <FriendBox user={item} buttonStatus="request" />
                  </Link>
                )
              }
            })}
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
            {users.map((item, index) => {
              if (
                !user.friends.includes(item._id) &&
                !user.request.includes(item._id) &&
                !user.following.includes(item._id)
              ) {
                return (
                  <Link to="" key={index}>
                    <FriendBox user={item} buttonStatus="pymn" />
                  </Link>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendsContainer
