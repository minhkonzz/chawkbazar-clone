import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../../context/provider/currentUser.provider";
import { CustomerService } from "../../../services/firebase/customer";

const Orders = () => {

   const navigate = useNavigate();
   const { currentUser } = useContext(CurrentUserContext);
   const { userLoggedIn } = currentUser; 
   const [ orders, setOrders ] = useState(""); 

   useEffect(() => {
      CustomerService.getOrdersOfCustomer((userLoggedIn && userLoggedIn.uid) || "")
      .then((customerOrders) => { setOrders(customerOrders); })
      .catch((err) => console.error(err.message));
   }, []); 

   const viewOrderDetail = (orderId) => {
      navigate(`/profile/orders/${orderId}`); 
   }

   return (
      <div className="profile-part row">
         <div className="col lg-12 md-12 sm-12">
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <h2>Orders</h2>
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12"> { 
                  Array.isArray(orders) && orders.length > 0 ? 
                  <table className="content-table w-100pc o-h">
                     <thead>
                        <tr>
                           <th>Order</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Total</th>
                           <th>Action</th>
                        </tr>
                     </thead> 
                     <tbody> {
                        orders.map((order, index) => (
                           <tr key={index}>
                              <td>{order.orderId}</td>
                              <td>{order.orderDate}</td>
                              <td>{order.orderState}</td>
                              <td>{`$${order.orderTotalPay} for ${order.orderTotalQuantity} products`}</td>
                              <td><button className="dark-v thin-bd-r fw-600" onClick={() => viewOrderDetail(order.orderId)}>View</button></td>
                           </tr>
                        ))
                     }
                     </tbody>
                  </table> : 
                  <div className="text-center blur fw-600">
                     <p>Bạn chưa có đơn hàng nào</p>
                  </div>   
               }
               </div>
            </div>
         </div>
      </div>
   )
}

export default Orders; 