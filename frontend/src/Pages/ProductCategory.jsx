import React from 'react'
import { userAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../Components/ProductCard'

const ProductCategory = () => {
    const {products} = userAppContext()
    const {category} = useParams()
  
    const searchCategory =categories.find((item)=>item.path.toLowerCase()===category)

    const filteredProducts = products.filter((product)=>product.category.toLowerCase()=== category)
  return (
    <div className='mt-16'>
        {
         searchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-indigo-500 rounded-full'></div>
            </div>
         )
        }
        {
            filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6 gap-5'>
                    {filteredProducts.map((product)=>
                    <ProductCard key={product._id} product={product}/>)}
                </div>
            ):(
                <div className='flex items-center justify-center h-[60vh]'>
                    < p className="text-2xl">no search for this products</p>
                     
                </div>
            )
        }
    </div>
  )
}

export default ProductCategory