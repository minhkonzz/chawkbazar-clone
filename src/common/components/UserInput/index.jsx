import './index.css';

const UserInput = (props) => {

  const { 
    isPassword,
    isTextArea, 
    label, 
    placeHolder, 
    rows, 
    cols,
    inputValue,
    onChangeText, 
    w, h 
  } = props

  return (
    <div style={{ width: w ? w : '100%' }}> 
      <label className="input__label"><b>{label}</b></label><br/>
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
          className="input__text w-100pc"
          style={{ height: h ? h : 50 }} 
          type={isPassword ? "password" : "text"} 
          value={inputValue}
          placeholder={placeHolder ? placeHolder : ''}
          onChange={(e) => onChangeText(e.target.value)}
        />
      }      
    </div>
  )
}

export default UserInput;

