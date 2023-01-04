import { fixDecimal } from "functions";

const Order = ({ order, setOrder }) => {

  const { 
    orderPaymentType,
    orderProducts, 
    orderSubtotal,
    orderFee,
    orderTotalPay,
    orderNote
  } = order; 

  return (
    <div className="row">
      <div className="col lg-12 md-12 sm-12">
        <button onClick={() => setOrder(null)}>Back</button>
        <h2>Order Detail</h2>
        <div className="order">
          <div className="order-part-info outstand">
            <h4>Product</h4>
            <span><b>Total</b></span>
          </div>
          {
            !!orderProducts && 
            orderProducts.map((productOrder, i) => {
              const { name, colorSelected, sizeSelected, qty, price, sale_price } = productOrder;
              return (
                <div key={i} className="order-part-info">
                  <p>{`${name} - ${colorSelected.value}, ${sizeSelected.value} * ${qty}`}</p>
                  <span>{`$${fixDecimal((sale_price || price) * qty, 2)}`}</span>
                </div>
              )
            })
          }
          <div className="order-part-info outstand">
            <h4>Subtotal:</h4>
            <span><b>{`$${fixDecimal(orderSubtotal, 2)}`}</b></span>
          </div>
          <div className="order-part-info">
            <h4>Shipping:</h4>
            <span><b>{`$${fixDecimal(orderFee, 2)}`}</b></span>
          </div>
          <div className="order-part-info outstand">
            <h4>Payment method:</h4>
            <span><b>{orderPaymentType}</b></span>
          </div>
          <div className="order-part-info">
            <h4>Total:</h4>
            <span><b>{`$${fixDecimal(orderTotalPay, 2)}`}</b></span>
          </div>
          <div className="order-part-info outstand">
            <h4>Note:</h4>
            <span><b>{orderNote}</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order;