import React from 'react'
import { useState } from 'react'
import './StorySlider.css'
import {featured} from '../Faker/Faker'
import { useEffect } from 'react'

const StorySlider = ({hide}) => {

  const [ sliderIndex, setSliderIndex ] = useState(0)

  useEffect(() => {
    
    const sliderTimeout = setTimeout(() => {
      if(sliderIndex < featured.length){
        setSliderIndex((sliderIndex + 1 ) )
      }
      if(sliderIndex === featured.length - 1){
       hide(false)
      }
    }, 5000)

    return () => (clearTimeout(sliderTimeout))
  }, [sliderIndex])

  const handleStorySliderNext = () => {
    setSliderIndex((sliderIndex + 1 ) % featured.length)
  }
  const handleStorySliderPrev = () => {
    setSliderIndex((sliderIndex - 1 ) % featured.length)
  }

  return (
    <>
      <div className="stroy-slider-warper">
        <div className="story-slider">
          <div style={{ backgroundImage: `url(${featured[sliderIndex].photo})` }}   
            className="slider-item">
          </div>
          <div className="progress-bar-wraper">
            { featured.map((item, index) => 
              <div className={` progress-bars ${sliderIndex === index ? "active" : ""} ${ index < sliderIndex ? "viewed" : "" }`} key={index}>
                <div className="progress"></div>
              </div>
            )}
          </div>
          <div className="navigation">
            <div className="prev">
              {
                sliderIndex === 0 ? "" : <button onClick={handleStorySliderPrev}> <i class='bx bx-chevron-left'></i> </button> 
              }
              
            </div>
            <div className="next">
              <button onClick={handleStorySliderNext}> <i class='bx bx-chevron-right'></i> </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StorySlider
