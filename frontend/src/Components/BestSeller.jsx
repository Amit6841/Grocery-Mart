import React from 'react'
import ProductCard from './ProductCard'
import { userAppContext } from '../context/AppContext'

const BestSeller = () => {

    const  {products } = userAppContext()
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Best seller</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6 gap-5'>
                {products.filter((product)=>product.inStock).slice(0,6).map((product,index)=>(
                    <ProductCard key={index} product={product} />
                ))}
                
            </div>
        </div>

    )
}

export default BestSeller