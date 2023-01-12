import './index.css'; 
import { useRef } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { touchCartSidebar } from "services/redux/store/reducers/popup.reducer"; 
import { fixDecimal } from 'functions';
import BagSvg from "../../svgs/bag";
import CartItem from './components/CartItem';

const Cart = () => {

  const { cartItems, cartTotalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef(null);

  const closeCartModal = () => {
    cartRef.current.style.right = '-100%';
    setTimeout(() => { dispatch(touchCartSidebar()); }, 500); 
  }; 

  const redirectToCheckout = () => {
    closeCartModal();
    navigate("/checkout/detail");
  }

  return (
    <div className="cart" ref={cartRef}>
      <div className="cart-top posrel">
        <h2 className="posab top-50pc left-5pc">Shopping cart</h2>
        <span className="posab top-50pc right-5pc">
          <ion-icon name="close" onClick={closeCartModal}/>
        </span>
      </div>
      <div className="cart-center"> {
        Array.isArray(cartItems) && cartItems.length > 0 ? 
        cartItems.map((cartItem, index) => <CartItem key={index} data={cartItem}/>) : 
        <div className="d-flex fd-col w-100pc h-100pc jc-sa at-center">
          <BagSvg />   
          <p className="blur fw-600">Không có sản phẩm nào trong giỏ hàng</p>
        </div>
      }
      </div>
      <div className="cart-bottom posrel">
        <button className="posab pos-center dark-v thin-bd-r fw-600" onClick={redirectToCheckout}>{`Proceed to checkout | $${cartItems.length === 0 ? 0 : fixDecimal(cartTotalPrice, 2)}`}</button>
      </div>
    </div>
  )
}

export default Cart;