import './header-background.css';
import { useLocation } from 'react-router-dom';
import { paths } from 'utils/constants';

const HeaderBackground = () => {

  const location = useLocation();

  const getHeaderBackgroundTitle = () => {
    switch (location.pathname) {
      case paths.PROFILE_PATH:
        return 'My Account'; 
      case paths.FAQ_PATH:
        return 'Frequently Asked Questions';
      case paths.TERMS_PATH:
        return 'Terms of Service';
      case paths.CONTACTUS_PATH:
        return 'Contact Us';
      case paths.CHECKOUT_PATH:
        return 'Checkout';
      default:
        return 'My Account';
    }
  }

  return (
    <div className="banner-default">
      <div className="banner-default__titles">
        <span className="banner-default__title-above">Explore</span>
        <span className="banner-default__title-under">{getHeaderBackgroundTitle()}</span>
      </div>
    </div>
  )
}

export default HeaderBackground;