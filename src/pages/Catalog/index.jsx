import "./index.css";
import Products from "./components/Products";
import Filters from "./components/Filters";
import SortingOptions from "./components/SortingOptions";
import CatalogProvider from "../../context/provider/catalog.provider";

const Catalog = () => {

   return (
      <>
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <img className="w-100pc" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-4.jpg&w=1920&q=100" alt="catalog_banner"/>
            </div>
         </div>
         <div className="row">
            <CatalogProvider>
               <div className="col lg-2-ahalf md-0 sm-0"><Filters /></div>
               <div className="col lg-9-ahalf md-12 sm-12">
                  <div className="d-flex jc-sb at-center mb-32px">
                     <h2 className="fw-600">Casual wear</h2>
                     <div className="d-flex at-center">
                        <p className="blur fz-14px mr-3r">9,608 items</p>
                        <SortingOptions />
                     </div>
                  </div>
                  <Products />
               </div>
            </CatalogProvider>
         </div>
      </>
   )
}

export default Catalog;