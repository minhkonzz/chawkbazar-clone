import CheckoutPayMethods from './CheckoutPayMethods';
import { BaseSource } from '../../../utils/constants';
import { fixDecimal } from "../../../functions";

const CheckoutConfirm = (props) => {

  const { cartItems, cartTotalPrice } = props.cart; 

  return (
    <div className="checkout-confirm row">
      <div className="col mb-36px lg-12 md-12 sm-12">
        <div className="row">
          <div className="col mb-36px lg-12 md-12 sm-12">
            <div className="row">
              <div className="col mb-36px lg-12 md-12 sm-12">
                <h2>Your order</h2>
              </div>
            </div>
            <div className="order-confirm-header d-flex jc-sb at-center thin-bd-r">
              <span><b>Product</b></span>
              <span><b>Subtotal</b></span>
            </div>
            <div className="order-confirm-items">
              {
                Array.isArray(cartItems) && cartItems.length > 0 ?
                cartItems.map((item, index) => {
                  return (
                    <div key={index} style={{
                      width: '100%', 
                      height: 100, 
                      borderBottom: '0.5px solid #e4e4e4',
                      display: 'flex',
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: "50px 20px", 
                      margin: "20px 0"
                    }}>
                      <div className="d-flex at-center">
                        <img style={{
                          width: 80
                          // height: 80
                        }} src={`${BaseSource.PREFIX_API_SOURCE}${item?.image?.thumbnail}`} alt=""/>
                        <p style={{ marginLeft: 10 }}>Name</p>
                      </div>
                      <span>{`$${fixDecimal(item?.price, 2)}`}</span>
                    </div>
                  )
                }) : <p>Your cart is empty</p>
              }
            </div>
            <div>
              <div className="order-confirm-fee d-flex jc-sb at-center">
                <span><b>Shipping</b></span>
                <span><b>Free</b></span>
              </div>
              <div className="order-confirm-total d-flex jc-sb at-center">
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