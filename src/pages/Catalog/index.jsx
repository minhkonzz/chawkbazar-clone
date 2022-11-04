import './index.css'
import { useEffect } from "react"
import Products from './components/Products'
import Filters from "./components/Filters"
import SortingOptions from './components/SortingOptions'
import { useCreatedContext } from "../../context/provider"
import { Provider as ProductsProvider } from "../../context"
import ProductsReducer, { initialState } from "../../services/redux/store/reducers/catalog.reducer";

const Catalog = () => {

   const [ state, dispatch ] = useCreatedContext(); 
   console.log("check state in Catalog page:", state); 

   return (
      <ProductsProvider reducer={ProductsReducer} initialState={initialState}>
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <img src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-4.jpg&w=1920&q=100"/>
            </div>
         </div>
         <div className="row">
            <div className="col lg-2-ahalf md-0 sm-0"><Filters /></div>
            <div className="col lg-9-ahalf md-12 sm-12">
               <div className="row">
                  <div className="col lg-12 md-12 sm-12">
                     <div className="d-flex jc-sb at-center">
                        <h2 style={{ fontWeight: '700' }}>Casual wear</h2>
                        <div className="d-flex at-center">
                           <p className="blur fz-14px mr-3r">9,608 items</p>
                           <SortingOptions />
                        </div>
                     </div>
                  </div>
               </div>
               <Products />
            </div>
         </div>
      </ProductsProvider>
   )
}

export default Catalog