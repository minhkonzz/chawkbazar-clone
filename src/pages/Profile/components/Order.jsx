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
    <div className="profile__order">
      <div className="profile__order__header">
        <button className="profile__order__back-button" onClick={() => setOrder(null)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <span className="profile__title">Order Detail</span>
      </div>
      <div className="profile__order__detail">
        <div className="profile__order__detail-part outstand">
          <span className="profile__order__detail-part__title">Product</span>
          <span className="profile__order__detail-part__value">Total</span>
        </div>
        {
          !!orderProducts && 
          orderProducts.map((productOrder, i) => {
            const { name, colorSelected, sizeSelected, qty, price, sale_price } = productOrder;
            return (
              <div key={i} className="profile__order__detail-part product">
                <p className="profile__order__detail-part__title">{`${name} - ${colorSelected.value}, ${sizeSelected.value} * ${qty}`}</p>
                <span className="profile__order__detail-part__value">{`$${fixDecimal((sale_price || price) * qty, 2)}`}</span>
              </div>
            )
          })
        }
        <div className="profile__order__detail-part outstand">
          <span className="profile__order__detail-part__title">Subtotal</span>
          <span className="profile__order__detail-part__value">{`$${fixDecimal(orderSubtotal, 2)}`}</span>
        </div>
        <div className="profile__order__detail-part">
          <span className="profile__order__detail-part__title">Shipping</span>
          <span className="profile__order__detail-part__value">{`$${fixDecimal(orderFee, 2)}`}</span>
        </div>
        <div className="profile__order__detail-part outstand">
          <span className="profile__order__detail-part__title">Payment method</span>
          <span className="profile__order__detail-part__value">{orderPaymentType}</span>
        </div>
        <div className="profile__order__detail-part">
          <span className="profile__order__detail-part__title">Total</span>
          <span className="profile__order__detail-part__value">{`$${fixDecimal(orderTotalPay, 2)}`}</span>
        </div>
        <div className="profile__order__detail-part outstand">
          <span className="profile__order__detail-part__title">Note</span>
          <span className="profile__order__detail-part__value">{orderNote}</span>
        </div>
      </div>
    </div>
  )
}

export default Order;