import { useState, useEffect } from "react";
import { useCreatedContext } from "../../../context/provider";
import Product from "../../../common/components/Product/type-1";
import { ProductsService } from "../../../services/firebase/products"
import { setProducts, loadMore } from "../../../services/redux/actions/catalog.actions"

const Products = () => {

   const [ state, dispatch ] = useCreatedContext(); 
   const [ fetching, setFetching ] = useState(true);
   console.log("check state in catalog products component:", state);

   const handleFetchProducts = () => {
      ProductsService.getFilteredProducts(state.filter)
      .then((productsResponse) => {
         dispatch(setProducts(productsResponse, state.filter));
      })
      .catch((err) => console.error(err.message))
      .finally(() => { setFetching(false); });
   }

   const loadMoreProducts = () => {
      if (fetching === false) setFetching(true); 
      ProductsService.loadMoreFilteredProducts(state.currProducts, state.filter) 
      .then((productsResponse) => {
         console.log("current filter:", state.filter);
         dispatch(loadMore(productsResponse, state.filter));
      })
      .catch((err) => console.error(err.message))
      .finally(() => { setFetching(false); })
   }

   useEffect(() => {
      handleFetchProducts();
   }, [])

   return (
      <>
         {
            fetching === false &&
            <div className="row"> { 
               state?.currProducts.map((product, index) => 
                  <div key={index} className="col lg-2-4 md-4 sm-6"><Product data={product}/></div>)
            }
            </div>
         }
         <div className="row">
            <div className="col lg-12 md-12 sm-12 d-flex jc-center at-center">
               <button className="load-more dark-v fw-600 thin-bd-r" onClick={loadMoreProducts}>Load more</button>
            </div>
         </div>
      </>
   )
}

export default Products