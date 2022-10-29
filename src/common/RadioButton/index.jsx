import './index.css'

const RadioButton = (props) => {
   return (
      <label class="radio-btn-container">{props.label}
         <input type="radio" checked="checked" name="radio" />
         <span class="radio-checkmark"></span>
      </label>
   )
}

export default RadioButton