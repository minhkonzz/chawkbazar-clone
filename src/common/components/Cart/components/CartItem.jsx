import '../index.css'
import { BaseSource, MeanVars } from '../../../../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFromCart, adjustAmount } from "../../../../services/redux/store/reducers/cart.reducer"

const CartItem = ({ data }) => {

   const {
      DECREASE_ONCE, 
      INCREASE_ONCE
   } = MeanVars;

   const { PREFIX_API_SOURCE } = BaseSource;

   const dispatch = useDispatch();
   const changeAmount = changeType => {
      dispatch(adjustAmount({
         itemAdjust: data, 
         type: changeType
      }))
   }

   return (
      <div className="cart-item d-flex jc-sb at-center w-100pc">
         <div className="cart-item-img"> 
            <img src={`${PREFIX_API_SOURCE}${data?.image?.thumbnail}`} alt="cart-item-img" />
            <div className="del-icon w-100pc h-100pc" onClick={() => dispatch(removeFromCart(data))}>
               <ion-icon name="close-circle"/>
            </div>
         </div>
         <div className="cart-item-info">
            <p className="item-name">{`${data?.name} - ${data?.sizeSelected.value}, ${data?.colorSelected.value}`}</p>
            <p className="item-unit-price">{`Unit price: ${data?.price}`}</p>
            <div className="d-flex w-100pc jc-sb at-center">
               <div className="qty-ctl d-flex dark-v thin-bd-r">
                  <button className="qty-ctl-btn" onClick={() => changeAmount(DECREASE_ONCE)}><ion-icon name="remove"/></button>
                  <span className="qty d-flex jc-center at-center">{data?.qty}</span>
                  <button className="qty-ctl-btn" onClick={() => changeAmount(INCREASE_ONCE)}><ion-icon name="add"/></button>
               </div>
               <span><b>{`$${data?.price * data?.qty}`}</b></span>
            </div>
         </div>
      </div>
   )
}

export default CartItem