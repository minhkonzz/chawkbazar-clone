import './index.css'
import { useDispatch } from 'react-redux';
import { touchProductDialog } from 'services/redux/store/reducers/popup.reducer'; 
import { BaseSource } from 'utils/constants';
import { fixDecimal } from 'functions';

const Product = ({ data }) => {

  const dispatch = useDispatch();

  return (
    <div className="product__list-item" onClick={() => { console.log("clicked to product"); dispatch(touchProductDialog(data?.id)) }}>
      <div className="product__list-item__image">
        <img alt="product__image" src={`${BaseSource.PREFIX_API_SOURCE + data.image.thumbnail}`}/>
      </div>
      <div className="product__list-item__about">
        <p className="product__list-item__name">{data?.name}</p>
        <p className="product__list-item__description">Self-striped knitted midi A-line dress...</p>
        <div className="product__list-item__prices">
          <span className="product__list-item__sale-price">{`$${fixDecimal(data?.sale_price, 2)}`}</span>
          <span className="product__list-item__price">{`$${fixDecimal(data?.price, 2)}`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product;