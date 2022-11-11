import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../../../../../../context/provider/currentUser.provider";
import { touchCartSidebar, touchAuthDialog } from "../../../../../../../services/redux/store/reducers/popup.reducer";

const NavbarRightSide = () => {

    const currentUserValue = useContext(CurrentUserContext);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    
    const cartItemsAmount = useSelector((state) => state.cart.cartItems.length); 

    return (
        <div className="navbar-right d-flex at-center">
            <ion-icon name="search"/>
            <h4 onClick={() => currentUserValue ? navigate("/profile") : dispatch(touchAuthDialog())}>{ currentUserValue ? currentUserValue.currentUser.userLoggedIn.displayName : "Login"}</h4>
            <div className="cart-preview posrel" onClick={() => dispatch(touchCartSidebar())}>
                <span className="d-flex jc-center at-center cart-amount dark-v posab circle-bd-r fw-600">{cartItemsAmount}</span>
                <ion-icon name="bag-handle-outline" />
            </div>
        </div>
    )
};

export default NavbarRightSide;