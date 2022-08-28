import './ProductDetail.css'
import { useDispatch } from 'react-redux'
import { touchProductDialog } from '../../store/reducers/popup'

const ProductDetail = () => {

  const dispatch = useDispatch()

  return (
    <div className="product-detail d-flex posab pos-center">
      <img alt="product" src="https://chawkbazar.vercel.app/assets/images/products/p-1-m.png"/>
      <div className="product-detail-about posrel">
        <button className="close-btn circle-bd-r posab right-0 top-n10pc" onClick={() => dispatch(touchProductDialog())}><ion-icon name="close"/></button>
        <h2>Nike Black</h2>
        <p>Casual wear casual attire or clothing may be a Western code thats relaxed, occasional, spontaneous and fitted to everyday use. Casual wear became popular within the Western world</p>
        <h2>$11.00</h2>
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
            <button className="qty-ctl-btn h-100pc"><ion-icon name="remove"/></button>
            <span className="qty d-flex jc-center at-center h-100pc">1</span>
            <button className="qty-ctl-btn h-100pc"><ion-icon name="add"/></button>
          </div>
          <button className="add-cart-btn thin-bd-r">Add to cart</button>
        </div>
        <button className="dark-v d-flex jc-center w-100pc thin-bd-r">View details</button>
      </div>
    </div>
  )
}

export default ProductDetail