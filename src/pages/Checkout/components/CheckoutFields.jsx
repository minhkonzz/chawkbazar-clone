import UserInput from "common/components/UserInput";
import Checkbox from "common/components/Checkbox";
import { regex } from "utils/constants";
import { useInputsValidation } from "hooks/useInputsChecker.hook";

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

  const { errors, handleAfterValidate: placeOrder } = useInputsValidation([
    {
      fieldTitle: "First name", 
      inputValue: firstName, 
      pattern: regex.NAME_REGEX, 
      errorIdentifier: "firstNameError", 
      errorMessage: "Chỉ được phép ký tự là chữ"
    },
    {
      fieldTitle: "Last name", 
      inputValue: lastName, 
      pattern: regex.NAME_REGEX, 
      errorIdentifier: "lastNameError", 
      errorMessage: "Chỉ được phép ký tự là chữ"
    },
    {
      fieldTitle: "Address", 
      inputValue: address, 
      pattern: regex.ALPHANUMERIC_REGEX, 
      errorIdentifier: "addressError", 
      errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
    },
    {
      fieldTitle: "Phone", 
      inputValue: phone, 
      pattern: regex.NUMERIC_REGEX, 
      errorIdentifier: "phoneError", 
      errorMessage: "Chỉ được phép ký tự là số"
    },
    {
      fieldTitle: "Email", 
      inputValue: email, 
      pattern: regex.EMAIL_REGEX, 
      errorIdentifier: "emailError", 
      errorMessage: "Email không hợp lệ1"
    }
  ], createOrder);

  return (
    <div className="checkout__fields">
      <span className="checkout__title">Shipping Address</span>
      <div className="checkout__fields__form">
        <UserInput h={55} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={(!!errors && errors["firstNameError"]) || ""}/>
        <UserInput h={55} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={(!!errors && errors["lastNameError"]) || ""}/>
        <UserInput h={55} label="Address *" inputValue={address} onChangeText={setAddress} errorMessage={(!!errors && errors["addressError"]) || ""}/>
        <UserInput h={55} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={(!!errors && errors["phoneError"]) || ""}/>
        <UserInput h={55} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={(!!errors && errors["emailError"]) || ""}/>
        <UserInput h={55} label="City/Town" inputValue={city} onChangeText={setCity} />
        <UserInput h={55} label="Postcode" inputValue={postCode} onChangeText={setPostCode} />
        <Checkbox>Save this information for the next time</Checkbox>
        <UserInput label="Order notes (Optional)" inputValue={orderNote} onChangeText={setOrderNote} isTextArea rows={7} />
        { !isOnlinePaymentSelected && 
          <button className="checkout__fields-order-button" onClick={placeOrder}>
            Place order
          </button> }
      </div>
    </div>
  )
}

export default CheckoutFields;