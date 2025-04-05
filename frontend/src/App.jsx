import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  return (
    <div>
      {isSellerPath ? "null" : <Navbar />}
      <Toaster />
      <div
        className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {isSellerPath ? "null" : <Footer />}
    </div>
  );
};

export default App;
