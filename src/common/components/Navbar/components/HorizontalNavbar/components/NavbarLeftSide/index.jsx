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
            <ion-icon name="menu-outline" onClick={() => dispatch(touchMenuSidebar())}/> 
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