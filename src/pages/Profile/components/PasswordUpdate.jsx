import { useState, useContext } from "react"; 
import UserInput from "../../../common/components/UserInput";
import { CustomerService } from "../../../services/firebase/customer";
import { CurrentUserContext } from "../../../context/provider/currentUser.provider";

const PasswordUpdate = () => {

   const { currentUser } = useContext(CurrentUserContext); 
   const { userLoggedIn } = currentUser; 
   const [ oldPassword, setOldPassword ] = useState(""); 
   const [ newPassword, SetNewPassword ] = useState("");

   const updateNewPassword = () => {
      CustomerService.updateCustomerPassword(userLoggedIn, newPassword)
      .then(() => {
         alert("Update password success"); 
      })
      .catch((err) => console.error(err.message)); 
   }

   return (
      <div className="profile-part row">
         <div className="col lg-12 md-12 sm-12">
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <h1>Change Password</h1>
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <UserInput label="Old password" inputValue={oldPassword} onChangeText={setOldPassword} />  
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <UserInput label="New password" inputValue={newPassword} onChangeText={SetNewPassword} />  
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <button className="btn-save-passwd dark-v fw-600 thin-bd-r" onClick={updateNewPassword}>
                     Change password
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PasswordUpdate 