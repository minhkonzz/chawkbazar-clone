import "./index.css";
import { useEffect, useRef } from "react";

const Checkbox = (props) => {

  const {
    children, 
    isChecked,
    cbVal, 
    onSelectChange
  } = props;

  const ref = useRef(null);

  const onCheckboxChange = (checkboxElement, isChecked) => {
    checkboxElement.checked = isChecked;
    if (isChecked) {
      checkboxElement.setAttribute("checked", "");
      return;
    }
    checkboxElement.removeAttribute("checked");
  }

  useEffect(() => {
    const checkboxElement = ref.current;
    onCheckboxChange(checkboxElement, isChecked);
  }, [isChecked]);

  return (
    <label className="checkbox-container">
      { children }
      <input 
        ref={ref}
        type="checkbox"
        value={cbVal?.optionName} 
        onChange={(e) => onSelectChange()(e, cbVal)} 
      /> 
      <span className="checkbox-checkmark"></span>
    </label>
  )
}

export default Checkbox;