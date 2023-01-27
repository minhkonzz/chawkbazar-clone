import { useEffect, useRef, memo } from "react";

const CheckoutPayMethods = (props) => {

  const paypalRef = useRef(null);
  const { isOnlinePaySelected, setIsOnlinePaySelected, createOrder } = props; 

  const onPaymentTypeChange = (paymentType) => {
    if (paymentType === "pay_online") {
      setIsOnlinePaySelected(true);
      return;
    }
    setIsOnlinePaySelected(false);
  }

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "no description",
              amount: {
                value: 100.00
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        createOrder(order);
      },
      onError: (err) => {
        console.log(err);
      }
    }).render(paypalRef.current);
  }, [ isOnlinePaySelected ])

  return (
    <div className="checkout__payments">
      <div className="row">
        <div className="col lg-12 md-12 sm-12">
          <h3>Payment methods</h3>
          <select className="checkout__payments-select thin-bd-r fw-600" onChange={(e) => onPaymentTypeChange(e.target.value)}>
            <option value="pay_on_cash">Thanh toán khi nhận sản phẩm</option>
            <option value="pay_online">Thanh toán online</option>
          </select> 
          { isOnlinePaySelected && <div ref={paypalRef}></div> }
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutPayMethods);