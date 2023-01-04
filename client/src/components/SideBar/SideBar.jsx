import React from 'react'
import { useSelector } from 'react-redux'
import{ Link } from 'react-router-dom'
import userProfile from '../../assets/images/user.jpg'
import Avater from '../Avater/Avater'


const SideBar = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <>
         <div class="fb-home-body-sidebar">
              <ul>
                  <li>
                      <Link to="profile">
                          <div class="body-icon">
                              <Avater />
                          </div>
                          <span>{`${user.first_name} ${user.sur_name}`}</span>
                      </Link>
                  </li>

                  <li>
                      <Link to="friends">
                          <div class="body-icon">
                              
                          </div>
                          <span>Friends</span>
                      </Link>
                  </li>

                  <li>
                      <a href="#">
                          <div class="body-icon">
                              
                          </div>
                          <span>Groups</span>
                      </a>
                  </li>

                  <li>
                      <a href="#">
                          <div class="body-icon">
                              
                          </div>
                          <span>Marketplace</span>
                      </a>
                  </li>

                  <li>
                      <a href="#">
                          <div class="body-icon">
                              
                          </div>
                          <span>Watch</span>
                      </a>
                  </li>

                  <li>
                      <a href="#">
                          <div class="body-icon">
                              
                          </div>
                          <span>Watch</span>
                      </a>
                  </li>
                  
              </ul>
          </div>
    </>
  )
}

export default SideBar