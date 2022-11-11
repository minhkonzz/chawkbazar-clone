import { useState, useEffect, useRef, useContext } from 'react'
import { CurrentUserContext } from "../../context/provider/currentUser.provider"
import AuthFields from './components/AuthFields'
import Auth3rdProviders from './components/Auth3rdProviders'
import './index.css'
import { useDispatch } from "react-redux"
import { touchAuthDialog } from "../../services/redux/store/reducers/popup.reducer"
import { LOGO_SHOP_PATH } from "../../utils/constants/base-source"

const Auth = () => {

  const currentUserValue = useContext(CurrentUserContext);
  const [ isLogin, setIsLogin ] = useState(true); 
  const dispatch = useDispatch();
  const authRef = useRef(null); 

  const closeAuthDialog = () => {
    authRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
    authRef.current.style.opacity = 0;
    setTimeout(() => { dispatch(touchAuthDialog()); }, 500);  
  };

  useEffect(() => {
    if (currentUserValue) 
      setTimeout(() => {
        if (authRef.current) closeAuthDialog(); 
      }, 4000);
  })

  return (
    <div className="auth-container d-flex fd-col at-center posab pos-center" ref={authRef}>
      <button className="posab right-0 circle-bd-r top-m24px" onClick={closeAuthDialog}>
        <ion-icon name="close" />
      </button>
      <img alt="shop-title" src={LOGO_SHOP_PATH}/>
      {
        currentUserValue ? 
        <>
          <div className="auth-success-status d-flex">
            <ion-icon name="checkmark-circle" />
            <p>{`${isLogin ? "Login" : "Sign up" } success`} </p>
          </div>
        </> : 
        <>
          <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
          <AuthFields isLogin={isLogin}/>
          <p>Dont have any account? <b onClick={() => setIsLogin(!isLogin)}>{ isLogin ? 'Register' : 'Login' }</b></p>
          <Auth3rdProviders />
        </>
      }
    </div>
  )
}

export default Auth