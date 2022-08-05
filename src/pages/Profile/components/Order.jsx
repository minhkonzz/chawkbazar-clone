const Order = () => {
   return (
      <div className="row">
         <div className="col lg-12 md-12 sm-12">
            <h2>Order Detail</h2>
            <div className="order">
               <div className="order-part-info outstand">
                  <h4>Product</h4>
                  <span><b>Total</b></span>
               </div>
               <div className="order-part-info">
                  <p>Nike Black - Black, S * 1</p>
                  <span>$10.00</span>
               </div>
               <div className="order-part-info">
                  <p>Hermes Carlton London - Red, XL * 2</p>
                  <span>$10.00</span>
               </div>
               <div className="order-part-info">
                  <p>Gucci Carlton UK, Green, M * 1</p>
                  <span>$10.00</span>
               </div>
               <div className="order-part-info outstand">
                  <h4>Subtotal:</h4>
                  <span><b>$132.00</b></span>
               </div>
               <div className="order-part-info">
                  <h4>Shipping:</h4>
                  <span><b>$17.00</b></span>
               </div>
               <div className="order-part-info outstand">
                  <h4>Payment method:</h4>
                  <span><b>Cash on delivery</b></span>
               </div>
               <div className="order-part-info">
                  <h4>Total:</h4>
                  <span><b>$149.00</b></span>
               </div>
               <div className="order-part-info outstand">
                  <h4>Note:</h4>
                  <span><b>New order</b></span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Order