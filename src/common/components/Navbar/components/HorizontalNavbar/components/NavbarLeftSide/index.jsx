import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseSource } from "../../../../../../../utils/constants";
import { touchMenuSidebar } from "../../../../../../../services/redux/store/reducers/popup.reducer"; 
import { CurrentUserContext } from "../../../../../../../context/provider/currentUser.provider";

const NavbarLeftSide = () => {

    const currentUserValue = useContext(CurrentUserContext);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    return (
        <div className="navbar-left d-flex at-center">
            <button onClick={() => dispatch(touchMenuSidebar())}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
                    <g transform="translate(-776 -462)">
                        <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
                        <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
                        <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
                    </g>
                </svg>
            </button>
            <img alt="logo-shop" src={BaseSource.LOGO_SHOP_PATH}/>
            <ul className="d-flex">
                <li className="nav-link d-flex at-center fw-600" onClick={() => navigate('/catalog')}>Products</li>
                <li className="nav-link d-flex at-center fw-600">
                    Pages
                    <div className="dropdown-menu">
                        { currentUserValue && <span onClick={() => navigate('/profile')}>My Account</span> }
                        <span onClick={() => navigate('/faq')}>FAQ</span>
                        <span onClick={() => navigate('/terms')}>Terms & Conditions</span>
                        <span onClick={() => navigate('/contactus')}>Contact us</span>
                        <span onClick={() => navigate('/checkout')}>Checkout</span>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default NavbarLeftSide;