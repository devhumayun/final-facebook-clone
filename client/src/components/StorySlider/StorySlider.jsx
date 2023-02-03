import React from 'react'
import { useState } from 'react'
import './StorySlider.css'
import {featured} from '../Faker/Faker'
import { useEffect } from 'react'

const StorySlider = () => {

  const [ sliderIndex, setSliderIndex ] = useState(0)

  useEffect(() => {
    
    const sliderTimeout = setTimeout(() => {
      setSliderIndex(sliderIndex + 1)
    }, 2000)

  }, [sliderIndex])

  return (
    <>
      <div className="stroy-slider-warper">
        <div className="story-slider">
          <div style={{ backgroundImage: `url(${featured[sliderIndex].photo})` }} className="slider-item">
          </div>
          <div className="progress-bar"></div>
        </div>
      </div>
    </>
  )
}

export default StorySlider
