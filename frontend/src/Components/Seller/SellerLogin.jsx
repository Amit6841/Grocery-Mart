import React, { useEffect, useState } from 'react'
import { userAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const SellerLogin = () => {
    const { isSeller, setisSeller, navigate, axios } = userAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setLoading(true);
            const { data } = await axios.post('/api/seller/login', { email, password });

            if (data.success) {
                setisSeller(true);
                navigate('/seller');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    },[isSeller,navigate])

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[url(https://img.freepik.com/free-vector/watercolor-world-vegetarian-day-background_52683-91758.jpg?t=st=1745249637~exp=1745253237~hmac=bb0827eba9141537e164594ffb1490c301ea52945b7e121f873039e5bf358bbf&w=1380)] bg-center'>
            <form onSubmit={onSubmitHandler} className='w-[350px] bg-white flex flex-col gap-4 shadow-2xl rounded-2xl p-4'>
                <p className='text-center text-3xl my-5 text-yellow-400'>Seller Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Admin Email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-yellow-500" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Admin password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-yellow-500" type="password" required />
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 transition-all text-white w-full py-2 rounded-md cursor-pointer" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default SellerLogin