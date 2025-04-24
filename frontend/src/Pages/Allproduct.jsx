import React, { useEffect, useState } from 'react'
import { userAppContext } from '../context/AppContext'
import ProductCard from '../Components/ProductCard'

const Allproduct = () => {
    const { products, searchQuery } = userAppContext()
    const [filteredProducts, setfilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setfilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setfilteredProducts(products)
        }
    }, [products, searchQuery])

    return (
        <div className='mt-25'>
            <p className='text-2xl md:text-3xl font-medium'>All products</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6 gap-5'>
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}

            </div>
        </div>
    )
}

export default Allproduct