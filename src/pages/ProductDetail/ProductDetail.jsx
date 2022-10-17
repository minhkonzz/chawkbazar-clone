import './ProductDetail.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { touchProductDialog } from '../../store/Reducers/popup'
import getProductDetail from '../../utils/fetch'
import { BaseSource, endpoints } from '../../utils/constants'
import { addCart } from '../../store/Reducers/cart'

const ProductDetail = ({ productId }) => {

  const {
    BASE_URL, 
    PREFIX_API_SOURCE
  } = BaseSource;

  const dispatch = useDispatch()
  const [ productSelected, setProductSelected ] = useState(null)
  const [ amount, setAmount ] = useState(1)

  const handleAddToCart = () => {
    dispatch(addCart({
      ...productSelected,
      qty: amount
    }))
  }

  const increaseAmount = () => { setAmount(amount + 1) }
  const decreaseAmount = () => { setAmount(amount - 1) }

  useEffect(() => {
    getProductDetail({
      prefix: BASE_URL,
      endpoint: `${endpoints?.EP_PRODUCTS}/${productId}`
    })
    .then(responseData => {
      if (responseData) {
        console.log(responseData)
        setProductSelected(responseData)
      }
    })
    .catch(err => console.error(err))
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