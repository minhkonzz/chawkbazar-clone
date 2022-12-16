import UserInput from "../../../common/components/UserInput";
import Checkbox from "../../../common/components/Checkbox";

const CheckoutFields = (props) => {

  const { 
    createOrder, 
    isOnlinePaymentSelected, 
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
    setOrderNote
  } = props; 

  return (
    <div className="checkout-fields row">
      <div className="col mb-36px lg-12 md-12 sm-12">
        <div className="row">
          <div className="col mb-36px lg-12 md-12 sm-12">
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <h2>Shipping Address</h2>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="First name *" inputValue={firstName} onChangeText={setFirstName} />
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="Last name *" inputValue={lastName} onChangeText={setLastName} />
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <UserInput h={60} label="Address *" inputValue={address} onChangeText={setAddress} />
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} />
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="Email *" inputValue={email} onChangeText={setEmail} />
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="City/Town" inputValue={city} onChangeText={setCity} />
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={60} label="Postcode" inputValue={postCode} onChangeText={setPostCode} />
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <Checkbox>
                  Save this information for the next time
                </Checkbox>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <UserInput label="Order notes (Optional)" inputValue={orderNote} onChangeText={setOrderNote} isTextArea rows={7} />
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                { !!isOnlinePaymentSelected === false && 
                  <button style={{ width: 140, height: 55 }} className="dark-v fw-600 thin-bd-r" onClick={() => createOrder()}>
                    Place order
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutFields;