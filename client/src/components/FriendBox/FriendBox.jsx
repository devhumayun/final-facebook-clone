import axios from 'axios'
import { useSelector } from 'react-redux'
import './FriendBox.scss'

const FriendBox = ({ user, buttonStatus }) => {
  const { user: logdin_user } = useSelector((state) => state.auth)
  const handleAddFriend = (receiverID) => {
    axios.get(`/api/v1/user/add-friends/${logdin_user._id}/${receiverID}`)
  }
  if (user) {
    return (
      <div>
        <div className="friend-req-box shadow-reg">
          <img
            src={
              user.profile_photo
                ? `/profile/${user.profile_photo}`
                : 'https://www.wjtv.com/wp-content/uploads/sites/72/2019/05/blank-2017_1559245575865_89917888_ver1.0.jpg?w=600'
            }
            alt=""
          />
          <div className="friend-info">
            <h3>
              {user.first_name} {user.sur_name}
            </h3>
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
            {buttonStatus === 'request' && (
              <>
                <button className="fb-btn blue-btn"> Confirm </button>
                <button className="fb-btn grey-btn"> Delete </button>
              </>
            )}
            {buttonStatus === 'pymn' && (
              <>
                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="fb-btn info-btn"
                >
                  {' '}
                  Add Friend{' '}
                </button>
                <button className="fb-btn grey-btn"> Remove </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default FriendBox
