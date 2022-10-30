import './index.css';
import { useLocation } from 'react-router-dom';
import { paths } from '../../../utils/constants';

const HeaderBackground = () => {

  const location = useLocation();

  const getHeaderBackgroundTitle = () => {
    switch(location.pathname) {
      case paths.PROFILE_PATH:
        return 'My Account' 
      case paths.FAQ_PATH:
        return 'Frequently Asked Questions'
      case paths.TERMS_PATH:
        return 'Terms of Service'
      case paths.CONTACTUS_PATH:
        return 'Contact Us'
      case paths.CHECKOUT_PATH:
        return 'Checkout'
      default:
        return 'My Account'
    }
  }

  return (
    <div className="bg-header">
      <div className="transparent">
        <div className="bg-header-titles posab pos-center">
          <h5>Explore</h5>
          <p>{getHeaderBackgroundTitle()}</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderBackground