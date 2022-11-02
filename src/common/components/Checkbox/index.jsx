import "./index.css";
import { useEffect, useRef } from "react";

const Checkbox = (props) => {

   const {
      children, 
      cbVal, 
      onSelectChange
   } = props;

   const ref = useRef(null);

   useEffect(() => {
      const checkboxRef = ref.current;
      function onCheckboxChange(e) {
         const inp = e.target;
         if (inp.checked) {
            inp.setAttribute("checked", "");
            return;
         }
         inp.removeAttribute("checked");
      }
      checkboxRef.addEventListener("change", onCheckboxChange);
      return () => {
         checkboxRef.removeEventListener("change", onCheckboxChange);
      }
   }, [])

   return (
      <label className="checkbox-container">
         { children }
         <input 
            ref={ref}
            type="checkbox"
            value={cbVal.optionName} 
            onChange={(e) => {
               onSelectChange()(e, cbVal)
               .then(() => {
                  console.log("filter thanh cong"); 
               })
               .catch((err) => console.error(err.message)); 
            }}/> 
         <span className="checkbox-checkmark"></span>
      </label>
   )
}

export default Checkbox