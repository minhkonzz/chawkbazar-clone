import './index.css';

const RadioButton = (props) => {

  const d = false;

  return (
    <label className="radio-btn-container">{props.label}
      <input type="radio" name="radio" {...{ [d && "checked"]: true }}/>
      <span className="radio-checkmark"></span>
    </label>
  )
}

export default RadioButton;