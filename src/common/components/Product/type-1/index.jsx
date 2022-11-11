import './index.css'
import { isInt } from "../../../../functions"
import { useDispatch } from 'react-redux'
import { useElementSize } from 'usehooks-ts'
import { touchProductDialog } from '../../../../services/redux/store/reducers/popup.reducer'
import { BaseSource } from '../../../../utils/constants' 

const Product = ({ data }) => {

  const dispatch = useDispatch();
  const [ productRef, { width, height }] = useElementSize();

  return (
    <div ref={productRef} className="product-t1 w-100pc thin-bd-r" onClick={() => dispatch(touchProductDialog(data?.id))}>
      <div className="posrel pt-168pc">
        <div className="posab top-0 left-0">
          <img className="thin-bd-r" alt="product" src={`${BaseSource.PREFIX_API_SOURCE + data.image.thumbnail}`}/>
          <div className="product-t1-about">
            <h4 className="fw-600" style={{ fontSize: 0.058 * width, margin: `${0.02 * height}px 0 0 ${0.05 * width}px` }}>{data?.name}</h4>
            <p className="blur" style={{ fontSize: 0.048 * width, margin: `${0.015 * height}px 0 0 ${0.05 * width}px` }}>Self-striped knitted midi A-line dress...</p>
            <div className="d-flex at-center">
              <h4 
                className="fw-600" 
                style={{ 
                  fontSize: 0.06 * width, 
                  margin: `${0.03 * height}px 0 0 ${0.05 * width}px` 
                }}>
                { `$${Number(data?.sale_price).toFixed(2)}` }
              </h4>
              <h4 
                className="fw-600" 
                style={{ 
                  fontSize: 0.06 * width, 
                  margin: `${0.03 * height}px 0 0 ${0.05 * width}px`, 
                  color: "gray", 
                  textDecoration: "line-through"
                }}>
                { `$${Number(data?.price).toFixed(2)}` }
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;