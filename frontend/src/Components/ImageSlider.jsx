import React, { useState,useEffect } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const images = [
  'https://img.freepik.com/free-photo/supermarket-banner-concept-with-ingredients_23-2149421147.jpg?t=st=1745247134~exp=1745250734~hmac=b7fdb29ffd63f4dc13fb4e19671b9004e35502f7ec4f5fb35e7dde5e036ab11c&w=1380',
  'https://img.freepik.com/premium-photo/food-delivery-home-donation-charity-selective-focus_73944-13115.jpg?w=1380',
  'https://img.freepik.com/premium-photo/banner-group-vegetables-minimalistic-modern-harvest-tomatoes-zucchini-squash_1048944-3078666.jpg?w=1380',
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // 3 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="relative w-full h-[400px] mx-auto my-10 overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform ease-out duration-500 "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="w-[100%] flex-shrink-0 bg-center bg-auto"
            alt={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute h-7 w-7 p-7 flex items-center justify-center left-2 top-1/2 -translate-y-1/2 bg-transparent text-white rounded-full"
      >
       
      </button>
      <button
        onClick={nextSlide}
        className="absolute h-7 w-7 p-7 flex items-center justify-center right-2 top-1/2 -translate-y-1/2 bg-transparent text-white rounded-full" 
      >
      </button>
    </div>
  );
}