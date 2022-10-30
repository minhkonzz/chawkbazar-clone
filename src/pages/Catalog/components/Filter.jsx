import Checkbox from "../../../common/components/Checkbox"
import { useCreatedContext } from "../../../services/context/provider";
import { useSearchParams } from "react-router-dom";
import { addFilter, removeFilter } from "../../../services/redux/actions/catalog.actions"

const Filter = ({ data }) => {

   const [ searchParams, setSearchParams ] = useSearchParams();
   const [ state, dispatch ] = useCreatedContext(); 
   console.log('render Filter component');

   const selectHandler = (event, val) => {
      const paramsObj = Object.fromEntries(searchParams.entries());
      if (event.target.checked) {
         if (paramsObj[data.urlParam]) paramsObj[data.urlParam] += `p2c${val}`; 
         else paramsObj[data.urlParam] = val; 
         dispatch(addFilter({ title: data.urlParam, option: val }));
         setSearchParams(paramsObj);
         return;
      }
      if (paramsObj[data.urlParam].includes("p2c")) {
         paramsObj[data.urlParam] = paramsObj[data.urlParam].replace(
            paramsObj[data.urlParam].includes(`p2c${val}`) ? `p2c${val}` : `${val}p2c`, 
            ""
         );
         dispatch(removeFilter({ title: data.urlParam, option: val }));
         setSearchParams(paramsObj);
         return;
      }
      dispatch(removeFilter({ title: data.urlParam, option: val }));
      delete paramsObj[data.urlParam];
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
                        option.slug || 
                        (option.min && !option.max 
                        ? `${option.min}-` :
                        option.max && !option.min
                        ? `-${option.max}` : `${option.min}-${option.max}`) 
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