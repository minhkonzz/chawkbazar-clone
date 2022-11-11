import './index.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { touchCartSidebar } from "../../../services/redux/store/reducers/popup.reducer"
import CartItem from './components/CartItem'

const Cart = () => {

   const { cartItems, cartTotalPrice } = useSelector(state => state.cart);
   const dispatch = useDispatch();
   const cartRef = useRef(null);
   console.log("cart:", cartItems);

   const closeCartModal = () => {
      cartRef.current.style.right = '-100%';
      setTimeout(() => {
         dispatch(touchCartSidebar());
      }, 500)
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
            cartItems.map((cartItem, index) => <CartItem key={index} data={cartItem}/>)
         }
         </div>
         <div className="cart-bottom posrel">
            <button className="posab pos-center dark-v thin-bd-r fw-600">{`Proceed to checkout | $${Number(cartTotalPrice).toFixed(2)}`}</button>
         </div>
      </div>
   )
}

export default Cart;