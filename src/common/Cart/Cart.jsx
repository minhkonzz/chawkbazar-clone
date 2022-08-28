import './Cart.css'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { touchCartSidebar } from '../../store/reducers/popup'
import CartItem from './components/CartItem'

const Cart = () => {

   const dispatch = useDispatch()
   const cartRef = useRef(null)

   const closeCartModal = () => {
      cartRef.current.style.right = '-100%'
      setTimeout(() => {
         dispatch(touchCartSidebar())
      }, 500)
   }

   return (
      <div className="cart" ref={cartRef}>
         <div className="cart-top">
            <h2>Shopping cart</h2>
            <ion-icon name="close" onClick={closeCartModal}/>
         </div>
         <div className="cart-center">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
         </div>
         <div className="cart-bottom">
            <button className="dark-v thin-bd-r">Proceed to checkout | $831.29</button>
         </div>
      </div>
   )
}

export default Cart