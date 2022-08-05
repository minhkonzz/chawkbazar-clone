import './RadioButton.css'

const RadioButton = (props) => {
   return (
      <label class="container">{props.label}
         <input type="radio" checked="checked" name="radio" />
         <span class="checkmark"></span>
      </label>
   )
}

export default RadioButton