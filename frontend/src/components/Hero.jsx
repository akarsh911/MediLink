import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
        <h1>{title}</h1>
        <p>
        Your beacon of health and healing. With cutting-edge facilities and compassionate care, we're dedicated to your well-being. From advanced treatments to personalized attention, trust us for comprehensive healthcare. At MediLink, your journey to wellness begins with us. Welcome to a world of healing and hope.        </p>

        </div>
        <div className='banner'>
            <img src={imageUrl} alt='hero ' className='animated-image' />
            <span>
                <img  src='/Vector.png' alt='vector' />
            </span>
        </div>
    </div>
  )
}

export default Hero