import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden mt-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center items-start">
          <span className="text-sm text-green-500 font-semibold mb-2">Grocery Shop</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            We provide <span className="text-green-500">Fresh</span> grocery.
          </h2>
          <p className="text-gray-600 mb-6">
            Keep it easy with these simple but delicious recipes. From make-ahead lunches and midweek meals to
            fuss-free sides.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full">
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/top-view-assortment-vegetables-with-word-vegan-paper-bag_23-2148853339.jpg?t=st=1745248084~exp=1745251684~hmac=cf1d235d5335cb1e6af2d70ce693c2cdd05532e32e87d68655c339ad300cf1d7&w=1380" // Replace with your actual image URL
            alt="Fresh Vegetables"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
            FREE DELIVERY
          </div>
        </div>
      </div>
    </div>
  )
}

export default About