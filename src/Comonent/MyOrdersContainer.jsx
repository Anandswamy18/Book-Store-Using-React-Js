import React from "react";
import { Link } from "react-router-dom";


function MyOrdersContainer({ orderDetails }) {
  // Check if orderDetails is defined
  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow">
          <div className="w-[80%] mx-auto font-[Roboto]">
            <div className="mt-[20px]">
              <Link to="/" className="text-[#9D9D9D]">Home /</Link>
              <span>My Orders</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-10 mt-5 min-h-[200px]">
              <h1 className="text-xl">
                You have not Ordered Anything!
              </h1>
            </div>
          </div>
        </div>
       
      </div>
    );
  }

  // Parse the JSON string to get the order details object
  const order = JSON.parse(orderDetails);

  return (
    <div className="flex flex-col min-h-screen">
     
      <div className="flex-grow">
        <div className="w-[80%] mx-auto font-[Roboto]">
          <div className="mt-[20px]">
            <Link href="/" className="text-[#9D9D9D]">Home /</Link>
            <span>My Orders</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 mt-5 min-h-[200px]">
            <div className="flex w-full p-10 h-[180px] rounded font-[Roboto] border-[#707070] border justify-between">
              <div className="flex gap-10">
                <img src="" alt="" className="w-[80px] h-[100px]" />
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium">{order.product_name}</h1>
                  <p className="text-[#878787] text-sm">by {order.seller}</p>
                  <div className="flex items-center gap-1">
                    <h1 className="text-[18px] font-bold">Rs. {order.product_price}</h1>
                    <p className="line-through text-[12px] text-[#878787]">Rs. {order.original_price}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center font-bold">
                <li className="text-[#26A541] text-2xl" />Order Placed on {order.order_date}
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default MyOrdersContainer;