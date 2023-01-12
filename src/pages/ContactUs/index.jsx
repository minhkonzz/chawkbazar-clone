import './index.css'
import Form from "./components/Form"
import LocationInfo from "./components/LocationInfo"

const ContactUs = () => (
  <div className="contactus-detail row">
    <div className="col lg-3 lg-offset-1 md-5 sm-12"> 
      <LocationInfo />
    </div>
    <div className="col lg-7 md-7 sm-12">
      <Form />
    </div>
  </div>
)

export default ContactUs;