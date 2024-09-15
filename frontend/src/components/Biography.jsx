import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
        <div className='banner'>
            <img src={imageUrl} alt='about'/>

        </div>
        <div className='banner'>
            <p>Biography</p>
            <h3>Who we are</h3>
            <p>At MediLink AI, we stand as a beacon of healthcare excellence, committed to delivering compassionate care and cutting-edge medical services to our community and beyond.</p>
            <p>Equipped with state-of-the-art facilities and advanced medical technology, Meddling Hospital ensures that patients receive the highest standard of care, with access to the latest diagnostic and treatment modalities available in modern medicine.</p>
            <p>From routine check-ups to complex surgical procedures, Meddling Hospital offers a comprehensive range of medical services across various specialties, ensuring that patients receive holistic care under one roof.</p>

        </div>
    </div>
  )
}

export default Biography