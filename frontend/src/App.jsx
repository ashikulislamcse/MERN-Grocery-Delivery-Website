import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  return (
    <div>
      {isSellerPath ? "null" : <Navbar />}
      <div
        className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
