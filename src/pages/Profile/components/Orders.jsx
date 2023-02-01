import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { CustomerService } from "services/firebase/customer";
import Order from "./Order";

const Orders = () => {

  const { currentUser } = useContext(CurrentUserContext);
  const { userLoggedIn } = currentUser; 
  const [ orders, setOrders ] = useState(""); 
  const [ order, setOrder ] = useState(null);

  useEffect(() => {
    CustomerService.getOrdersOfCustomer((userLoggedIn && userLoggedIn.uid) || "")
    .then((customerOrders) => { setOrders(customerOrders); })
    .catch((err) => console.error(err.message));
  }, []); 

  if (order) return <Order {...{order, setOrder}}/>

  return (
    <div className="profile__orders">
      <span className="profile__title">Orders</span> { 
        Array.isArray(orders) && orders.length > 0 ? 
        <table className="profile__orders__detail">
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
            orders.map((order, i) => (
              <tr key={i}>
                <td>{order.orderId}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderState}</td>
                <td>{`$${order.orderTotalPay} for ${order.orderTotalQuantity} products`}</td>
                <td><button className="profile__orders__detail__view-button" onClick={() => setOrder(order)}>View</button></td>
              </tr>
            ))
          }
          </tbody>
        </table> : 
        <p className="profile__orders__empty-status">Bạn chưa có đơn hàng nào</p>  
      }
    </div>
  )
}

export default Orders; 