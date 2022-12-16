import './index.css';

const RadioButton = (props) => {
   return (
      <label className="radio-btn-container">{props.label}
         <input type="radio" name="radio" />
         <span className="radio-checkmark"></span>
      </label>
   )
}

export default RadioButton;