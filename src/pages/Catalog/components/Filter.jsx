import Checkbox from "../../../common/Checkbox/Checkbox"
import { useSearchParams } from "react-router-dom";

const Filter = ({ data }) => {

   const [ searchParams ,setSearchParams ] = useSearchParams();

   const selectHandler = (event, val) => {
      setSearchParams((prevSearchParams) => {
         console.log(typeof prevSearchParams); 
         const valueExistPrev = prevSearchParams.get(data.urlParam);
         if (event.target.checked) {
            if (valueExistPrev) {
               prevSearchParams.set(
                  data.urlParam, 
                  valueExistPrev + `p2c${val}`
               )
               return prevSearchParams;
            }
            console.log("go here");
            prevSearchParams.append(data.urlParam, val);
            return prevSearchParams;
         } 
         if (valueExistPrev.includes(val)) {
            if (valueExistPrev === val) {
               prevSearchParams.delete(data.urlPram);
               return prevSearchParams;
            }
            prevSearchParams.set(
               data.urlParam, 
               valueExistPrev.replace(valueExistPrev.includes(`p2c${val}`) ? `p2c${val}` : `${val}p2c`, "")
            );
            return prevSearchParams;
         }
         // else searchParams.delete(data.urlParam);
      }, { replace: false })
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