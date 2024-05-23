import './index.css';

const UserInput = (props: any) => {

  const { 
    isPassword,
    isTextArea, 
    label, 
    placeHolder, 
    rows, 
    cols,
    inputValue,
    onChangeText,
    errorMessage, 
    w, h 
  } = props

  return (
    <div className="text-input" style={{ width: w ? w : '100%' }}> 
      <label className="input__label fw-600">{label}</label><br/>
      {
        isTextArea ?
        <textarea 
          value={inputValue}
          style={{ paddingTop: 8 }}
          className="input__text w-100pc" 
          placeholder={placeHolder ? placeHolder : ''}
          onChange={(e) => onChangeText(e.target.value)}
          rows={rows} cols={cols}/> : 
        <input 
          className="input__text w-100pc thin-bd-r"
          style={{ height: h ? h : 50 }} 
          type={isPassword ? "password" : "text"} 
          value={inputValue}
          placeholder={placeHolder ? placeHolder : ''}
          onChange={(e) => onChangeText(e.target.value)}
        />
      }      
      { errorMessage && <p className="input__error">{errorMessage}</p> }
    </div>
  )
}

export default UserInput;

