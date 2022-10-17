import { useState, useEffect } from 'react'
import { useCreatedContext } from "../../../store/Provider"
import Product from "../../../common/Product/type-1/Product"
import getProducts from '../../../utils/fetch'
import { setProducts } from '../../../store/Actions/Products'
import { BaseSource, endpoints } from '../../../utils/constants'

const Products = () => {

   const [ state, dispatch ] = useCreatedContext()
   const [ fetching, setFetching ] = useState({
      isFetching: true, 
      timesFetched: 0
   })

   const handleFetchProducts = () => {
      getProducts({
         prefix: BaseSource.BASE_URL,
         endpoint: endpoints?.EP_PRODUCTS,
         isLimit: {
            times: fetching.timesFetched + 1, 
            itemsPerFetch: 10
         }
      })
      .then(responseData => {
         if (Array.isArray(responseData) && responseData.length > 0) 
            dispatch(setProducts(responseData))
      })
      .catch(err => console.log(err))
      .finally(() => setFetching({
         isFetching: false,
         timesFetched: fetching.timesFetched + 1
      }))
   }

   useEffect(() => {
      handleFetchProducts()
   }, [])

   return (
      <>
         {
            fetching.isFetching === false &&
            <div className="row"> { 
               state?.products.map((product, index) => 
                  <div key={product?.id || index} className="col lg-2-4 md-4 sm-6"><Product data={product}/></div>)
            }
            </div>
         }
         <div className="row">
            <div className="col lg-12 md-12 sm-12 d-flex jc-center at-center">
               <button className="load-more dark-v fw-600 thin-bd-r" onClick={handleFetchProducts}>Load more</button>
            </div>
         </div>
      </>
   )
}

export default Products