import { fixDecimal } from "functions";

const Order = ({ order, setOrder }) => {

  let orderTotal = 0; 
  const { products, shipFee } = order; 

  if (products) {
    orderTotal = products.reduce((acc, cur) => {
      const { price, sale_price } = cur; 
      return acc + (sale_price || price);
    }, 0) + shipFee;
  } 

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
            !!products && 
            order.products.map((productOrder, i) => {
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
            <span><b>{`$${fixDecimal(orderTotal - shipFee, 2)}`}</b></span>
          </div>
          <div className="order-part-info">
            <h4>Shipping:</h4>
            <span><b>{`$${fixDecimal(shipFee, 2)}`}</b></span>
          </div>
          <div className="order-part-info outstand">
            <h4>Payment method:</h4>
            <span><b>{order?.payment.type}</b></span>
          </div>
          <div className="order-part-info">
            <h4>Total:</h4>
            <span><b>{`$${fixDecimal(orderTotal, 2)}`}</b></span>
          </div>
          <div className="order-part-info outstand">
            <h4>Note:</h4>
            <span><b>{order?.note}</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order;