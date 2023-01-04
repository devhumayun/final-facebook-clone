import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import StoryReels from '../StoryReels/StoryReels'
import UserPost from '../UserPost/UserPost'

const TimeLine = () => {
  return (
    <>
        <div class="fb-home-timeline-area">
            <div class="fb-home-timeline">
                <StoryReels />
                <CreatePost />
                <UserPost />
            </div>            
        </div>
    </>
  )
}

export default TimeLine