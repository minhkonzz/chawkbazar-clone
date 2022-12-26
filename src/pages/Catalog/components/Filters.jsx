import Filter from "./Filter";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductsService } from "../../../services/firebase/products";

const Filters = () => {

  const [ filterSections, setFilterSections ] = useState(![]);
  const filters = useSelector((state) => state.catalog.filter);

  useEffect(() => {
    ProductsService.getProductRefferences()
    .then((response) => setFilterSections(response))
    .catch(err => console.error(err))
  }, []);

  const getFiltersName = () => {
    let filterNames = [];
    Object.keys(filters).forEach((filterSectionName) => {
      const filterKeySelects = filters[filterSectionName]; 
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
          })}
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