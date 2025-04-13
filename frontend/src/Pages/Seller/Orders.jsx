import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { assets} from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios, isSeller } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get("api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(isSeller){
      fetchOrders();
    }
  }, [isSeller]);
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5 min-w-80">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className={"text-primary"}>x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="font-medium mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
              </p>
              <p>
                {order.address.state},{order.address.zipcode},{" "}
              </p>
              <p>{order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-lg my-auto">
              {currency}{order.amount}
            </p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
