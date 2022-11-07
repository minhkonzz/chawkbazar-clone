import { useContext } from "react";
import Product from "../../../common/components/Product/type-1";
import { CatalogContext } from "../../../context/provider/catalog.provider";

const Products = () => {

   const { catalogData, handleLoadMore } = useContext(CatalogContext);
   const { currentProducts } = catalogData; 

   return (
      <>
         <div className="row"> { 
            currentProducts.map((product, index) => 
               <div key={index} className="col lg-2-4 md-4 sm-6"><Product data={product}/></div>)
         }
         </div>
         <div className="row">
            <div className="col lg-12 md-12 sm-12 d-flex jc-center at-center">
               <button className="load-more dark-v fw-600 thin-bd-r" onClick={handleLoadMore}>Load more</button>
            </div>
         </div>
      </>
   )
}

export default Products