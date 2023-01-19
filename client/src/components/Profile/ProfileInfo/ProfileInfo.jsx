import React, { useState } from 'react'
import { GiBasketballBall } from 'react-icons/gi';
import { IoIosFootball } from 'react-icons/io';
import FBcard from '../../FBcard/FBcard';
import {useSelector} from 'react-redux'

const ProfileInfo = () => {
    const { user } = useSelector(state => state.auth)
    // boi box show status
    const [bioShow, setBioShow] = useState(false)
    const [bio, setBio] = useState(user.bio)
    const [remain, setRemain] = useState( 101 - bio.length )
    const [saveBtn, setSaveBtn] = useState(true)

    // handle bioBoxShow
    const handleBioShow = () => {
        setBioShow(!bioShow)
        setSaveBtn(true)
        setBio('')
    }
    const handleCharacterChange = (e) => {
        setBio(e.target.value)
        setRemain(101 - e.target.value.length)
        setSaveBtn(false)
    }
  return (
    <>
        <FBcard>
            <h3> Intro </h3>
            <div className="bio-box"> 
            
                {
                    user.bio && !bioShow && 
                    <>
                      <p> {user.bio} </p>
                      <button className='edit-button' onClick={handleBioShow}> Edit Bio </button>
                    </>
                }
                {
                    !user.bio && !bioShow && <button className='edit-button' onClick={handleBioShow}> Add Bio </button>
                }   
            </div>
            {
                bioShow && 
                <div className="add-or-edit-bio-box">
                    <textarea value={bio} onChange={handleCharacterChange} placeholder='Discribe who you are ' name=''> {user.bio} </textarea>
                    <span> {remain} characters remaining </span>
                    <div className="boi-status">
                        <div className="status">
                            <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeHiL_qbYn2BkAdVc96qMtPWc6lHD9kG4H5zqUcP2QbgfmyQS770hxOzgJjTYi4RhRWWM8OxeAnN_32UrgBL4W3c)'}} className="earth-icon"></div>
                            <span> Public </span>
                        </div>
                        <div className="boi-btn">
                            <button onClick={handleBioShow}> Cancel </button>
                            <button className={`${!saveBtn ? 'active-save-btn' : ""}`} disabled={saveBtn}> Save </button>
                        </div>
                    </div>
                </div>
            }


            <div className="info-details-box">
                <ul>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeEjnKVx7JEML4acw-YtOzo4QE0O-ZdJm-NATQ75l0mb4873d4pSYZV4yvmB8FoKDxLwCUBqTjyOrajqwOC9liP2" alt="" />
                        <span> Inter 2nd year (science) at I aM nOt wORking " I Am stiLL stUyiNg".....! </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeF7a1Zi8-elC6Lmxw4-pzb6C7xezJFSLOkLvF7MkVIs6acA_tUpxGzFLYuf9SspJvgKqXd7clrZx-ux6VTzWk36" alt="" />
                        <span> Goes to <div className="bold-text">Syedpur High School</div> </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeHO54gLgP1p4qZ56c0suxPAysO07LK9kRPKw7Tssr2RE1O8Km0Ntd4u00hHeVUjva7I30yrCXQ6mKpl4EBw9TvE" alt="" />
                        <span> Lives in <div className="bold-text">Comilla</div> </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeH5RjTiXLUDp6NYfWo4HetjyuB9xaeJwC_K4H3Fp4nALwM4P-qVzUGg41q4cWyWXDkkD_OQwo6I5LibT7LJtk4J" alt="" />
                        <span> From <div className="bold-text">Comilla</div> </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeGzFeiXfu1DAFMwvznNRBP9rlG3yvH4CWGuUbfK8fgJYdEbOvOFOJSY777frC2826_rXGds6kWKxuTr2s2drikX" alt="" />
                        <span> It's complicated </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/mp_faH0qhrY.png?_nc_eui2=AeHC84kGXC9JFqJsivr0xAianFrlaiZVSWecWuVqJlVJZ4mHylWIjnPUeIfJ3_KouPw3Kbh6WC3G8B6iNS1GUSw_" alt="" />
                        <span> Joined on June 2017 </span>
                    </li>
                </ul>
                <button className='edit-button'> Edit details </button>
            </div>
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
                <button className='edit-button'> Edit hobbies </button>
            </div>
            <div className="featured-img-box">
                <div className="feature-img">
                    <div className="featured-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGngqhUHTdoUH_hrxRS66jNK4XYRy0AwNU6laJO6y0NWfHN_ngNjIC6Zs4DnhkyWrNVs&usqp=CAU" alt="" />
                    </div>
                    <div className="featured-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGngqhUHTdoUH_hrxRS66jNK4XYRy0AwNU6laJO6y0NWfHN_ngNjIC6Zs4DnhkyWrNVs&usqp=CAU" alt="" />
                    </div>
                    <div className="featured-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGngqhUHTdoUH_hrxRS66jNK4XYRy0AwNU6laJO6y0NWfHN_ngNjIC6Zs4DnhkyWrNVs&usqp=CAU" alt="" />
                    </div>
                </div>
                <button className='edit-button'> Edit Featured </button>
            </div>
        </FBcard>
    </>
  )
}

export default ProfileInfo