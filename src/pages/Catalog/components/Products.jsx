// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getFilteredProducts, loadMore } from "services/redux/store/reducers/catalog.slice";
// import { ProductsService } from "services/firebase/products";
// import Product from "common/components/Product/type-1";
// import SortingOptions from "./SortingOptions";
// import { touchFiltersSidebar } from "services/redux/store/reducers/popup.reducer";

// const Products = () => {

//   const dispatch = useDispatch();
//   const { currentProducts, filter } = useSelector((state) => state.catalog);

//   const handleLoadMore = () => {
//     ProductsService.loadMoreFilteredProducts(currentProducts, filter)
//     .then((productsResponse) => {
//       dispatch(loadMore(productsResponse));
//     })
//     .catch((err) => console.error(err.message));
//   };

//   useEffect(() => {
//     dispatch(getFilteredProducts({
//       newFilter: filter, 
//       currentProductsLength: currentProducts.length
//     }));
//   }, []);

//   return (
//     <div className="catalog__products">
//       <div className="catalog__products__header">
//         <span className="catalog__products__header__title">Casual wear</span>
//         <button className="catalog__products__header__filter-sidebar-button" onClick={() => dispatch(touchFiltersSidebar())}>
//           <ion-icon name="options-outline"></ion-icon>
//           <span>Filters</span>
//         </button>
//         <div className="catalog__products__header__sorts">
//           <p className="catalog__products__header__total-items">9,608 items</p>
//           <SortingOptions />
//         </div>
//       </div>
//       <div className="catalog__products__items"> { 
//         currentProducts.map((product, i) => <Product key={i} data={product}/>)
//       }
//       </div>
//       <div className="catalog__products__load-more">
//         <button className="catalog__products__load-more__button" onClick={handleLoadMore}>Load more</button>
//       </div>
//     </div>
//   )
// }

// export default Products;