import { useState, useContext } from "react"; 
import { useSelector } from "react-redux";
import { CurrentUserContext } from "../../../context/provider/currentUser.provider"
import { CustomerService } from "../../../services/firebase/customer";
import UserInput from "../../../common/components/UserInput";

const CheckoutFields = () => {

  const currentUser = useContext(CurrentUserContext); 
  const { userLoggedIn, referencesAdvance } = currentUser; 
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const [ firstName, setFirstName ] = useState((referencesAdvance && referencesAdvance.firstName) || ""); 
  const [ lastName, setLastName ] = useState((referencesAdvance && referencesAdvance.lastName) || "");
  const [ address, setAddress ] = useState((referencesAdvance && referencesAdvance.address) || "");
  const [ phone, setPhone ] = useState((userLoggedIn && userLoggedIn.phone) || "");
  const [ email, setEmail ] = useState((userLoggedIn && userLoggedIn.email) || "");   
  const [ city, setCity ] = useState(""); 
  const [ postCode, setPostCode ] = useState(""); 
  const [ orderNote, setOrderNote ] = useState("");
  
  const createOrder = () => {
    CustomerService.placeOrder({
      firstName, 
      lastName, 
      address, 
      phone,
      email,
      city, 
      postCode, 
      cartItems, 
      shipFee: 100, 
      paymentMethod: "Cash on delivery", 
      note: orderNote
    }, (userLoggedIn && userLoggedIn.uid) || "")
    .then((orderId) => {
      if (orderId) alert("Place order success"); 
    })
    .catch((err) => console.error(err.message)); 
  };

  return (
    <div className="checkout-fields row">
      <div className="col lg-12 md-12 sm-12">
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <h2>Shipping Address</h2>
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="First name *" inputValue={firstName} onChangeText={setFirstName} />
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Last name *" inputValue={lastName} onChangeText={setLastName} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Address *" inputValue={address} onChangeText={setAddress} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} />
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Email *" inputValue={email} onChangeText={setEmail} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="City/Town" inputValue={city} onChangeText={setCity} />
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Postcode" inputValue={postCode} onChangeText={setPostCode} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <input type="checkbox" />
            <label>Save this information for the next time</label>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Order notes (Optional)" inputValue={orderNote} onChangeText={setOrderNote} isTextArea rows={7} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <button style={{ width: 140, height: 55 }} className="dark-v fw-600 thin-bd-r" onClick={createOrder}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutFields