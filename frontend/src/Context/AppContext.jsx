import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState(null); 
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  // 🛒 Cart Items - load from localStorage on init
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const [searchQuery, setSearchQuery] = useState({});

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch User Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setIsUser(data.user);
      } else {
        setIsUser(null);
      }
    } catch (error) {
      toast.error(error.message);
      setIsUser(null);
    } finally {
      setIsUserLoading(false); 
    }
  };

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add to Cart
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
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
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  // Get Cart Item Count
  const getCartItem = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Total Cart Item Price
  const totalCartItemPrice = () => {
    let totalItem = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0 && itemInfo) {
        totalItem += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalItem * 100) / 100;
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  const value = {
    navigate,
    isUser,
    setIsUser,
    isSeller,
    setIsSeller,
    isUserLoading, 
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
    axios,
    fetchProducts,
    setCartItems,
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
