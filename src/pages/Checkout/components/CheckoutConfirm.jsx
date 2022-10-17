import { useSelector } from 'react-redux'
import { BaseSource } from '../../../utils/constants'

const CheckoutConfirm = () => {

  const { cartItems, cartTotalPrice } = useSelector(state => state.cart)

  return (
    <div className="row">
      <div className="checkout-confirm col lg-12 md-12 sm-12">
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <h2>Your order</h2>
          </div>
        </div>
        <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 50, backgroundColor: '#e4e4e4', borderRadius: 8 }}>
          <span><b>Product</b></span>
          <span><b>Subtotal</b></span>
        </div>
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
                alignItems: 'center'
              }}>
                <div className="d-flex at-center">
                  <img style={{
                    width: 80
                    // height: 80
                  }} src={`${BaseSource.PREFIX_API_SOURCE}${item?.image?.thumbnail}`} alt=""/>
                  <p style={{ marginLeft: 10 }}>Name</p>
                </div>
                <span>{`$${item?.price}`}</span>
              </div>
            )
          }) : <p style={{ color: 'red' }}>Your cart is empty</p>
        }
        <div>
          <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 55, borderBottom: '1px solid #e4e4e4' }}>
            <span><b>Shipping</b></span>
            <span><b>Free</b></span>
          </div>
          <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 60, fontSize: '18px' }}>
            <span><b>Total</b></span>
            <span>{`$${cartTotalPrice}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutConfirm