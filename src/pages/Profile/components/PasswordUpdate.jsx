import Button from "../../../common/Button/Button"
import UserInput from "../../../common/UserInput/UserInput"

const PasswordUpdate = () => {
   return (
      <div className="row">
         <div className="col lg-12 md-12 sm-12">
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <h1>Change Password</h1>
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <UserInput label="Old password"/>  
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <UserInput label="New password"/>  
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <Button text="Change password" w={160}/>  
               </div>
            </div>
         </div>
      </div>
   )
}

export default PasswordUpdate 