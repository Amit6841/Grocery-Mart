import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = 'include';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "https://grocery-mart-alpha.vercel.app"

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setisSeller] = useState(false);
    const [showUserLogin, setshowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setcartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState([]);

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/isauth');
            if (data.success) {
                setisSeller(true);
            } else {
                setisSeller(false);
            }
        } catch (error) {
            setisSeller(false);
        }
    };

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/isauth');
            if (data.success) {
                setuser(data.success)
                setcartItems(data.user.cartItems)
            } 
        } catch (error) {
            setuser(null)
        }
    };
    const addTocart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setcartItems(cartData);
        toast.success("Added to cart");
    };

    const updateCart = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setcartItems(cartData);
        toast.success("Cart updated");
    };

    const removeCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed cart items");
        setcartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        fetchUser()
        fetchSeller();
        fetchProduct();

    }, []);

    useEffect(() => {
        const updatedCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updatedCart()
        }
    }, [cartItems])


    const value = {
        navigate,
        user,
        setuser,
        isSeller,
        getCartCount,
        setisSeller,
        products,
        showUserLogin,
        setshowUserLogin,
        currency,
        addTocart,
        axios,
        updateCart,
        removeCart,
        cartItems,
        setcartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        fetchProduct
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const userAppContext = () => {
    return useContext(AppContext);
};
