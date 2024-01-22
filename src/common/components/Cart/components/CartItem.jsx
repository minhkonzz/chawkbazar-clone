import { BaseSource, MeanVars } from 'utils/constants';
import { fixDecimal } from 'functions';
import { useDispatch } from 'react-redux';
import { removeFromCart, adjustAmount } from "services/redux/store/reducers/cart.reducer";

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
      <div className="cart-item-img posrel thin-bd-r o-h"> 
        <img className="posab w-100pc" src={`${PREFIX_API_SOURCE}${data?.image?.thumbnail}`} alt="cart-item-img" />
        <div className="del-icon posab w-100pc h-100pc ex-blur" onClick={() => dispatch(removeFromCart(data))}>
          <span className="posab pos-center">
            <ion-icon name="close-circle"/>
          </span>
        </div>
      </div>
      <div className="cart-item-info">
        <p className="item-name">{`${data?.name} - ${data?.sizeSelected.value}, ${data?.colorSelected.value}`}</p>
        <p className="item-unit-price">{`Unit price: $${fixDecimal(data?.sale_price || data?.price, 2)}`}</p>
        <div className="d-flex w-100pc jc-sb at-center">
          <div className="qty-ctl d-flex dark-v thin-bd-r">
            <button className="qty-ctl-btn h-100pc bg-transparent" onClick={() => changeAmount(DECREASE_ONCE)}><ion-icon name="remove"/></button>
            <span className="qty d-flex jc-center at-center h-100pc">{data?.qty}</span>
            <button className="qty-ctl-btn h-100pc bg-transparent" onClick={() => changeAmount(INCREASE_ONCE)}><ion-icon name="add"/></button>
          </div>
          <span><b>{`$${fixDecimal((data?.sale_price || data?.price) * data?.qty, 2)}`}</b></span>
        </div>
      </div>
    </div>
  )
}

export default CartItem;