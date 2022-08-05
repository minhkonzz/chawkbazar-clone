import './Product.css'

const Product = (props) => {
  return (
    <div className={`col lg-${props.lg} md-${props.md} sm-${props.sm}`} onClick={() => props.setOpenPopup(true)} >
      <div className="product-t1">
        <img alt="product" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-4.png&w=384&q=100"/>
        <div className="product-t1-about">
          <h4>Regular Fit Crew-neck T-shirt</h4>
          <p>Self-striped knitted midi A-line dress...</p>
          <h3>$12.30</h3>
        </div>
      </div>
    </div>
  )
}

export default Product