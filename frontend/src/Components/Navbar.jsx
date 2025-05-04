import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoCartOutline, IoMenu, IoSearchSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { userAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const { user, setuser, setshowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = userAppContext()

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setuser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }

    }, [searchQuery])

    return (
        <nav className="w-full top-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-green-500 fixed transition-all z-[99]">

            <NavLink className={"flex"} to="/" onClick={() => setOpen(false)}>
                <h1 className='text-4xl text-white'>GroceryMart</h1>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center  gap-8 text-white">
                <div className="hidden lg:flex items-center text-sm gap-2 bg-white border-[2px] border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <IoSearchSharp className='text-2xl text-black' />
                </div>

                <NavLink to="/" className="hover:text-yellow-300">Home</NavLink>
                <NavLink to="/products" className="hover:text-yellow-300">All products</NavLink>
                <NavLink to="/about" className="hover:text-yellow-300">About</NavLink>


                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <IoCartOutline className='text-2xl' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-yellow-400 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (<button onClick={() => setshowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-yellow-400 hover:bg-yellow-500 transition text-white rounded-full">
                    Login
                </button>) : (
                    <div className='relative group'>
                        <MdOutlineAccountCircle className='text-3xl hover:text-gray-200' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white text-black shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>logout</li>
                        </ul>
                    </div>
                )
                }
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="hidden">
                <IoMenu className='text-3xl' />
            </button>


            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/" onClick={() => {
                        setOpen(false);
                        setshowUserLogin(true)
                    }}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All products</NavLink>
                    {user && <NavLink to="/products" onClick={() => setOpen(false)}>My orders</NavLink>}
                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                    {!user ? (<button onClick={() => {
                        setOpen(false);
                        setshowUserLogin(true)
                    }
                    } className="cursor-pointer px-6 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-full text-sm">
                        Login
                    </button>) : (<button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-full text-sm">
                        logout
                    </button>)}

                </div>
            )}
        </nav>
    )
}

export default Navbar