import React from 'react'
import './FriendBox.scss'

const FriendBox = () => {
  return (
    <div>
      <div className="friend-req-box shadow-reg">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5TxNKgIlA7UV06BjpaYNwJKAqiwV2JmTsfAUQY1TWC6trUBnzmu7JMLkwEv1tZ8OP-ZI&usqp=CAU"
          alt=""
        />
        <div className="friend-info">
          <h3>Shakil Bhuiyan</h3>
          <div className="mutual">
            <div className="mutual-list">
              <img
                src="https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1557199582-14cd70bc6d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8OTgzMDExMDh8fGVufDB8fHx8&auto=format&fit=crop&w=420&q=60"
                alt=""
              />
            </div>
            <div className="all-mutual">
              <span> 49 mutual friends </span>
            </div>
          </div>
        </div>
        <div className="friend-action">
          <button className="fb-btn blue-btn"> Confirm </button>
          <button className="fb-btn grey-btn"> Delete </button>
          <button className="fb-btn info-btn"> Add Friend </button>
          <button className="fb-btn grey-btn"> Remove </button>
        </div>
      </div>
    </div>
  )
}

export default FriendBox
