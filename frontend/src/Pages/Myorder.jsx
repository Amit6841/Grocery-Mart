import React, { useEffect, useState } from "react";
import { userAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Myorder = () => {
    const [myOrder, setmyOrder] = useState([]);
    const { currency, axios, user } = userAppContext();

    const fetchMyOrder = async () => {
        try {
            const { data } = await axios.get("/api/order/user", {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include the token
                },
            });
            if (data.success) {
                console.log("Orders Data:", data.orders); // Debug log
                setmyOrder(data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            toast.error("Failed to fetch orders. Please try again later.");
        }
    };

    useEffect(() => {
        if (user) fetchMyOrder();
    }, [user]);

    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-3xl uppercase font-medium">My order</p>
                <div className="w-16 h-0.5 bg-indigo-500 rounded-full"></div>
            </div>
            {myOrder.length === 0 ? (
                <p className="text-gray-500 text-center">You have no orders yet.</p>
            ) : (
                myOrder.map((order, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
                    >
                        <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                            <span>OrderId : {order._id}</span>
                            <span>Payment : {order.paymentType}</span>
                            <span>
                                Total Amount : {currency}
                                {order.amount}
                            </span>
                        </p>
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className={`relative bg-white text-gray-500 ${
                                    order.items.length !== index + 1 && "border-b"
                                } border-gray-300 flex flex-col md:flex-row md-items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                            >
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div className="p-4 rounded-lg">
                                        <img
                                            src={
                                                item.product?.image?.[0] ||
                                                "/path/to/default-image.jpg"
                                            }
                                            alt={item.product?.name || "Product"}
                                            className="h-16 w-16"
                                        />
                                    </div>
                                    <div>
                                        <h2>{item.product?.name}</h2>
                                        <p>category: {item.product?.category}</p>
                                    </div>
                                </div>
                                <div className="text-green-500 ml-8">
                                    <p>Quantity : {item.quantity || "1"}</p>
                                    <p>Status: {order.status}</p>
                                    <p>
                                        Date:{" "}
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                                <p className="text-lg py-3 text-green-500">
                                    Amount: {currency}
                                    {item.product?.offerPrice * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Myorder;