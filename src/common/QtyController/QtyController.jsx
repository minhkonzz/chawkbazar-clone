import './QtyController.css'

const QtyController = (props) => {

   const {
      bgColor,
      borderColor,  
      textColor,
      w, h 
   } = props

  return (
    <div 
      className="d-flex" 
      style={{ 
         width: w || 'auto', 
         height: h || 30, 
         backgroundColor: bgColor || 'white'
      }}>
      <button 
         className="qty-ctl-btn" 
         style={{
            border: `1px solid ${borderColor || 'transparent'}` , 
            color: textColor || 'black' 
         }}>
         <ion-icon name="remove"/>
      </button>
      <span 
         className="qty" 
         style={{
            borderTop: `1px solid ${borderColor || 'transparent'}`, 
            borderBottom: `1px solid ${borderColor || 'transparent'}`,
            color: textColor || 'black' 
         }}>
         1
      </span>
      <button 
         className="qty-ctl-btn" 
         style={{
            border: `1px solid ${borderColor || 'transparent'}` ,
            color: textColor || 'black' 
         }}>
         <ion-icon name="add"/>
      </button>
    </div>
  )
}

export default QtyController