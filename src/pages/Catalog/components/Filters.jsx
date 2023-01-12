import Filter from "./Filter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ProductsService } from "services/firebase/products";
import { getFilteredProducts } from "services/redux/store/reducers/catalog.slice";

const Filters = () => {

  const dispatch = useDispatch();
  const setSearchParams = useSearchParams()[1];
  const [ filterSections, setFilterSections ] = useState(![]);
  const { currentProducts, filter } = useSelector((state) => state.catalog);

  useEffect(() => {
    ProductsService.getProductRefferences()
    .then((response) => setFilterSections(response))
    .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    setSearchParams(Object.keys(filter).reduce((acc, cur) => {
      return {
        ...acc, 
        [cur]: filter[cur].map((option) => option.optionName.toLowerCase()).join("-")
      }
    }, {}));
  }, [filter]);

  const getFilterNames = () => {
    return (!!filter && Object.keys(filter).reduce((acc, cur) => {
      return [
        ...acc, 
        ...filter[cur].map((option) => option.optionName)
      ]
    }, [])) || [];
  }
  
  return (
    <div className="catalog__filters">
      <div className="catalog__filters-header">
        <p className="catalog__filters-header__path">Home / Search</p>
        <div className="catalog__filters-header__title d-flex jc-sb at-center">
          <h2 className="catalog__filters-header__title-text">Filters</h2>
          <span className="catalog__filters-header__clear blur" onClick={() => dispatch(getFilteredProducts({ newFilter: {} }))}>Clear all</span>
        </div>
        <div className="catalog__filters-header__selects d-flex wrap"> {
          getFilterNames().map((filterName, index) => {
            return (
              <button key={index} className="selected-category">
                { filterName }
                <ion-icon name="close" />
              </button>
            )
          })}
        </div>
      </div>
      {
        filterSections && filterSections.map((filterSection, index) => {
          const props = {
            key: index, 
            data: filterSection,
            currentProducts, 
            filter
          }
          return <Filter {...props} />
        })
      }
    </div>
  )
}

export default Filters;