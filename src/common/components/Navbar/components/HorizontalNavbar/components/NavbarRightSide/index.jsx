import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import { touchCartSidebar, touchAuthDialog } from "services/redux/store/reducers/popup.reducer";

const NavbarRightSide = () => {

  const currentUserValue = useContext(CurrentUserContext);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
    
  const cartItemsAmount = useSelector((state) => state.cart.cartItems.length); 

  return (
    <div className="navbar-right">
      <button className="navbar-right__search-button">
        <ion-icon name="search"/>
      </button>
      <h4 className="navbar-right__username" onClick={() => currentUserValue ? navigate("/profile") : dispatch(touchAuthDialog())}>{ currentUserValue ? currentUserValue.currentUser.userLoggedIn.displayName : "Login"}</h4>
      <button className="navbar-right__cart-preview" onClick={() => dispatch(touchCartSidebar())}>
        { cartItemsAmount > 0 && <span className="navbar-right__cart-preview__amount">{cartItemsAmount}</span> }
        <ion-icon name="bag-handle-outline" />
      </button>
    </div>
  )
};

export default NavbarRightSide;