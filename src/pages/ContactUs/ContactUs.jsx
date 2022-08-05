import './Contactus.css'
import HeaderBackground from "../../common/HeaderBackground/HeaderBackground"
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"
import Form from "./components/Form/Form"
import LocationInfo from "./components/LocationInfo/LocationInfo"

const ContactUs = () => (
  <>
    <header>
      <HeaderBackground />
    </header>
    <div className="grid wide">
      <main>
        <div className="contactus-detail row">
          <div className="col lg-3 lg-offset-2 md-5 sm-12"> 
            <LocationInfo />
          </div>
          <div className="col lg-5 md-7 sm-12">
            <Form />
          </div>
        </div>
        <UserMailGetter />
      </main>
      <Footer />
    </div>
  </>
)

export default ContactUs