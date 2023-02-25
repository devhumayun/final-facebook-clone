import './ProfileInfo.css'
import FBcard from '../../FBcard/FBcard'
import ProfileBio from './Profile-bio/ProfileBio'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import ProfileFeatured from './ProfileFeatured/ProfileFeatured'

const ProfileInfo = () => {
  return (
    <>
      <FBcard>
        <ProfileBio />
        <ProfileDetails />
        <ProfileFeatured />
      </FBcard>
    </>
  )
}

export default ProfileInfo
