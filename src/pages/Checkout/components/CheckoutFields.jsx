import { useState, useEffect } from "react";
import UserInput from "common/components/UserInput";
import Checkbox from "common/components/Checkbox";

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

  const [ errors, setErrors ] = useState(null);

  const placeOrder = () => {
    const errs = getErrors();
    if (errs) {
      setErrors(errs);
      return;
    }
    createOrder();
  }

  const getErrors = () => {
    const firstNameRegexExtract = firstName.match(/[A-Za-z]/g);
    const lastNameRegexExtract = lastName.match(/[A-Za-z]/g);
    const addressRegexExtract = address.match(/[A-Za-z0-9]/g);
    const phoneRegexExtract = phone.match(/[0-9]/g);
    const emailRegexExtract = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const firstNameError = (firstNameRegexExtract === null && "Vui lòng thêm First name") || (firstNameRegexExtract.length < firstName.length && "Chỉ được phép ký tự là chữ") || "";
    const lastNameError = (lastNameRegexExtract === null && "Vui lòng thêm Last name") || (lastNameRegexExtract.length < lastName.length && "Chỉ được phép ký tự là chữ") || "";
    const addressError = (addressRegexExtract === null && "Vui lòng thêm Address") || "";
    const phoneError =  (phoneRegexExtract === null && "Vui lòng thêm Phone") || (phoneRegexExtract.length < phone.length && "Chỉ được phép ký tự là số" ) || "";
    const emailError = (emailRegexExtract === null && "Email không hợp lệ") || "";

    if (firstNameError || lastNameError || addressError || phoneError || emailError) {
      return {
        firstNameError,
        lastNameError,
        addressError,
        phoneError,
        emailError
      }
    }
    return null;
  }

  useEffect(() => {
    if (errors) setErrors(null);
  }, [firstName, lastName, address, phone, email]);

  return (
    <div className="checkout__fields row">
      <div className="col mb-36px lg-12 md-12 sm-12">
        <div className="row">
          <div className="col mb-36px lg-12 md-12 sm-12">
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <h2 className="checkout__title">Shipping Address</h2>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={errors?.firstNameError}/>
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={errors?.lastNameError}/>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <UserInput h={62} label="Address *" inputValue={address} onChangeText={setAddress} errorMessage={errors?.addressError}/>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={errors?.phoneError}/>
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={errors?.emailError}/>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="City/Town" inputValue={city} onChangeText={setCity} />
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Postcode" inputValue={postCode} onChangeText={setPostCode} />
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
                { !isOnlinePaymentSelected && 
                  <button className="checkout__fields-order-button dark-v fw-600 thin-bd-r" onClick={placeOrder}>
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