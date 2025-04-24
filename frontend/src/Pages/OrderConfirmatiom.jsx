import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const OrderConfirmation = () => {
  useEffect(() => {
    // Animation effects
    const container = document.querySelector('.animate-container');
    if (container) {
      container.classList.add('scale-up-center');
    }

    const button1 = document.querySelector('.animate-button1');
    const button2 = document.querySelector('.animate-button2');

    if (button1) {
      button1.classList.add('fade-in-button');
    }
    if (button2) {
      button2.classList.add('fade-in-button-2');
    }
  }, []);

  return (
    <div className="mt-16 flex flex-col items-center justify-center animate-container">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-gray-200">
        {/* Check Circle Icon */}
        <div className="flex justify-center mb-6">
          <img src="https://img.freepik.com/free-vector/successful-purchase-concept-illustration_114360-2652.jpg?t=st=1745176041~exp=1745179641~hmac=6e7f596a8426f5d6d74e614224051a3674e481e64a2147273a78be461e025816&w=826" alt="" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4 animate-title">
          Thank you for your order!
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-center mb-6 animate-description">
          Your order has been placed successfully.  We'll send you a confirmation email
          with the details.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to='/my-orders'
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-6 rounded-full
                       transition-colors duration-200 w-full sm:w-auto animate-button1
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            View Order
          </Link>
          <Link to='/'
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-full
                       transition-colors duration-200 w-full sm:w-auto animate-button2
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <style jsx global>{`
        .scale-up-center {
          animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }

        .animate-check-circle {
          animation: color-change-pulse 2s infinite;
        }

        .animate-title {
          animation: slide-in-from-left 0.6s ease-out;
        }

        .animate-description {
          animation: slide-in-from-right 0.6s ease-out;
        }

        .fade-in-button {
          animation: fade-in 1s ease-in, slide-in-from-bottom 0.5s ease-out;
        }

        .fade-in-button-2 {
          animation: fade-in 1s ease-in, slide-in-from-bottom 0.5s ease-out 0.2s;
        }

        @keyframes scale-up-center {
          0% {
            transform: scale(0.5);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes color-change-pulse {
          0% {
            color: #22c55e;
          }

          50% {
            color: #16a34a;
          }

          100% {
            color: #22c55e;
          }
        }

        @keyframes slide-in-from-left {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }

          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-from-right {
          0% {
            transform: translateX(50px);
            opacity: 0;
          }

          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-from-bottom {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
