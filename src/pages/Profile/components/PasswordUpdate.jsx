import { useState, useContext } from "react"; 
import { useDispatch } from "react-redux";
import UserInput from "common/components/UserInput";
import { CustomerService } from "services/firebase/customer";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { touchMessageBox } from "services/redux/store/reducers/popup.reducer";
import { PASSWORD_REGEX } from "utils/constants/regex";

const PasswordUpdate = () => {

  const dispatch = useDispatch();
  const { currentUser } = useContext(CurrentUserContext); 
  const { userLoggedIn } = currentUser; 
  const [ oldPassword, setOldPassword ] = useState(""); 
  const [ newPassword, SetNewPassword ] = useState(""); 

  const updateNewPassword = () => {
    const currentUserPassword = localStorage.getItem("user_pwd"); 
    if (oldPassword !== currentUserPassword) {
      dispatch(touchMessageBox({
        type: "error", 
        content: "Mật khẩu cũ không đúng"
      }))
      return;
    }
    CustomerService.updateCustomerPassword(userLoggedIn, newPassword)
    .then(() => {
      dispatch(touchMessageBox({
        type: "success", 
        content: "Cập nhật mật khẩu thành công"
      }))
    })
    .catch((err) => console.error(err.message)); 
  }

  return (
    <div className="profile__content change-password row">
      <div className="col lg-12 md-12 sm-12">
        <div className="row">
          <div className="col lg-12 md-12 sm-12 mb-36px">
            <h2 className="profile__content-title">Change Password</h2>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12 mb-36px">
            <UserInput h={62} label="Old password" inputValue={oldPassword} onChangeText={setOldPassword} />  
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12 mb-36px">
            <UserInput h={62} label="New password" inputValue={newPassword} onChangeText={SetNewPassword} errorMessage={(!newPassword.match(PASSWORD_REGEX) && "Password cần tối thiểu 8 đến 15 ký tự, chứa ít nhất 1 ký tự đặc biệt và 1 ký tự in hoa") || ""} />  
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12 mb-36px">
            <button className="change-password__button dark-v fw-600 thin-bd-r" onClick={updateNewPassword}>
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordUpdate;