import './Contactus.css'
import Form from "./components/Form/Form"
import LocationInfo from "./components/LocationInfo/LocationInfo"

const ContactUs = () => (
  <div className="contactus-detail row">
    <div className="col lg-3 lg-offset-2 md-5 sm-12"> 
      <LocationInfo />
    </div>
    <div className="col lg-5 md-7 sm-12">
      <Form />
    </div>
  </div>
)

export default ContactUs