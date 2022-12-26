import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredProducts, loadMore } from "../../../services/redux/store/reducers/catalog.slice";
import { ProductsService } from "../../../services/firebase/products";
import Product from "../../../common/components/Product/type-1";
import SortingOptions from "./SortingOptions";
import { touchFiltersSidebar } from "../../../services/redux/store/reducers/popup.reducer";

const Products = () => {

  const dispatch = useDispatch();
  const { currentProducts, filter } = useSelector((state) => state.catalog);

  const handleLoadMore = () => {
    ProductsService.loadMoreFilteredProducts(currentProducts, filter)
    .then((productsResponse) => {
      dispatch(loadMore(productsResponse));
    })
    .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    dispatch(getFilteredProducts({
      newFilter: filter, 
      currentProductsLength: currentProducts.length
    }));
  }, []);

  return (
    <div className="catalog-products">
      <div className="catalog-products-header d-flex jc-sb at-center mb-32px">
        <h2 className="fw-600">Casual wear</h2>
        <button className="filter-sidebar-btn" onClick={() => dispatch(touchFiltersSidebar())}>Open filter sidebar</button>
        <div className="d-flex at-center">
          <p className="blur fz-14px mr-3r">9,608 items</p>
          <SortingOptions />
        </div>
      </div>
      <div className="row"> { 
        currentProducts.map((product, index) => 
         <div key={index} className="col lg-2-4 md-4 sm-6 mb-36px"><Product data={product}/></div>)
      }
      </div>
      <div className="d-flex jc-center at-center">
        <button className="load-more dark-v fw-600 thin-bd-r" onClick={handleLoadMore}>Load more</button>
      </div>
    </div>
  )
}

export default Products;