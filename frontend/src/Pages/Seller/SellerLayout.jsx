import React from 'react';
import { userAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

// Set axios base URL globally

const SellerLayout = () => {
    const { axios, navigate } = userAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller" },
        { name: "Product List", path: "/seller/product-list"},
        { name: "Orders", path: "/seller/orders"},
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);

        }
    };

    return (
        <>
            <div className="fixed w-full h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-yellow-400">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-white">Grocery Mart</h1>
                </Link>
                <div className="flex items-center gap-5">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className="border rounded-full text-sm px-4 py-1 hover:bg-white" aria-label="Logout">
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex pt-18">
                <div className="md:w-64 w-16 border-r h-screen text-base border-gray-300 pt-1 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item) => (
                        <Link
                            to={item.path}
                            key={item.name}
                            className={({ isActive }) => `h-[100%] flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500 border-indigo-500 text-white"
                                    : "hover:bg-gray-100 text-gray-700"}`
                            }
                        >
                            <p className="md:block hidden text-center text-sm p-5">{item.name}</p>
                        </Link>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default SellerLayout;