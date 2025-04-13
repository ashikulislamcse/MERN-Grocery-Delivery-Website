import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, axios, isUser } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/user");
      if (data?.success && Array.isArray(data.orders)) {
        setMyOrders(data.orders);
      } else {
        toast.error(data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUser) {
      fetchMyOrders();
    }
  }, [isUser]);

  return (
    <div className="mt-10 pb-10">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-amber-400 rounded-full"></div>
      </div>

      {loading && <p className="text-gray-500 mb-4">Loading your orders...</p>}

      {!loading && myOrders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </p>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-500/70 ${
                order.items.length !== idx + 1 ? "border-b" : ""
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item?.product?.image?.[0] || "/placeholder.jpg"}
                    alt="product"
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item?.product?.name || "Product Name"}
                  </h2>
                  <p>Category: {item?.product?.category || "N/A"}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center mb-4 md:mb-0 md:ml-8">
                <p>Quantity: {item?.quantity || 1}</p>
                <p>Status: {order?.status || "Pending"}</p>
                <p>
                  Date:{" "}
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <p className="text-lg font-medium text-primary">
                Amount: {currency}
                {item?.product?.offerPrice
                  ? item.product.offerPrice * (item.quantity || 1)
                  : "0"}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
