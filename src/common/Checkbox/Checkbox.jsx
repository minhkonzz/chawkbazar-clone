import "./Checkbox.css";
import { useEffect, useRef } from "react";

const Checkbox = ({ children, cbVal, onSelectChange }) => {

   const ref = useRef(null);

   useEffect(() => {
      const checkboxRef = ref.current 
      function onCheckboxChange(e) {
         if (e.target.checked) e.target.setAttribute("checked", "");
         else e.target.removeAttribute("checked");
         onSelectChange()(e, e.target.value); // currying 
      }
      checkboxRef.addEventListener("change", onCheckboxChange)
      return () => {
         checkboxRef.removeEventListener("change", onCheckboxChange)
      }
   }, [])

   return (
      <label className="checkbox-container">
         { children }
         <input 
            ref={ref}
            type="checkbox"
            value={cbVal} />
         <span className="checkbox-checkmark"></span>
      </label>
   )
}

export default Checkbox