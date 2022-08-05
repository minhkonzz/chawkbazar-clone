import './ProductDetail.css'
import QuantityController from './components/QuantityController/QuantityController'

const ProductDetail = () => {
  return (
    <div className="d-flex product-detail">
      <img alt="product" src="https://chawkbazar.vercel.app/assets/images/products/p-1-m.png"/>
      <div className="product-detail-about">
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
            <span style={{ width: '80%', height: '80%', backgroundColor: 'gray', borderRadius: '4px' }}/>
          </span>
          <span className="addon d-flex jc-center at-center">
            <span style={{ width: '80%', height: '80%', backgroundColor: 'red', borderRadius: '4px' }}/>
          </span>
          <span className="addon d-flex jc-center at-center">
            <span style={{ width: '80%', height: '80%', backgroundColor: 'pink', borderRadius: '4px' }}/>
          </span>
        </div>
        <div className="d-flex jc-sb w-100pc">
          <QuantityController />
          <button style={{ color: 'white', padding: '14px 95px', borderRadius: '7px', border: 'none', backgroundColor: 'gray', fontWeight: '600' }}>Add to cart</button>
        </div>
        <button className="d-flex jc-center w-100pc" style={{ color: 'white', padding: '20px 0', borderRadius: '7px', border: 'none', backgroundColor: 'black', fontWeight: '600' }}>View details</button>
      </div>
    </div>
  )
}

export default ProductDetail