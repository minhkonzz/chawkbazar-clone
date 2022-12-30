import "./index.css"; 
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { touchMessageBox } from "../../../services/redux/store/reducers/popup.reducer"; 

const MessageBox = ({ message }) => {

  const { type, content } = message;
  const messageBoxRef = useRef(null);
  const dispatch = useDispatch(); 

  const getMessageMark = (type) => {
    switch(type) {
      case "success":
        return <span className="popup__message-icon"><ion-icon name="checkmark-circle" /></span>
      case "warn":
        return <span className="popup__message-icon"><ion-icon name="alert-circle" /></span>
      case "error":
        return <span className="popup__message-icon"><ion-icon name="close-circle" /></span>
      default:
        return <></>
    }
  }

  useEffect(() => {
    setTimeout(() => {
      messageBoxRef.current.style.top = "-100%"; 
      setTimeout(() => { dispatch(touchMessageBox()); }, 800);
    }, 4000);
  }, [])

  return (
    <div className="popup__message d-ib thin-bd-r" ref={messageBoxRef}>
      { getMessageMark(type) }
      <p className="popup__message-content d-i fw-600">{content}</p>
    </div>
  )
}

export default MessageBox; 