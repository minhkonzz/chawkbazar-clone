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
      errorIdentifer: "firstNameError", 
      errorMessage: "Chỉ được phép ký tự là chữ"
    },
    {
      fieldTitle: "Last name", 
      inputValue: lastName, 
      pattern: regex.NAME_REGEX, 
      errorIdentifer: "lastNameError", 
      errorMessage: "Chỉ được phép ký tự là chữ"
    },
    {
      fieldTitle: "Address", 
      inputValue: address, 
      pattern: regex.ALPHANUMERIC_REGEX, 
      errorIdentifer: "addressError", 
      errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
    },
    {
      fieldTitle: "Phone", 
      inputValue: phone, 
      pattern: regex.NUMERIC_REGEX, 
      errorIdentifer: "phoneError", 
      errorMessage: "Chỉ được phép ký tự là số"
    },
    {
      fieldTitle: "Email", 
      inputValue: email, 
      pattern: regex.EMAIL_REGEX, 
      errorIdentifer: "emailError", 
      errorMessage: "Email không hợp lệ1"
    }
  ], createOrder);

  // const [ errors, setErrors ] = useState(null);

  // const placeOrder = () => {
  //   const errs = getErrors();
  //   if (errs) {
  //     setErrors(errs);
  //     return;
  //   }
  //   createOrder();
  // }

  // const getErrors = () => {

  //   const { EMAIL_REGEX, NAME_REGEX, ALPHANUMERIC_REGEX, NUMERIC_REGEX } = regex;
  //   const firstNameRegexExtract = firstName.match(NAME_REGEX);
  //   const lastNameRegexExtract = lastName.match(NAME_REGEX);
  //   const addressRegexExtract = address.match(ALPHANUMERIC_REGEX);
  //   const phoneRegexExtract = phone.match(NUMERIC_REGEX);
  //   const emailRegexExtract = email.match(EMAIL_REGEX);
  //   const firstNameError = (firstName.length === 0 && "Vui lòng thêm First name") || (firstNameRegexExtract === null && "Chỉ được phép ký tự là chữ") || "";
  //   const lastNameError = (lastName.length === 0 && "Vui lòng thêm Last name") || (lastNameRegexExtract === null && "Chỉ được phép ký tự là chữ") || "";
  //   const addressError = (address.length === 0 && "Vui lòng thêm Address") || (addressRegexExtract === null && "Chỉ được phép ký tự là chữ hoặc số") || "";
  //   const phoneError =  (phone.length === 0 && "Vui lòng thêm Phone") || (phoneRegexExtract === null && "Chỉ được phép ký tự là số" ) || "";
  //   const emailError = (email.length === 0 && "Vui lòng thêm Email") || (emailRegexExtract === null && "Email không hợp lệ") || "";

  //   if (firstNameError || lastNameError || addressError || phoneError || emailError) {
  //     return {
  //       firstNameError,
  //       lastNameError,
  //       addressError,
  //       phoneError,
  //       emailError
  //     }
  //   }
  //   return null;
  // }

  // useEffect(() => {
  //   if (errors) setErrors(null);
  // }, [firstName, lastName, address, phone, email]);

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
                <UserInput h={62} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={errors["firstNameError"]}/>
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={errors["lastNameError"]}/>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <UserInput h={62} label="Address *" inputValue={address} onChangeText={setAddress} errorMessage={errors["addressError"]}/>
              </div>
            </div>
            <div className="row">
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={errors["phoneError"]}/>
              </div>
              <div className="col mb-36px lg-6 md-12 sm-12">
                <UserInput h={62} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={errors["emailError"]}/>
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