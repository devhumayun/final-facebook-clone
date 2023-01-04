import React from 'react'
import Avater from '../Avater/Avater'

const CreatePost = () => {
  return (
    <>
        <div class="create-post">
            <div class="create-post-header">
                <Avater />
                <button>Whats on your mind ? </button>
            </div>
            <div class="divider-0"></div>
            <div class="create-post-footer">
                <ul>
                    <li><div class="post-icon"></div><span>Live Video</span></li>
                    <li><div class="post-icon"></div> Photo/video</li>
                    <li><div class="post-icon"></div> Feeling/ctivity</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default CreatePost