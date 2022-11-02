import './index.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { touchProductDialog } from '../../services/redux/store/reducers/popup.reducer';
import { ProductsService } from "../../services/firebase/products" 
import { addCart } from "../../services/redux/store/reducers/cart.reducer";

const ProductDetail = ({ productId }) => {

  const dispatch = useDispatch()
  const [ productSelected, setProductSelected ] = useState(null); 
  const [ colorSelected, setColorSelected ] = useState(""); 
  const [ sizeSelected, setSizeSelected ] = useState(""); 
  const [ amount, setAmount ] = useState(1);

  const handleAddToCart = () => {
    if (!!colorSelected === false) {
      alert("vui long chon mau"); 
      return; 
    }
    if(!!sizeSelected === false) {
      alert("Vui long chon size"); 
      return; 
    }
    dispatch(addCart({
      ...productSelected,
      qty: amount
    }))
  }

  const increaseAmount = () => { setAmount(amount + 1) }
  const decreaseAmount = () => {
    if (amount === 1) return;  
    setAmount(amount - 1); 
  };

  useEffect(() => {
    ProductsService.getProductDetail(productId)
    .then((productResponse) => {
      setProductSelected(productResponse); 
    })
    .catch((err) => console.error(err.message)); 
  }, [])

  return (
    <>
      {
        productSelected && 
        <div className="product-detail d-flex posab pos-center">
          <img alt="product" src={`${PREFIX_API_SOURCE}/${productSelected?.image?.original}`}/>
          <div className="product-detail-about posrel">
            <button className="close-btn circle-bd-r posab right-0 top-n10pc" onClick={() => dispatch(touchProductDialog())}>
              <ion-icon name="close"/>
            </button>
            <h2>{productSelected?.name}</h2>
            <p>{productSelected?.description}</p>
            <h2>{`$${productSelected?.price}`}</h2>
            <h3>Size</h3>
            <div className="addons d-flex">
              <span className="addon d-flex jc-center at-center">S</span>
              <span className="addon d-flex jc-center at-center">S</span>
            </div>
            <h3>Color</h3>
            <div className="addons d-flex">
              <span className="addon d-flex jc-center at-center">
                <span className="thin-bd-r" />
              </span>
              <span className="addon d-flex jc-center at-center">
                <span className="thin-bd-r" />
              </span>
              <span className="addon d-flex jc-center at-center">
                <span className="thin-bd-r"/>
              </span>
            </div>
            <div className="d-flex jc-sb w-100pc">
              <div className="qty-ctl d-flex thin-bd-r">
                <button className="qty-ctl-btn h-100pc" onClick={decreaseAmount}><ion-icon name="remove"/></button>
                <span className="qty d-flex jc-center at-center h-100pc">{amount}</span>
                <button className="qty-ctl-btn h-100pc" onClick={increaseAmount}><ion-icon name="add"/></button>
              </div>
              <button className="add-cart-btn thin-bd-r" onClick={handleAddToCart}>Add to cart</button>
            </div>
            <button className="dark-v d-flex jc-center w-100pc thin-bd-r">View details</button>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetail