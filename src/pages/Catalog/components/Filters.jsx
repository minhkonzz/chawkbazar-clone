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
        <div className="catalog__filters-header__title">
          <span className="catalog__filters-header__title-text">Filters</span>
          <span className="catalog__filters-header__clear" onClick={() => dispatch(getFilteredProducts({ newFilter: {} }))}>Clear all</span>
        </div>
        <div className="catalog__filters-header__options"> {
          getFilterNames().map((filterName, i) => {
            return (
              <button key={i} className="catalog__filters-header__option">
                { filterName }
                <ion-icon name="close" />
              </button>
            )
          })}
        </div>
      </div>
      {
        filterSections && filterSections.map((filterSection, i) => {
          const props = {
            key: i, 
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