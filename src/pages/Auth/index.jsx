import './index.css';
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef, useContext } from "react";
import { CurrentUserContext } from "context/provider/currentUser.provider";
import AuthFields from "./components/AuthFields";
import { touchAuthDialog } from "services/redux/store/reducers/popup.reducer";
import { LOGO_SHOP_PATH } from "utils/constants/base-source";

const Auth = () => {

  const currentUserValue = useContext(CurrentUserContext);
  const [ isLogin, setIsLogin ] = useState(true);  
  const [ isAuthFailed, setIsAuthFailed ] = useState(false);   
  const dispatch = useDispatch();
  const authRef = useRef(null); 

  const closeAuthDialog = () => {
    authRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
    authRef.current.style.opacity = 0;
    setTimeout(() => { dispatch(touchAuthDialog()); }, 500);  
  };

  useEffect(() => {
    if (currentUserValue || isAuthFailed) 
      setTimeout(() => {
        if (authRef.current) closeAuthDialog(); 
      }, 4000);
  })

  return (
    <div className="auth-container d-flex fd-col at-center posab pos-center" ref={authRef}>
      <button className="posab right-n10px circle-bd-r top-n24px" onClick={closeAuthDialog}>
        <ion-icon name="close" />
      </button>
      <img alt="shop-title" src={LOGO_SHOP_PATH}/> {
        currentUserValue ? 
        <div className="auth-status d-flex">
          <span className="success checkmark">
            <ion-icon name="checkmark-circle" />
          </span>
          <p>{`${isLogin ? "Login" : "Sign up" } success`} </p>
        </div> : 
        <AuthFields 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          authState={{ isAuthFailed, setIsAuthFailed }}/>
      }
    </div>
  )
}

export default Auth;