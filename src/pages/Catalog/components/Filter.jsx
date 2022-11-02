import Checkbox from "../../../common/components/Checkbox"
import { useCreatedContext } from "../../../services/context/provider";
import { useSearchParams } from "react-router-dom";
// import { addFilter, removeFilter } from "../../../services/redux/actions/catalog.actions"
import { setProducts } from "../../../services/redux/actions/catalog.actions"
import { ProductsService } from "../../../services/firebase/products"

const Filter = ({ data }) => {

   const [ searchParams, setSearchParams ] = useSearchParams();
   const [ state, dispatch ] = useCreatedContext();
   console.log("render Filter component"); 

   const selectHandler = async(event, val) => {
      const paramsObj = Object.fromEntries(searchParams.entries());
      const newFilter = { ...state.filter }; 
      if (event.target.checked) {
         paramsObj[data.urlParam] = paramsObj[data.urlParam] ? paramsObj[data.urlParam] + `p2c${val.optionName}` : val.optionName;
         newFilter[data.urlParam] = newFilter[data.urlParam] ? [ ...newFilter[data.urlParam], val.optionId ] : [val.optionId]; 
      }
      else {
         if (paramsObj[data.urlParam].includes("p2c")) {
            paramsObj[data.urlParam] = paramsObj[data.urlParam].replace(
               paramsObj[data.urlParam].includes(`p2c${val.optionName}`) ? `p2c${val.optionName}` : `${val.optionName}p2c`, 
               ""
            );
         }
         else delete paramsObj[data.urlParam];
         if (newFilter[data.urlParam].length === 1) delete newFilter[data.urlParam];
         else newFilter[data.urlParam] = newFilter[data.urlParam].filter((selectedOptId) => selectedOptId !== val.optionId); 
      }
      const resProducts = await ProductsService.getFilteredProducts(newFilter);
      dispatch(setProducts(resProducts, newFilter));  
      setSearchParams(paramsObj);
   }

   return (
      <div className="filter">
         <h4>{data.title}</h4>
         <div className="checkbox-selector"> {
            data.filtersList.map((option, index) => {
               return (
                  <Checkbox 
                     onSelectChange={() => selectHandler}
                     key={index}
                     cbVal={
                        { optionId: option.id, optionName: option.slug || 
                           (option.min && !option.max 
                           ? `${option.min}-` :
                           option.max && !option.min
                           ? `-${option.max}` : `${option.min}-${option.max}`) } 
                     }>
                     {  option.name || 
                        (option.min && !option.max 
                        ? `Over $${option.min}` :
                        option.max && !option.min 
                        ? `Under $${option.max}` : `$${option.min} - $${option.max}`)
                     }
                  </Checkbox>
               )
            })}
         </div>
      </div>
   )
}

export default Filter 