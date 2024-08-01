// import React from "react";
// import { Link } from "react-router-dom";
// import image from "../assets/books/Image 1.png"
// function MyOrdersContainer() {
//   const orderDetails = localStorage.getItem("orderDetails");
  
//   if (!orderDetails) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <div className="flex-grow">
//           <div className="w-[80%] mx-auto font-[Roboto]">
//             <div className="mt-[20px]">
//               <Link to="/" className="text-[#9D9D9D]">Home /</Link>
//               <span>My Orders</span>
//             </div>
//             <div className="flex flex-col items-center justify-center gap-10 mt-5 min-h-[200px]">
//               <h1 className="text-xl">
//                 You have not Ordered Anything!
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const order = JSON.parse(orderDetails);


//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="flex-grow">
//         <div className="w-[80%] mx-auto font-[Roboto]">
//           <div className="mt-[20px]">
//             <Link to="/" className="text-[#9D9D9D]">Home /</Link>
//             <span>My Orders</span>
//           </div>
//           <div className="flex flex-col items-center justify-center gap-10 mt-5 min-h-[200px]">
//             {order.orders.map((orderItem, index) => (
//               <div key={index} className="flex w-full p-10 h-[180px] rounded font-[Roboto] border-[#707070] border justify-between">
//                 <div className="flex gap-10">
//                   <img src={image} alt="" className="w-[80px] h-[100px]" />
//                   <div className="flex flex-col gap-2">
//                     <h1 className="font-medium">{orderItem.product_name}</h1>
//                     <p className="text-[#878787] text-sm">by {orderItem.author}</p>
//                     <div className="flex items-center gap-3">
//                       <h1 className="text-[18px] font-bold">Rs. {orderItem.product_price}</h1>
//                       <p className="line-through text-[15px] text-[#878787]">Rs. {orderItem.original_price}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center font-bold ">
//                   <li className="text-[#26A541] text-2xl"/><span className="">Order Placed on {order.order_date}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyOrdersContainer;


import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/books/Image 1.png";

function MyOrdersContainer() {
  const orderDetails = localStorage.getItem("orderDetails");
  console.log(orderDetails, "hello");

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
              <h1 className="text-xl">You have not Ordered Anything!</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const parsedOrderDetails = JSON.parse(orderDetails);
  const allOrders = parsedOrderDetails.orders.flatMap(order => 
    order.orders.map(item => ({ ...item, order_date: order.order_date }))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="w-[80%] mx-auto font-[Roboto]">
          <div className="mt-[20px]">
            <Link to="/" className="text-[#9D9D9D]">Home /</Link>
            <span>My Orders</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 mt-5 min-h-[200px]">
            {allOrders.map((orderItem, index) => (
              <div key={index} className="flex w-full p-10 h-[180px] rounded font-[Roboto] border-[#707070] border justify-between">
                <div className="flex gap-10">
                  <img src={image} alt="" className="w-[80px] h-[100px]" />
                  <div className="flex flex-col gap-2">
                    <h1 className="font-medium">{orderItem.product_name}</h1>
                    <p className="text-[#878787] text-sm">by {orderItem.author}</p>
                    <div className="flex items-center gap-3">
                      <h1 className="text-[18px] font-bold">Rs. {orderItem.product_price}</h1>
                      <p className="line-through text-[15px] text-[#878787]">Rs. {orderItem.original_price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center font-bold ">
                  <li className="text-[#26A541] text-2xl"/><span className="">Order Placed on {orderItem.order_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrdersContainer;

