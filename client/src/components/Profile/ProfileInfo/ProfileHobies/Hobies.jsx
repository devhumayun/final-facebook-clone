import React from 'react'
import { GiBasketballBall } from 'react-icons/gi'
import { IoIosFootball } from 'react-icons/io'

const Hobies = () => {
  return (
    <>
      <div className="hobbies-box">
        <ul>
          <li>
            <div className="hobbies-item">
              <GiBasketballBall />
              <span> Whellchair Basketball </span>
            </div>
          </li>
          <li>
            <div className="hobbies-item">
              <IoIosFootball />
              <span> Blind Football </span>
            </div>
          </li>
        </ul>
        <button className="edit-button"> Edit hobbies </button>
      </div>
    </>
  )
}

export default Hobies
