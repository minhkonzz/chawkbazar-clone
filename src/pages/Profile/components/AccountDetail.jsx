import { useState, useContext } from "react"; 
import UserInput from "../../../common/components/UserInput";
import RadioButton from "../../../common/components/RadioButton";
import { CurrentUserContext } from "../../../context/currentUser.provider";
import { CustomerService } from "../../../services/firebase/customer";

const AccountDetail = () => {

   const { currentUser, updateCurrentUser } = useContext(CurrentUserContext); 
   const { userLoggedIn, referencesAdvance } = currentUser; 
   const [ firstName, setFirstName ] = useState((referencesAdvance && referencesAdvance.firstName) || "");
   const [ lastName, setLastName ] = useState((referencesAdvance && referencesAdvance.lastName) || "");
   const [ displayName, setDisplayName ] = useState((userLoggedIn && userLoggedIn.displayName) || "");
   const [ phone, setPhone ] = useState((userLoggedIn && userLoggedIn.phoneNumber) || ""); 
   const [ email, setEmail ] = useState((userLoggedIn && userLoggedIn.email) || ""); 

   const updateCustomerProfile = () => {
      CustomerService.updateCustomerAccountDetail(
         userLoggedIn, 
         { firstName, lastName, displayName, phone, email } 
      )
      .then(() => {
         alert("Update profile success");
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

   return (
      <>
         {
            userLoggedIn && referencesAdvance && 
            <div className="profile-part row">
               {
                  console.log("render orders jsx")
               }
               <div className="col lg-12 md-12 sm-12">
                  <div className="row"> 
                     <div className="col lg-12 md-12 sm-12">
                        <h2>Account Details</h2>
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
                        <UserInput label="Display name *" inputValue={displayName} onChangeText={setDisplayName}/>  
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
                     <div className="col lg-12 md-12 sm-12">
                        <span className="gentle">Gender</span>  
                        <div className="d-flex radio-group">
                           <RadioButton label="Male" />
                           <RadioButton label="Female"/>
                        </div>
                     </div>
                  </div>
                  <div className="row"> 
                     <div className="col lg-12 md-12 sm-12">
                        <button className="w-130px h-50px dark-v fw-600 thin-bd-r" onClick={updateCustomerProfile}>
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

export default AccountDetail