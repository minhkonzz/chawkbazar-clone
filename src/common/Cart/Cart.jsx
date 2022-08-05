import './Cart.css'
import { useDispatch } from 'react-redux'
import { touchCartSidebar } from '../../store/reducers/popup'
import CartItem from './components/CartItem'

const Cart = () => {

   const dispatch = useDispatch()

   return (
      <div className="cart">
         <div className="cart-top">
            <h2>Shopping cart</h2>
            <ion-icon name="close" onClick={() => dispatch(touchCartSidebar())}/>
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