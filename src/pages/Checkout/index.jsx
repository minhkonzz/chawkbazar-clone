import './index.css';
import { Outlet } from 'react-router-dom';

const Checkout = () => (
  <div className="checkout row">
    <Outlet />
  </div>
);

export default Checkout;