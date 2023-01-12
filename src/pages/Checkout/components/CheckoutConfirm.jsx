import CheckoutPayMethods from './CheckoutPayMethods';
import { BaseSource } from 'utils/constants';
import { fixDecimal } from "functions";

const CheckoutConfirm = (props) => {

  const { cartItems, cartTotalPrice } = props.cart; 

  return (
    <div className="checkout__confirm row">
      <div className="col mb-36px lg-12 md-12 sm-12">
        <div className="row">
          <div className="col mb-36px lg-12 md-12 sm-12">
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <h2 className="checkout__title">Your order</h2>
              </div>
            </div>
            <div className="checkout__confirm-header d-flex jc-sb at-center thin-bd-r">
              <span><b>Product</b></span>
              <span><b>Subtotal</b></span>
            </div>
            <div className="checkout__confirm-items"> {
              Array.isArray(cartItems) && cartItems.length > 0 ?
              cartItems.map((cartItem, index) => {
                return (
                  <div className="checkout__confirm-item w-100pc d-flex jc-sb at-center" key={index}>
                    <div className="checkout__confirm-item__image__name d-flex at-center">
                      <img className="checkout__confirm-item__image" src={`${BaseSource.PREFIX_API_SOURCE}${cartItem?.image?.thumbnail}`} alt=""/>
                      <p className="checkout__confirm-item__name">{`${cartItem?.name} - ${cartItem?.sizeSelected.value}, ${cartItem?.colorSelected.value}`}</p>
                    </div>
                    <span>{`$${fixDecimal(cartItem?.price, 2)}`}</span>
                  </div>
                )
              }) : <p>Your cart is empty</p>
            }
            </div>
            <div>
              <div className="checkout__confirm-fee d-flex jc-sb at-center">
                <span><b>Shipping</b></span>
                <span><b>$2.99</b></span>
              </div>
              <div className="checkout__confirm-total d-flex jc-sb at-center">
                <span><b>Total</b></span>
                <span>{`$${fixDecimal(cartTotalPrice, 2)}`}</span>
              </div>
            </div>
            <CheckoutPayMethods {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutConfirm;