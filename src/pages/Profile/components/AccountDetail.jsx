import { useState, useEffect, useContext } from "react"; 
import UserInput from "common/components/UserInput";
import RadioButton from "common/components/RadioButton";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { CustomerService } from "services/firebase/customer";

const AccountDetail = () => {

  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext); 
  const { userLoggedIn, referencesAdvance } = currentUser; 
  const [ firstName, setFirstName ] = useState((referencesAdvance && referencesAdvance.firstName) || "");
  const [ lastName, setLastName ] = useState((referencesAdvance && referencesAdvance.lastName) || "");
  const [ displayName, setDisplayName ] = useState((userLoggedIn && userLoggedIn.displayName) || "");
  const [ phone, setPhone ] = useState((userLoggedIn && userLoggedIn.phoneNumber) || ""); 
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
          lastName
        }
      })
    })
    .catch((err) => console.error(err.message)); 
  }

  const getErrors = () => {
    const firstNameRegexExtract = firstName.match(/[A-Za-z]/g);
    const lastNameRegexExtract = lastName.match(/[A-Za-z]/g);
    const displayNameRegexExtract = displayName.match(/[A-Za-z0-9]/g);
    const phoneRegexExtract = phone.match(/[0-9]/g);
    const emailRegexExtract = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const firstNameError = (firstNameRegexExtract === null && "Vui lòng thêm First name") || (firstNameRegexExtract.length < firstName.length && "Chỉ được phép ký tự là chữ") || "";
    const lastNameError = (lastNameRegexExtract === null && "Vui lòng thêm Last name") || (lastNameRegexExtract.length < lastName.length && "Chỉ được phép ký tự là chữ") || "";
    const displayNameError = (displayNameRegexExtract === null && "Vui lòng thêm Display name") || (displayNameRegexExtract.length < displayName.length && "Chỉ được phép ký tự là chữ hoặc số") || "";
    const phoneError =  (phoneRegexExtract === null && "Vui lòng thêm Phone") || (phoneRegexExtract.length < phone.length && "Chỉ được phép ký tự là số" ) || "";
    const emailError = (emailRegexExtract === null && "Email không hợp lệ") || "";

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
          <div className="row"> 
            <div className="col lg-12 md-12 sm-12 mb-36px">
              <span className="account-details__gender-title fw-600">Gender</span>  
              <div className="account-details__gender-radios d-flex">
                <RadioButton label="Male" />
                <RadioButton label="Female"/>
              </div>
            </div>
          </div>
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