// import { useContext } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { BaseSource } from "utils/constants";
// import { touchMenuSidebar } from "services/redux/store/reducers/popup.reducer"; 
// import { CurrentUserContext } from "context/provider/currentUser.provider";

const NavbarLeftSide = () => {

  // const currentUserValue = useContext(CurrentUserContext);
  // const dispatch = useDispatch(); 
  // const navigate = useNavigate();
  const currentUserValue = false;

  return (
    // <div className="navbar-left">
    //   <button className="navbar-left__menu-lpc-button" onClick={() => dispatch(touchMenuSidebar())}>
    //     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
    //       <g transform="translate(-776 -462)">
    //         <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
    //         <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
    //         <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
    //       </g>
    //     </svg>
    //   </button>
    //   <img className="navbar-left__logoshop" alt="logo-shop" src={BaseSource.LOGO_SHOP_PATH} onClick={() => navigate("/")}/>
    //   <ul className="navbar-left__menu">
    //     <li className="navbar-left__menu__link" onClick={() => navigate('/catalog')}>Products</li>
    //     <li className="navbar-left__menu__link">
    //       Pages
    //       <div className="navbar-left__menu__link__menu-dropdown">
    //         { currentUserValue && <span onClick={() => navigate('/profile')}>My Account</span> }
    //         <span onClick={() => navigate('/faq')}>FAQ</span>
    //         <span onClick={() => navigate('/terms')}>Terms & Conditions</span>
    //         <span onClick={() => navigate('/contactus')}>Contact us</span>
    //         <span onClick={() => navigate('/checkout/detail')}>Checkout</span>
    //       </div>
    //     </li>
    //   </ul>
    // </div>
    <div className="navbar-left">
      <button className="navbar-left__menu-lpc-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
          <g transform="translate(-776 -462)">
            <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
            <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
            <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
          </g>
        </svg>
      </button>
      <img className="navbar-left__logoshop" alt="logo-shop" />
      <ul className="navbar-left__menu">
        <li className="navbar-left__menu__link">Products</li>
        <li className="navbar-left__menu__link">
          Pages
          <div className="navbar-left__menu__link__menu-dropdown">
            { currentUserValue && <span>My Account</span> }
            <span>FAQ</span>
            <span>Terms & Conditions</span>
            <span>Contact us</span>
            <span>Checkout</span>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default NavbarLeftSide;