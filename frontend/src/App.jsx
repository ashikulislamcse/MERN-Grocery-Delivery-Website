import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./Context/AppContext";
import Login from "./components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCategories from "./Pages/ProductCategories";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerLayout from "./Pages/Seller/SellerLayout";
import AddProduct from "./Pages/Seller/AddProduct";
import ProductList from "./Pages/Seller/ProductList";
import Orders from "./Pages/Seller/Orders";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Loading from "./components/Loading";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategories />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path="product-list" element={<ProductList/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
      {isSellerPath ? null : <Footer />}
    </div>
  );
};

export default App;
