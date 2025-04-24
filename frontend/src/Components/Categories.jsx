import React from 'react'
import { categories } from '../assets/assets'
import { userAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = userAppContext()
  return (
    <div className='mt-2'>
      <div className='flex justify-center overflow-x-auto gap-3'>
        {categories.map((category, index) => (
          <div key={index}
            onClick={() => { navigate(`/products/${category.path.toLowerCase()}`); scrollTo(0, 0) }}
            className='group cursor-pointer px-3 gap-3 rounded-3xl flex flex-col justify-center items-center'>
            <img src={category.image} alt={category.text}
              style={{ backgroundColor: category.bgColor }}
              className='p-5 rounded-full group-hover:scale-108 transition max-w-28' />
            <p className='text-sm font-medium'>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories