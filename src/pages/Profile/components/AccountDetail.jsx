import UserInput from "../../../common/UserInput/UserInput"
import RadioButton from "../../../common/RadioButton/RadioButton"
import Button from "../../../common/Button/Button"

const AccountDetail = () => {
   return (
      <div className="row">
         <div className="col lg-12 md-12 sm-12">
            <div className="row"> 
               <div className="col lg-12 md-12 sm-12">
                  <h2>Account Details</h2>
               </div>
            </div>
            <div className="row"> 
               <div className="col lg-6 md-12 sm-12">
                  <UserInput label="First name *"/>  
               </div>
               <div className="col lg-6 md-12 sm-12">
                  <UserInput label="Last name *"/>  
               </div>
            </div>
            <div className="row"> 
               <div className="col lg-12 md-12 sm-12">
                  <UserInput label="Display name *"/>  
               </div>
            </div>
            <div className="row"> 
               <div className="col lg-6 md-12 sm-12">
                  <UserInput label="Phone/Mobile *"/>  
               </div>
               <div className="col lg-6 md-12 sm-12">
                  <UserInput label="Email *"/>  
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
                  <Button text="Save" w={130}/>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AccountDetail