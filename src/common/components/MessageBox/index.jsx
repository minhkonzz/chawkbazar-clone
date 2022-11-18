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
                return <span className="success checkmark"><ion-icon name="checkmark-circle" /></span>
            case "warn":
                return <span className="warning checkmark"><ion-icon name="alert-circle" /></span>
            case "error":
                return <span className="failed checkmark"><ion-icon name="close-circle" /></span>
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
        <div className="message-box d-ib thin-bd-r" ref={messageBoxRef}>
            { getMessageMark(type) }
            <p className="d-i fw-600">{content}</p>
        </div>
    )
}

export default MessageBox; 