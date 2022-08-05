import './UserInput.css'

const UserInput = (props) => {

  const { 
    isTextArea, 
    label, 
    placeHolder, 
    inputValue, 
    rows, 
    cols,
    onChangeText, 
    w, h 
  } = props

  return (
    <div style={{ width: w ? w : '100%' }}> 
      <label className="label"><b>{label}</b></label><br/>
      {
        isTextArea ?
        <textarea 
          style={{ paddingTop: 8 }}
          className="input w-100pc" 
          placeholder={placeHolder ? placeHolder : ''}
          rows={rows} cols={cols}/> : 
        <input 
          className="input w-100pc"
          style={{ height: h ? h : 50 }} 
          type="text" 
          value={inputValue ? inputValue : ''}
          placeholder={placeHolder ? placeHolder : ''}
          onChangeText={onChangeText}
        />
      }      
    </div>
  )
}

export default UserInput

