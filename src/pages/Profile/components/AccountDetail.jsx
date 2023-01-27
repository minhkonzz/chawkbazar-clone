import { useState, useContext } from "react"; 
import { useDispatch } from "react-redux";
import { useInputsValidation } from "hooks/useInputsChecker.hook";
import UserInput from "common/components/UserInput";
// import RadioButton from "common/components/RadioButton";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { CustomerService } from "services/firebase/customer";
import { touchMessageBox } from "services/redux/store/reducers/popup.reducer";
import { regex } from "utils/constants";

const AccountDetail = () => {

  const dispatch = useDispatch();
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext); 
  const { userLoggedIn, referencesAdvance } = currentUser; 
  const [ firstName, setFirstName ] = useState((referencesAdvance && referencesAdvance.firstName) || "");
  const [ lastName, setLastName ] = useState((referencesAdvance && referencesAdvance.lastName) || "");
  // const [ gender, setGender ] = useState((referencesAdvance && referencesAdvance.gender) || "");
  const [ displayName, setDisplayName ] = useState((userLoggedIn && userLoggedIn.displayName) || "");
  const [ phone, setPhone ] = useState((referencesAdvance && referencesAdvance.phone) || ""); 
  const [ email, setEmail ] = useState((userLoggedIn && userLoggedIn.email) || "");

  const updateCustomerProfile = () => {
    CustomerService.updateCustomerAccountDetail(
      userLoggedIn, 
      { firstName, lastName, displayName, phone, email } 
    )
    .then(() => {
      updateCurrentUser({
        userLoggedIn, 
        referencesAdvance: {
          ...referencesAdvance, 
          firstName, 
          lastName,
          phone
        }
      }); 
      dispatch(touchMessageBox({
        type: "success", 
        content: "Cập nhật hồ sơ thành công"
      }))
    })
    .catch((err) => console.error(err.message)); 
  }

  const { errors, handleAfterValidate: updateAccountDetail } = useInputsValidation([
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
      fieldTitle: "Display name", 
      inputValue: displayName, 
      pattern: regex.USERNAME_REGEX, 
      errorIdentifier: "displayNameError", 
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
      errorMessage: "Email không hợp lệ"
    }
  ], updateCustomerProfile);

  return (
    <> {
      userLoggedIn && referencesAdvance && 
      <div className="profile__content account-details row">
        <div className="col lg-12 md-12 sm-12">
          <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <h2 className="profile__content-title">Account Details</h2>
            </div>
          </div>
          <div className="row"> 
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={(!!errors && errors["firstNameError"]) || ""}/>
            </div>
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={(!!errors && errors["lastNameError"]) || ""}/>
            </div>
          </div>
          <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Display name *" inputValue={displayName} onChangeText={setDisplayName} errorMessage={(!!errors && errors["displayNameError"]) || ""}/>
            </div>
          </div>
          <div className="row"> 
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={(!!errors && errors["phoneError"]) || ""}/>  
            </div>
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={(!!errors && errors["emailError"]) || ""}/>  
            </div>
          </div>
          {/* <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <span className="account-details__gender-title fw-600">Gender</span>  
              <div className="account-details__gender-radios d-flex">
                <RadioButton label="Male" />
                <RadioButton label="Female" />
              </div>
            </div>
          </div> */}
          <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <button className="account-details__save-button dark-v fw-600 thin-bd-r" onClick={updateAccountDetail}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default AccountDetail;