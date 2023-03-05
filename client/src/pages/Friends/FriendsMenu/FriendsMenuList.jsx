import React from 'react'
import { Link } from 'react-router-dom'
import './FriendsMenuList.scss'

const FriendsMenuList = () => {
  return (
    <div className="friends-menu-list shadow-reg">
      <div className="friends-menu-wraper">
        <div className="menu-header">
          <h2>Friends</h2>
          <span>
            <i class="bx bxs-cog"></i>
          </span>
        </div>
        <div className="menu-list">
          <ul>
            <li>
              <div className="round-icon-active">
                <div
                  style={{
                    backgroundImage:
                      'url(https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/3RT1RtjDYAd.png?_nc_eui2=AeEB12UNW2voTCaZKJD4Ct7vLuZLQ50Zseku5ktDnRmx6RnvHR5NYRdgIQwdJb4XIJIWvzZoWM-WT2Pb2e9tYGXN)',
                  }}
                  className="home-icon icon-round"
                ></div>
              </div>
              <Link to="">Home</Link>
            </li>
            <li>
              <div className="round-icon">
                <div
                  style={{
                    backgroundImage:
                      'url(https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/6cwHZLpkV5l.png?_nc_eui2=AeERIZQHHnGNQiC1JenVJEHDdZW-BTVxJK51lb4FNXEkrjqPmZU9ntBjQC-qUZ47YbYYn-UOOMUy3ylTDTvtXGKo)',
                  }}
                  className="friend-req-icon icon-round"
                ></div>
              </div>
              <div className="menu-with-icon">
                <Link to="">Friend requests</Link>
              </div>
            </li>
            <li>
              <div className="round-icon">
                <div
                  style={{
                    backgroundImage:
                      'url(https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/TQ0tJKBsAXI.png?_nc_eui2=AeG3I7NSrQZrIUW-w95noS99joTwTfoxyt-OhPBN-jHK377UXHmwx9SgukOYti3SPkWDyVMvIX__mJzU_XrBuuZ1)',
                  }}
                  className="all-friends-icon icon-round"
                ></div>
              </div>
              <div className="menu-with-icon">
                <Link to="">All Friends</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FriendsMenuList
