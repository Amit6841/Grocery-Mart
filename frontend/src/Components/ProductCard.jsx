import React from 'react';
import { assets } from '../assets/assets';
import { userAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addTocart, removeCart, navigate, cartItems, user, setshowUserLogin } = userAppContext();

    const handleAddToCart = (productId) => {
        if (user) {
            addTocart(productId);
        } else {
            setshowUserLogin(true); // Show the login component
        }
    };

    if (!product) return null; // Safeguard against undefined product

    return (
        <div
            onClick={() => {
                navigate(`/products/${product.category?.toLowerCase()}/${product._id}`);
                scrollTo(0, 0);
            }}
            className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-50 w-full"
        >
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={product.image?.[0]} // Safeguard for image array
                    alt={product.name || "Product"}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <img
                                key={i}
                                src={i < 3 ? assets?.star_icon : assets?.star_dull_icon} // Safeguard for assets
                                alt="star"
                            />
                        ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-black">
                        {currency}
                        {product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            {currency}
                            {product.price}
                        </span>
                    </p>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="text-green-500"
                    >
                        {!cartItems?.[product._id] ? ( // Safeguard for cartItems
                            <button
                                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer text-green-600 font-medium"
                                onClick={() => handleAddToCart(product._id)}
                            >
                                <img src={assets?.cart_icon} alt="cart_icon" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] border rounded select-none">
                                <button
                                    onClick={() => {
                                        removeCart(product._id);
                                    }}
                                    className="cursor-pointer text-lg px-2 h-full"
                                >
                                    -
                                </button>
                                <span className="w-5 text-xl text-center">{cartItems[product._id]}</span>
                                <button
                                    onClick={() => {
                                        handleAddToCart(product._id);
                                    }}
                                    className="cursor-pointer text-lg px-2 h-full"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;