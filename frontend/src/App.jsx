import React from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"
import { userAppContext } from "./context/AppContext"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Home from "./Pages/Home"
import Allproduct from "./Pages/Allproduct"
import Footer from "./Components/Footer"
import ProductCategory from "./Pages/ProductCategory"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import AddAddress from "./Pages/AddAddress"
import Myorder from "./Pages/Myorder"
import SellerLogin from "./Components/Seller/SellerLogin"
import SellerLayout from "./Pages/Seller/SellerLayout"
import AddProduct from "./Pages/Seller/AddProduct"
import ProductList from "./Pages/Seller/ProductList"
import Orders from "./Pages/Seller/Orders"
import OrderConfirmation from "./Pages/OrderConfirmatiom"
import About from "./Pages/About"

function App() {

  const isSellerPath = useLocation().pathname.includes("/seller")
  const { showUserLogin, isSeller } = userAppContext()
  return (
    <>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Allproduct />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/confirmation' element={<OrderConfirmation />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<Myorder />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />} >
           <Route index element={isSeller ? <AddProduct/> :null}/>
           <Route path="product-list" element={<ProductList/>}/>
           <Route path="orders" element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}

    </>
  )
}

export default App
