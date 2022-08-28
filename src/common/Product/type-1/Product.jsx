import './Product.css'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { touchProductDialog } from '../../../store/reducers/popup'

const Product = ({ data }) => {

  const ref = useRef(null)
  const dispatch = useDispatch()

  return (
    <div ref={ref} className="product-t1 w-100pc thin-bd-r" onClick={() => dispatch(touchProductDialog())}>
      <div className="posrel pt-168pc">
        <div className="posab top-0 left-0">
          <img alt="product" src={data?.image.thumbnail}/>
          <div className="product-t1-about">
            <h4>{data?.name}</h4>
            <p>Self-striped knitted midi A-line dress...</p>
            <h3>{data?.price}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product