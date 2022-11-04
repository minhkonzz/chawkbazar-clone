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
         <div className="cart-top">
            <h2>Shopping cart</h2>
            <ion-icon name="close" onClick={closeCartModal}/>
         </div>
         <div className="cart-center"> {
            cartItems.map((cartItem, index) => <CartItem key={index} data={cartItem}/>)
         }
         </div>
         <div className="cart-bottom">
            <button className="dark-v thin-bd-r">{`Proceed to checkout | $${cartTotalPrice}`}</button>
         </div>
      </div>
   )
}

export default Cart;