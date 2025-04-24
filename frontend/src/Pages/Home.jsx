import React from 'react'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import ImageSlider from '../Components/ImageSlider'

const Home = () => {
  return (
    <div className='mt-16 p-5'>
      <Categories />
      <ImageSlider />
      <BestSeller />
    </div>
  )
}

export default Home