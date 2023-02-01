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
    <div className="checkout__confirm__payments">
      <span className="checkout__title">Payment methods</span>
      <select className="checkout__confirm__payments__options thin-bd-r fw-600" onChange={(e) => onPaymentTypeChange(e.target.value)}>
        <option value="pay_on_cash">Thanh toán khi nhận sản phẩm</option>
        <option value="pay_online">Thanh toán online</option>
      </select> 
      { isOnlinePaySelected && <div ref={paypalRef}></div> }
    </div>
  )
}

export default memo(CheckoutPayMethods);