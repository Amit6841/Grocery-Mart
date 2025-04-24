import React, { useState, useEffect } from 'react';
import { userAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className='h-12 w-full bg-slate-300 my-3 rounded-xl px-3 outline-none'
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
    />
);

const AddAddress = () => {
    const { axios, user, navigate } = userAppContext();

    const [address, setaddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setaddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        for (const key in address) {
            if (!address[key]) {
                return toast.error(`Please fill in the ${key} field`);
            }
        }

        try {
            const { data } = await axios.post('/api/address/add', { address });

            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    };

    return (
        <div className='w-full mt-20 pb-16'>
            <p className='text-4xl md:3xl'>Add Shipping Address</p>
            <div className='flex flex-col items-center justify-center '>
                <form onSubmit={onSubmitHandler} className='w-[500px] p-5 border border-green-500 rounded-xl mt-5 '>
                    <div className='flex gap-3'>
                        <InputField type='text' handleChange={handleChange} address={address} name='firstName' placeholder='First Name' />
                        <InputField type='text' handleChange={handleChange} address={address} name='lastName' placeholder='Last Name' />
                    </div>
                    <InputField type='text' handleChange={handleChange} address={address} name='email' placeholder='Email Address' />
                    <InputField type='text' handleChange={handleChange} address={address} name='street' placeholder='Street' />
                    <div>
                        <InputField type='text' handleChange={handleChange} address={address} name='city' placeholder='City' />
                    </div>
                    <div className='flex gap-3'>
                        <InputField type='text' handleChange={handleChange} address={address} name='state' placeholder='State' />
                        <InputField type='text' handleChange={handleChange} address={address} name='country' placeholder='Country' />
                    </div>
                    <div className='flex gap-3'>
                        <InputField type='number' handleChange={handleChange} address={address} name='zipcode' placeholder='Zipcode' />
                        <InputField type='text' handleChange={handleChange} address={address} name='phone' placeholder='Phone' />
                    </div>
                    <button className='h-12 w-full rounded-lg bg-green-500 hover:bg-green-600 text-white capitalize text-lg'>Save Address</button>
                </form>
            </div>
        </div>
    );
};

export default AddAddress;