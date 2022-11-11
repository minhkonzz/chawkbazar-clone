import Filter from "./Filter";
import { useState, useEffect, useContext } from 'react';
import { ProductsService } from "../../../services/firebase/products";
import { CatalogContext } from "../../../context/provider/catalog.provider";

const Filters = () => {

   const { catalogData } = useContext(CatalogContext); 
   const [ filterSections, setFilterSections ] = useState(![]);

   useEffect(() => {
      ProductsService.getProductRefferences()
      .then((response) => setFilterSections(response))
      .catch(err => console.error(err))
   }, []);

   const getFiltersName = () => {
      let filterNames = [];
      Object.keys(catalogData.filter).forEach((filterSectionName) => {
         const filterKeySelects = catalogData.filter[filterSectionName]; 
         for (let i = 0; i < filterKeySelects.length; i++) {
            filterNames = [ ...filterNames, filterKeySelects[i].optionName ]
         }
      });
      return filterNames; 
   }

   return (
      <div className="filters">
         <div className="filters-header">
            <p>Home / Search</p>
            <div className="d-flex jc-sb at-center">
               <h2>Filters</h2>
               <span className="blur">Clear all</span>
            </div>
            <div className="checkbox-selected d-flex wrap"> {
               getFiltersName().map((filterName, index) => {
                  return (
                     <button key={index} className="selected-category thin-bd-r">
                        { filterName }
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

export default Filters;