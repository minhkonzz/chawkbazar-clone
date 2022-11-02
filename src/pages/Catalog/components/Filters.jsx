import Filter from "./Filter"
import { useState, useEffect } from 'react'
import { ProductsService } from "../../../services/firebase/products"

const selects = ["T-shirt", "Coat"]; 

const Filters = () => {

   const [ filterSections, setFilterSections ] = useState(![])

   useEffect(() => {
      ProductsService.getProductRefferences()
      .then((response) => setFilterSections(response))
      .catch(err => console.error(err))
   }, []);

   return (
      <div className="filters">
         <div className="filters-header">
            <p>Home / Search</p>
            <div className="d-flex jc-sb at-center">
               <h2>Filters</h2>
               <span className="blur">Clear all</span>
            </div>
            <div className="checkbox-selected d-flex wrap"> {
               selects.map((select, index) => {
                  return (
                     <button key={index} className="selected-category thin-bd-r">
                        {select}
                        <ion-icon name="close" />
                     </button>
                  )
               })
            }
            </div>
         </div>
         {
            filterSections && 
            filterSections.map((filterSection, index) => <Filter key={index} data={filterSection}/>)
         }
      </div>
   )
}

export default Filters 