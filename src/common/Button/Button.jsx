import './Button.css'

const Button = (props) => {

  const {
    text, 
    isCircle, 
    icon, 
    bgColor,
    textColor, 
    w, h
  } = props

  return (
    <button 
      className="btn d-flex jc-sa at-center" 
      style={{
        width: w || 'auto',
        height: h || 50,
        color: textColor || 'white',  
        backgroundColor: bgColor || 'black' ,
        borderRadius: isCircle ? 1000 : 8
      }}>
      { icon && <ion-icon name={icon} /> }
      {text}
    </button>
  )
}

export default Button
