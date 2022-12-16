import './index.css';
import { Outlet } from 'react-router-dom';

const Checkout = () => (
  <div className="checkout-detail row">
    <Outlet />
  </div>
);

export default Checkout;