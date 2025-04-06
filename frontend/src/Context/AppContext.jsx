import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState();
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // Fatch All Products
  const fatchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Card Products
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]){
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // Update Cart Items
  const updateCartData = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated successfully");
  };

  // Remove Cart Item
  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Item removed from cart");
    setCartItems(cartData);
  };

  // get Cart item Count
  const getCartItem = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // Total Cart Item
  const totalCartItemPrice = ()=>{
    let totalItem = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items);
      if(cartItems[items] > 0){
        totalItem += itemInfo.offerPrice * cartItems[items]
      }
    }
    return Math.floor(totalItem * 100) / 100;
  }

  useEffect(() => {
    fatchProducts();
  }, []);

  const value = {
    navigate,
    isUser,
    setIsUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartData,
    removeCartItem,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartItem,
    totalCartItemPrice,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
