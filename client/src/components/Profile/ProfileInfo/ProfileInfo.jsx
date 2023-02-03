import React, { useState } from 'react'
import { GiBasketballBall } from 'react-icons/gi';
import { IoIosFootball } from 'react-icons/io';
import FBcard from '../../FBcard/FBcard';
import {useDispatch, useSelector} from 'react-redux'
import FBmodal from '../../FBmodal/FBmodal';
import QuickUpdate from '../../QuickUpdate/QuickUpdate';
import { updateUserInfo } from '../../../redux/auth/action';
import FullWidthPopup from '../../FullWidthPopup/FullWidthPopup';
import StorySlider from '../../StorySlider/StorySlider';

const ProfileInfo = () => {
    
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
   
    // state for bio update
    const [bioShow, setBioShow] = useState(false)
    const [bio, setBio] = useState(user.bio)
    // const [remain, setRemain] = useState( 101 - bio.length )
    const [saveBtn, setSaveBtn] = useState(true)

    // category state
    const [editDetails, setEditDetails] = useState(false)
    const [ catShow, setCatShow ] = useState(false)
    const [ cat, setCat ] = useState(user?.cat ? user?.cat : "")

    // state for work/job
    const [ jobShow, setJobShow ] = useState(false)
    const [ job, setJob ] = useState(user?.work ? user?.work : [])
    const [position, setPosition] = useState("")
    const [company, setCompany] = useState("")

    // state for education
    const [ eduShow, setEduShow ] = useState(false)
    const [ edu, setEdu ] = useState(user?.edu ? user?.edu : [])

    // state for university
    const [ uniShow, setUniShow ] = useState(false)
    const [ uni, setUni ] = useState(user?.uni ? user?.uni : [])

    // state for home city
    const [ cityShow, setCityShow ] = useState(false)
    const [ city, setCity ] = useState( user.home_city ? user.home_city : "" )

    // state for home town
    const [ townShow, setTownShow ] = useState(false)
    const [ town, setTown ] = useState(user.home_town ? user.home_town : "")

    // state for featured slider
    const [featuredShow, setFeaturedShow] = useState(false)

    const handleBioShow = () => {
        setBioShow(!bioShow)
        setSaveBtn(true)
        setBio('') 
    }
    const handleCharacterChange = (e) => {
        setBio(e.target.value)
        // setRemain(101 - e.target.value.length)
        setSaveBtn(false)
    }

    const handleCatShow = (e) => {
        e.preventDefault()
        setCatShow(!catShow)
    }
    const handleUpdateCat = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({ ...user, cat:cat }, user._id, setCatShow))
    }
    const handleJobShow = (e) => {
        e.preventDefault()
        setJobShow(!jobShow)
    }
    const handleUpdateJob = (e) => {
        e.preventDefault()  
        dispatch(updateUserInfo({ work : [ ...user.work , { company, position }] }, user._id, setJobShow))
    }
    const handleworkDelete = (company) => {
       const finalWork = user.work.filter((data) => data.company !== company)
       dispatch(updateUserInfo({ work : finalWork }, user._id, setJobShow))
    }

    const handleUpdateEdu = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({ edu : [ ...user.edu , {edu} ] }, user._id, setEduShow))
    }
    const handleEduShow = (e) => {
        e.preventDefault()
        setEduShow(!eduShow)
    }

    const handleUniShow = (e) => {
        e.preventDefault()
        setUniShow(!uniShow)
    }
    const handleUpdateUni = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({ uni : [ ...user.uni ,{uni} ] }, user._id, setUniShow))
    }

    const handleCityShow = (e) => {
        e.preventDefault()
        setCityShow(!cityShow)
    }
    const handleCityAdd = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({ ...user, home_city:city }, user._id, setCityShow))
    }

    const handleHomeTownShow = (e) => {
        e.preventDefault()
        setTownShow(!townShow)
    }
    const handleAddHomeTown = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({ ...user, home_town:town }, user._id, setTownShow))
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
                    !user.bio && !bioShow && 
                    <button className='edit-button' onClick={handleBioShow}> Add Bio </button>
                }   
            </div>
            {
                bioShow && 
                <div className="add-or-edit-bio-box">

                    <textarea value={bio} onChange={handleCharacterChange} placeholder='Discribe who you are ' name=''> {user.bio} </textarea>

                    <span> 101 characters remaining </span>
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
                    {
                        user.cat &&
                        <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeHO54gLgP1p4qZ56c0suxPAysO07LK9kRPKw7Tssr2RE1O8Km0Ntd4u00hHeVUjva7I30yrCXQ6mKpl4EBw9TvE" alt="" />
                        <span> {user.cat} </span>
                        </li>
                    }
                    {
                        user.work.map((data,index) => 
                         <li key={index}>
                           <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeEjnKVx7JEML4acw-YtOzo4QE0O-ZdJm-NATQ75l0mb4873d4pSYZV4yvmB8F oKDxLwCUBqTjyOrajqwOC9liP2" alt="" />
                           <span> {data.position}  of <div className="bold-text"> {data.company} </div> </span>
                         </li>
                        )
                    }
                    {
                       user.edu.map((data, index) => 
                          <li key={index}>
                             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
                             <span> Studied at {data.edu} </span>
                            </li>
                        )
                    }
                    {
                       user.uni.map((data, index) => 
                          <li key={index}>
                             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
                             <span> Studied at {data.uni} </span>
                            </li>
                        )
                    }
                    {
                        user.home_city &&
                        <li>
                          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeH5RjTiXLUDp6NYfWo4HetjyuB9xaeJwC_K4H3Fp4nALwM4P-qVzUGg41q4cWyWXDkkD_OQwo6I5LibT7LJtk4J" alt="" />
                          <span> Lives in <div className="bold-text">{user.home_city}</div> </span>
                        </li>
                    }
                    {
                        user.home_town &&
                        <li>
                          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeH5RjTiXLUDp6NYfWo4HetjyuB9xaeJwC_K4H3Fp4nALwM4P-qVzUGg41q4cWyWXDkkD_OQwo6I5LibT7LJtk4J" alt="" />
                          <span> From  <div className="bold-text">{user.home_town}</div> </span>
                        </li>
                    }
                    
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeGzFeiXfu1DAFMwvznNRBP9rlG3yvH4CWGuUbfK8fgJYdEbOvOFOJSY777frC2826_rXGds6kWKxuTr2s2drikX" alt="" />
                        <span> It's complicated </span>
                    </li>
                    <li>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/mp_faH0qhrY.png?_nc_eui2=AeHC84kGXC9JFqJsivr0xAianFrlaiZVSWecWuVqJlVJZ4mHylWIjnPUeIfJ3_KouPw3Kbh6WC3G8B6iNS1GUSw_" alt="" />
                        <span> Joined on June 2017 </span>
                    </li>
                </ul>
                {
                    editDetails && 
                    <FBmodal title="Edit details" closePopup={setEditDetails}>
                    <div className="edit-details-intro">
                        <div className="edit-details-header">
                            <span className="header-title">Customise your Intro</span>
                            <span className="header-subtitle"> Details you select will be public. </span>
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Category </span>
                            {
                                user.cat && !catShow &&
                                <div className="intro-item">
                                    <div className="details">
                                       <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeEjnKVx7JEML4acw-YtOzo4QE0O-ZdJm-NATQ75l0mb4873d4pSYZV4yvmB8FoKDxLwCUBqTjyOrajqwOC9liP2" alt="" />
                                       <span> {user.cat} </span>
                                    </div>
                                    <div className="details-edit">
                                        <div onClick={() => setCatShow(true)} className="icon">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png" alt="" />
                                        </div>
                                    </div>
                                </div>

                            }
                            {
                                !catShow && !user.cat &&
                                <a href="/">
                                  <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                  <span onClick={handleCatShow}> Add Category </span>
                                 </a>
                            }
                            {
                                catShow &&  <QuickUpdate hide={setCatShow} data={{
                                    data : cat,
                                    setData : setCat,
                                }}
                                save ={handleUpdateCat}
                                />
                            }
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Work </span>
                            {
                                user.work.map((data, index) => 
                                    <li className='work-box' key={index}>

                                        <div className="intro-item">
                                            <div className="details">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeEjnKVx7JEML4acw-YtOzo4QE0O-ZdJm-NATQ75l0mb4873d4pSYZV4yvmB8FoKDxLwCUBqTjyOrajqwOC9liP2" alt="" />
                                            <span> {data.position} of <strong>{ data.company }</strong> </span>
                                            </div>
                                            <div className="details-edit">
                                                <div style={{ backgroundImage: "url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/YQoVljLJSj5.png)" }} onClick={() => handleworkDelete(data.company)} className="icon">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            {
                                !jobShow && 
                                <a href="/">
                                  <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                  <span onClick={handleJobShow}> Add a workplace </span>
                                </a>
                            }
                            {
                                jobShow &&  <QuickUpdate hide={setJobShow} data={{
                                    placeholder : "Set Company Name",
                                    data : company,
                                    setData : setCompany,
                                }}
                                data2={{
                                    placeholder : "Set your position",
                                    data : position,
                                    setData : setPosition ,
                                }}
                                save ={handleUpdateJob}
                                />
                            }

                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Education </span>
                            {
                                user.edu.map((data, index) => 
                                <li className='work-box' key={index}>

                                    <div className="intro-item">
                                        <div className="details">
                                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
                                        <span> Studied at {data.edu} </span>
                                        </div>
                                        <div className="details-edit">
                                            <div style={{ backgroundImage: "url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/YQoVljLJSj5.png)" }} onClick={(e) => handleworkDelete(data.company)} className="icon">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                            }
                            {
                                !eduShow &&
                                <a href="/">
                                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                <span onClick={handleEduShow}> Add secondary school </span>
                            </a>
                            }
                            {
                                eduShow && 
                                <QuickUpdate hide={setEduShow} data={{
                                    placeholder : "Set your high school",
                                    data : edu,
                                    setData : setEdu,
                                }}
                                save ={handleUpdateEdu}
                                />

                            }
                            {
                             user.uni.map((data, index) => 
                                    <li className='work-box' key={index}>
                                        <div className="intro-item">
                                            <div className="details">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
                                            <span> Studied at {data.uni} </span>
                                            </div>
                                            <div className="details-edit">
                                                <div style={{ backgroundImage: "url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/YQoVljLJSj5.png)" }} onClick={(e) => handleworkDelete(data.company)} className="icon">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                           }
                           {
                            !uniShow &&
                                <a href="/">
                                  <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                  <span onClick={handleUniShow}> Add university   </span>
                                </a>
                           }
                            {
                                uniShow && 
                                <QuickUpdate hide={setUniShow} data={{
                                    placeholder : "Set your university",
                                    data : uni,
                                    setData : setUni,
                                }}
                                save ={handleUpdateUni}
                                />
                            }
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Current town/city </span>
                            {
                                user.home_city && 
                                <div style={{marginBottom : "10px"}} className="intro-item">
                                    <div className="details">
                                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeH5RjTiXLUDp6NYfWo4HetjyuB9xaeJwC_K4H3Fp4nALwM4P-qVzUGg41q4cWyWXDkkD_OQwo6I5LibT7LJtk4J" alt="" />
                                        <span> Lives in <strong>{user.home_city}</strong> </span>
                                    </div>
                                    <div className="details-edit">
                                        <div onClick={() => setCityShow(true)} className="icon">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                !cityShow && !user.home_city &&
                                <a href="/">
                                   <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                  <span onClick={handleCityShow}> Add city </span>
                                </a>
                            }
                            {
                                cityShow && 
                                <QuickUpdate hide={setCityShow} data={{
                                    placeholder : "Add Home City",
                                    data : city,
                                    setData : setCity,
                                }}
                                save ={handleCityAdd}
                                />
                            }
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Home town </span>
                            {
                                user.home_town && !townShow &&
                                <div style={{marginBottom : "10px"}} className="intro-item">
                                    <div className="details">
                                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeH5RjTiXLUDp6NYfWo4HetjyuB9xaeJwC_K4H3Fp4nALwM4P-qVzUGg41q4cWyWXDkkD_OQwo6I5LibT7LJtk4J" alt="" />
                                        <span> Lives in <strong>{user.home_town}</strong> </span>
                                    </div>
                                    <div className="details-edit">
                                        <div onClick={() => setTownShow(true)} className="icon">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                !user.home_town &&
                                <a href="/">
                                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                <span onClick={handleHomeTownShow}> Add home town </span>
                            </a>
                            }
                            {
                                townShow &&
                                <QuickUpdate hide={setTownShow} data={{
                                    placeholder : "Add Home Add",
                                    data : town,
                                    setData : setTown,
                                }}
                                save ={handleAddHomeTown}
                                />
                            }
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Relationship </span>
                            <a href="/">
                                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                <span> Add a relationship status </span>
                            </a>
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Website </span>
                            <a href="/">
                                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                <span> Add your portfolio link </span>
                            </a>
                        </div>
                        <div className="details-intro-item">
                            <span className="intro-title"> Social </span>
                            <a href="/">
                                <div style={{backgroundImage: 'url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qDSwY9tayvO.png)'}} className="pluse-icon"></div>
                                <span> Add your social link </span>
                            </a>
                        </div>
                    </div>
                    <div className="edit-details-footer">
                            <div className="footer-left">
                                <a href="/">Update your information</a>
                            </div>
                            <div className="footer-right">
                                <button onClick={() => setEditDetails(!editDetails)}> Cancel </button>
                                <button> Save </button>
                            </div>
                        </div>
                    </FBmodal>
                }
                <button onClick={() => setEditDetails(true)} className='edit-button'> Edit details </button>
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
                <div className="featured-wraper">
                    <div className="featured-img">
                        <div className="featured-item" onClick={() => setFeaturedShow(!featuredShow)}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGngqhUHTdoUH_hrxRS66jNK4XYRy0AwNU6laJO6y0NWfHN_ngNjIC6Zs4DnhkyWrNVs&usqp=CAU" alt="" />
                        </div>
                        <span> + 11 </span>
                    </div>
                </div>
                {
                    featuredShow && 
                    <FullWidthPopup hide={setFeaturedShow} >
                        <StorySlider />
                    </FullWidthPopup>
                }
                <button className='edit-button'> Edit Featured </button>
            </div>
        </FBcard>
    </>
  )
}

export default ProfileInfo