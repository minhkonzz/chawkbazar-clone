import './index.css';
import CheckoutFields from './components/CheckoutFields';
import CheckoutConfirm from './components/CheckoutConfirm';

const Checkout = () => (
  <div className="checkout-detail row">
    <div className="col lg-6 lg-offset-1 md-6 sm-12">
      <CheckoutFields />
    </div>
    <div className="col lg-4 md-6 sm-12">
      <CheckoutConfirm />
    </div>
  </div>
);

export default Checkout;