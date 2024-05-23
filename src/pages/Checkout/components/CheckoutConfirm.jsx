// import CheckoutPayMethods from './CheckoutPayMethods';
// import { BaseSource } from 'utils/constants';
// import { fixDecimal } from "functions";

// const CheckoutConfirm = (props) => {

//   const { cartItems, cartTotalPrice } = props.cart;
//   const shipFee = 2.99; 

//   return (
//     <div className="checkout__confirm">
//       <span className="checkout__title">Your order</span>
//       <div className="checkout__confirm-header">
//         <span className="checkout__confirm-header__title">Product</span>
//         <span className="checkout__confirm-header__title">Subtotal</span>
//       </div>
//       <div className="checkout__confirm-items"> {
//         Array.isArray(cartItems) && cartItems.length > 0 ?
//         cartItems.map((cartItem, index) => {
//           return (
//             <div className="checkout__confirm-item w-100pc d-flex jc-sb at-center" key={index}>
//               <div className="checkout__confirm-item__image__name d-flex at-center">
//                 <img className="checkout__confirm-item__image" src={`${BaseSource.PREFIX_API_SOURCE}${cartItem?.image?.thumbnail}`} alt=""/>
//                 <p className="checkout__confirm-item__name">{`${cartItem?.name} - ${cartItem?.sizeSelected.value}, ${cartItem?.colorSelected.value}`}</p>
//               </div>
//               <span>{`$${fixDecimal(cartItem.sale_price || cartItem.price, 2)}`}</span>
//             </div>
//           )
//         }) : <p className="checkout__confirm-items__empty-status">Your cart is empty</p>
//       }
//       </div>
//       <div className="checkout__confirm__prices">
//         <div className="checkout__confirm-fee">
//           <span className="checkout__confirm-fee__title">Shipping</span>
//           <span className="checkout__confirm-fee__value">{`$${shipFee}`}</span>
//         </div>
//         <div className="checkout__confirm-total">
//           <span className="checkout__confirm-total__title">Total</span>
//           <span className="checkout__confirm-total__value">{`$${fixDecimal(cartTotalPrice + shipFee, 2)}`}</span>
//         </div>
//       </div>
//       <CheckoutPayMethods {...props} />
//     </div>
//   )
// }

// export default CheckoutConfirm;