import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { CustomerService } from "services/firebase/customer";
import { touchMessageBox } from "services/redux/store/reducers/popup.reducer"; 
import CheckoutFields from "./CheckoutFields";
import CheckoutConfirm from "./CheckoutConfirm";

const CheckoutDetail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext) || { currentUser: null };
  const { userLoggedIn, referencesAdvance } = currentUser || { userLoggedIn: null, referencesAdvance: null }; 
  const cart = useSelector((state) => state.cart); 

  const [ isOnlinePaySelected, setIsOnlinePaySelected ] = useState(false);
  const [ firstName, setFirstName ] = useState((referencesAdvance && referencesAdvance.firstName) || ""); 
  const [ lastName, setLastName ] = useState((referencesAdvance && referencesAdvance.lastName) || "");
  const [ address, setAddress ] = useState((referencesAdvance && referencesAdvance.address) || "");
  const [ phone, setPhone ] = useState((userLoggedIn && userLoggedIn.phone) || "");
  const [ email, setEmail ] = useState((userLoggedIn && userLoggedIn.email) || "");   
  const [ city, setCity ] = useState(""); 
  const [ postCode, setPostCode ] = useState(""); 
  const [ orderNote, setOrderNote ] = useState("");

  const createOrder = (paymentInstance) => {
    if (cart.cartItems.length === 0) {
      dispatch(touchMessageBox({
        type: "warn", 
        content: "Vui lòng thêm sản phẩm vào giỏ"
      }));
      return; 
    }
    CustomerService.placeOrder({
      firstName, lastName, address, 
      phone, email, city, 
      postCode,
      note: orderNote,
      cartItems: cart.cartItems,
      shipFee: 2.99, 
      payment: {
        type: paymentInstance ? "pay_online" : "cash_on_delivery",
        isPaid: !!paymentInstance
      }, 
    }, (userLoggedIn && userLoggedIn.uid) || "")
    .then((orderId) => {
      if (orderId) navigate("/checkout/success");
    })
    .catch((err) => console.error(err.message));
  }

  return (
    <>
      <div className="col lg-7 md-6 sm-12">
        <CheckoutFields {
          ... { 
            firstName,
            setFirstName,
            lastName,
            setLastName,
            address,
            setAddress,
            phone, 
            setPhone, 
            email, 
            setEmail, 
            city, 
            setCity, 
            postCode, 
            setPostCode, 
            orderNote, 
            setOrderNote,
            isOnlinePaySelected, 
            createOrder 
          }
        } />
      </div>
      <div className="col lg-5 md-6 sm-12">
        <CheckoutConfirm {
          ... { 
            isOnlinePaySelected, 
            setIsOnlinePaySelected, 
            cart, 
            createOrder 
          }
        } />
      </div>
    </>
  )
}

export default CheckoutDetail;