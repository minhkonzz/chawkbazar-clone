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
      <div className="profile__account-details">
        <span className="profile__title">Account Details</span>
        <div className="profile__account-details__form">
          <UserInput h={55} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={(!!errors && errors["firstNameError"]) || ""}/>
          <UserInput h={55} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={(!!errors && errors["lastNameError"]) || ""}/>
          <UserInput h={55} label="Display name *" inputValue={displayName} onChangeText={setDisplayName} errorMessage={(!!errors && errors["displayNameError"]) || ""}/>
          <UserInput h={55} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={(!!errors && errors["phoneError"]) || ""}/>  
          <UserInput h={55} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={(!!errors && errors["emailError"]) || ""}/>  
          <button className="profile__account-details__save-button" onClick={updateAccountDetail}>
            Save
          </button>
        </div>
      </div>
      }
    </>
  )
}

export default AccountDetail;