import { useState, useEffect, useContext } from "react"; 
import { useDispatch } from "react-redux";
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
  const [ errors, setErrors ] = useState(null);

  useEffect(() => {
    if (errors) setErrors(null);
  }, [firstName, lastName, displayName, phone, email]);

  const updateCustomerProfile = () => {
    const errs = getErrors();
    if (errs) {
      setErrors(errs);
      return;
    }
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

  const getErrors = () => {

    const { EMAIL_REGEX, NAME_REGEX, USERNAME_REGEX, NUMERIC_REGEX } = regex;
    const firstNameRegexExtract = firstName.match(NAME_REGEX);
    const lastNameRegexExtract = lastName.match(NAME_REGEX);
    const displayNameRegexExtract = displayName.match(USERNAME_REGEX);
    const phoneRegexExtract = phone.match(NUMERIC_REGEX);
    const emailRegexExtract = email.match(EMAIL_REGEX);
    const firstNameError = (firstName.length === 0 && "Vui lòng thêm First name") || (firstNameRegexExtract === null && "Chỉ được phép ký tự là chữ") || "";
    const lastNameError = (lastName.length === 0 && "Vui lòng thêm Last name") || (lastNameRegexExtract === null && "Chỉ được phép ký tự là chữ") || "";
    const displayNameError = (displayName.length === 0 && "Vui lòng thêm Display name") || (displayNameRegexExtract === null && "Chỉ được phép ký tự là chữ hoặc số") || "";
    const phoneError =  (phone.length === 0 && "Vui lòng thêm Phone") || (phoneRegexExtract === null && "Chỉ được phép ký tự là số" ) || "";
    const emailError = (email.length === 0 && "Vui lòng thêm Email") || (emailRegexExtract === null && "Email không hợp lệ") || "";

    if (firstNameError || lastNameError || displayNameError || phoneError || emailError) {
      return {
        firstNameError,
        lastNameError,
        displayNameError,
        phoneError,
        emailError
      }
    }
    return null;
  }

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
              <UserInput h={62} label="First name *" inputValue={firstName} onChangeText={setFirstName} errorMessage={errors?.firstNameError}/>
            </div>
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Last name *" inputValue={lastName} onChangeText={setLastName} errorMessage={errors?.lastNameError}/>
            </div>
          </div>
          <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Display name *" inputValue={displayName} onChangeText={setDisplayName} errorMessage={errors?.displayNameError}/>
            </div>
          </div>
          <div className="row"> 
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Phone/Mobile *" inputValue={phone} onChangeText={setPhone} errorMessage={errors?.phoneError}/>  
            </div>
            <div className="col lg-6 md-12 sm-12 mb-36px">
              <UserInput h={62} label="Email *" inputValue={email} onChangeText={setEmail} errorMessage={errors?.emailError}/>  
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
              <button className="account-details__save-button dark-v fw-600 thin-bd-r" onClick={updateCustomerProfile}>
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