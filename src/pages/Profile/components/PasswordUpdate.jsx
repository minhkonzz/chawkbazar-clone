import UserInput from "../../../common/UserInput"

const PasswordUpdate = () => {
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
                  {/* <Button text="Change password" w={160}/>   */}
                  <button style={{ width: 160, height: 52 }} className="dark-v fw-600 thin-bd-r">
                     Change password
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PasswordUpdate 