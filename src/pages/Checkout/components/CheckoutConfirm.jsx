const CheckoutConfirm = () => {
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
        <p style={{ color: 'red' }}>Your cart is empty</p>
        <div>
          <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 55, borderBottom: '1px solid #e4e4e4' }}>
            <span><b>Subtotal</b></span>
            <span><b>$0.00</b></span>
          </div>
          <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 55, borderBottom: '1px solid #e4e4e4' }}>
            <span><b>Shipping</b></span>
            <span><b>Free</b></span>
          </div>
          <div className="d-flex jc-sb at-center" style={{ padding: '0 20px', height: 60, fontSize: '18px' }}>
            <span><b>Total</b></span>
            <span><b>$0.00</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutConfirm