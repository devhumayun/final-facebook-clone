import React from 'react'
import { useSelector } from 'react-redux'
const Avater = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <>
        <img src={user.profile_photo ? user.profile_photo : "https://www.wjtv.com/wp-content/uploads/sites/72/2019/05/blank-2017_1559245575865_89917888_ver1.0.jpg?w=600"} alt="" />
    </>
  )
}

export default Avater