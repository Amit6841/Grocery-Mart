import React, { useEffect, useState } from 'react';
import { userAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import OrderConfirmation from './OrderConfirmatiom';
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";


const Cart = () => {
    const { user, products, currency, removeCart, cartItems, updateCart, getCartCount, navigate, getCartAmount, axios, setcartItems } = userAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [address, setAddress] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOpion] = useState("COD");

    const getCart = () => {
        if (!products || !cartItems) return;
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product) {
                tempArray.push({ ...product, quantity: cartItems[key] });
            }
        }
        setCartArray(tempArray);
    };

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            console.log("Address API Response:", data);
            if (data.success) {
                setAddress(data.address)
                if (data.address.length > 0) {
                    setSelectedAddress(data.address[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error.message);
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            if (!selectedAddress || !selectedAddress._id) {
                return toast.error("Please select a valid delivery address");
            }

            if (cartArray.length === 0) {
                return toast.error("Your cart is empty");
            }

            if (paymentOption === 'COD') {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                    address: selectedAddress._id,
                });

                if (data.success) {
                    toast.success(data.message);
                    setcartItems({});
                    getCart();
                    navigate('/confirmation');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                    address: selectedAddress._id,
                });

                if (data.success && data.url) {
                    console.log("Stripe URL:", data.url); // Debug log
                    window.location.replace(data.url);
                } else {
                    toast.error("Failed to redirect to payment. Please try again.");
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    if (cartArray.length === 0) {
        return (
            <div className="mt-25 h-[100%] flex flex-col items-center justify-center text-center ">
                <img src="https://static.vecteezy.com/system/resources/previews/004/964/514/non_2x/young-man-shopping-push-empty-shopping-trolley-free-vector.jpg" className='w-[300px]' alt="" />
                <h1 className="text-3xl font-medium">Your cart is empty</h1>
                <button onClick={() => navigate("/products")} className="mt-4 px-6 py-2 bg-green-500 text-white rounded">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row mt-25">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-green-500">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium p-3 border mr-3 rounded-lg  border-gray-300">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    window.scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                            >
                                <img
                                    className="max-w-full h-full object-cover"
                                    src={product.image[0] || '/path/to/default-image.jpg'}
                                    alt={product.name}
                                />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className="flex items-center">
                                        <p>Qty:</p>
                                        <select onChange={e => updateCart(product._id, Number(e.target.value))} value={cartItems[product._id] || 1} className="outline-none">
                                            {Array(Math.max(cartItems[product._id] || 1, 9)).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-green-500 text-xl">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeCart(product._id)} className="cursor-pointer mx-auto">
                        <MdDelete className='text-2xl hover:text-red-500' />
                        </button>
                    </div>
                ))}

                <button onClick={() => { navigate("/products"); window.scrollTo(0, 0); }} className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium">
                <FaArrowLeftLong className='text-lg'/>
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress
                                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                                : "No address found"}
                        </p>
                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-green-500 hover:underline cursor-pointer"
                        >
                            Change
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {Array.isArray(address) && address.length > 0 ? (
                                    address.map((addr, index) => (
                                        <p
                                            key={index}
                                            onClick={() => {
                                                setSelectedAddress(addr); // Set the selected address
                                                setShowAddress(false); // Close the dropdown
                                            }}
                                            className="text-gray-500 p-2 hover:bg-gray-100"
                                        >
                                            {addr.street}, {addr.city}, {addr.state}, {addr.country}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500 p-2">No addresses found</p>
                                )}
                                <p
                                    onClick={() => navigate("/add-address")}
                                    className="text-green-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                                >
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOpion(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Free Delivery</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-green-500 text-white font-medium hover:bg-green-600 transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    );
};

export default Cart;