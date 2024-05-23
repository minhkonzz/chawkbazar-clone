// import "./index.css";
// import { useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useProductOptions } from "hooks/useProductOptions.hook";
// import { touchProductDialog } from "services/redux/store/reducers/popup.reducer";
// import { BaseSource } from "utils/constants";
// import { fixDecimal } from "functions";

// const ProductDetail = ({ productId }) => {

//   const { PREFIX_API_SOURCE } = BaseSource;
//   const productDetailRef = useRef(null);
//   const dispatch = useDispatch();
  
//   const {
//     productSelected,
//     amount, 
//     color, 
//     size,
//     errors,
//     inDecreaseAmount, 
//     onModifyingAmount, 
//     isEnteredAmount,
//     onSelectAddon,
//     handleAddToCart
//   } = useProductOptions(productId);

//   const closeProductDetailDialog = () => {
//     productDetailRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
//     productDetailRef.current.style.opacity = 0;
//     setTimeout(() => { dispatch(touchProductDialog()); }, 500);  
//   }

//   return (
//     <> {
//       productSelected && 
//       <div className="product-detail d-flex posab pos-center" ref={productDetailRef}>
//         <img className="product-detail__image" alt="product" src={`${PREFIX_API_SOURCE}/${productSelected?.image?.original}`}/>
//         <div className="product-detail__about posrel">
//           <button className="product-detail__close circle-bd-r posab right-1d5pc top-n2pc" onClick={closeProductDetailDialog}>
//             <ion-icon name="close"/>
//           </button>
//           <h2 className="product-detail__name">{productSelected?.name}</h2>
//           <p className="product-detail__description">{productSelected?.description}</p>
//           <div className="product-detail__prices d-flex">
//             { productSelected.sale_price && <h2>{`$${fixDecimal(productSelected?.sale_price, 2)}`}</h2> }
//             <h2>{`$${fixDecimal(productSelected?.price, 2)}`}</h2>
//           </div>
//           <p>Size</p>
//           <div className="product-detail__addons d-flex"> {
//             productSelected?.variations
//               .filter((variation) => variation.attribute.slug === "size")
//               .map((addon, index) => (
//                 <span 
//                   style={{ border: !!size && index === size.sizeSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
//                   key={index} 
//                   className={`${addon.attribute.slug} product-detail__addon d-flex jc-center at-center`}
//                   onClick={() => onSelectAddon(addon, index)}>
//                   {addon.value}
//                 </span>
//               ))}
//           </div>
//           <p>Color</p>
//           <div className="product-detail__addons d-flex">
//             {
//               productSelected?.variations
//               .filter((variation) => variation.attribute.slug === "color")
//               .map((addon, index) => (
//                 <span 
//                   style={{ border: !!color && index === color.colorSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
//                   key={index} 
//                   className={`${addon.attribute.slug} product-detail__addon d-flex jc-center at-center`}
//                   onClick={() => onSelectAddon(addon, index)}>
//                   <span className="thin-bd-r" style={{ backgroundColor: addon.meta }}/>
//                 </span>
//               ))
//             }
//           </div>
//           <div className="product-detail__quantity__add-cart d-flex jc-sb w-100pc">
//             <div className="product-detail__quantity d-flex thin-bd-r">
//               <button className="product-detail__quantity-btn increase h-100pc fw-600" onClick={() => inDecreaseAmount("DECREASE")}><ion-icon name="remove"/></button>
//               <input className="product-detail__quantity-value fw-600" onKeyDown={(e) => isEnteredAmount(e)} value={amount} onChange={(e) => onModifyingAmount(e.target.value) } />
//               <button className="product-detail__quantity-btn decrease h-100pc fw-600" onClick={() => inDecreaseAmount("INCREASE")}><ion-icon name="add"/></button>
//             </div>
//             <button className="product-detail__add-cart thin-bd-r fw-600" onClick={handleAddToCart}>Add to cart</button>
//           </div>
//           { !!errors && !!errors.amountError && <p className="product-detail__error-message">{errors.amountError}</p> }
//           <button className="product-detail__view-btn dark-v d-flex jc-center w-100pc thin-bd-r">View details</button>
//         </div>
//       </div>
//     }
//     </>
//   )
// }

// export default ProductDetail;