import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./Context/AppContext";
import Login from "./components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCategories from "./Pages/ProductCategories";
import ProductDetails from "./Pages/ProductDetails";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  const {showUserLogin} = useAppContext();
  return (
    <div>
      {isSellerPath ? "null" : <Navbar />}
      {showUserLogin ? <Login/> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategories />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      {isSellerPath ? "null" : <Footer />}
    </div>
  );
};

export default App;
