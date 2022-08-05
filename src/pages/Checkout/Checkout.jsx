import './Checkout.css'
import HeaderBackground from "../../common/HeaderBackground/HeaderBackground"
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"
import CheckoutFields from './components/CheckoutFields'
import CheckoutConfirm from './components/CheckoutConfirm'

const Checkout = () => (
  <>
    <header>
      <HeaderBackground />
    </header>
    <div className="grid wide">
      <main>
        <div className="checkout-detail row">
          <div className="col lg-6 lg-offset-1 md-6 sm-12">
            <CheckoutFields />
          </div>
          <div className="col lg-4 md-6 sm-12">
            <CheckoutConfirm />
          </div>
        </div>
        <UserMailGetter />
      </main>
      <Footer />
    </div>
  </>
)

export default Checkout