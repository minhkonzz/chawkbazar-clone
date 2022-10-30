import { useRef } from 'react'
import Auth3rdProviders from './components/Auth3rdProviders'
import AuthFields from './components/AuthFields'
import './index.css'
import { useDispatch } from "react-redux"
import { touchAuthDialog } from "../../services/redux/store/reducers/popup.reducer"
import { LOGO_SHOP_PATH } from "../../utils/constants/base-source"

const Auth = () => {
  
  const dispatch = useDispatch();
  const authRef = useRef(null); 

  const closeAuthDialog = () => {
    authRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
    authRef.current.style.opacity = 0;
    setTimeout(() => {
      dispatch(touchAuthDialog());
    }, 500);  
  };

  return (
    <div className="auth-container d-flex fd-col at-center posab pos-center" ref={authRef}>
      <button className="posab right-0 circle-bd-r top-m4pc" onClick={closeAuthDialog}>
        <ion-icon name="close" />
      </button>
      <img alt="shop-title" src={LOGO_SHOP_PATH}/>
      <AuthFields />
      <Auth3rdProviders />
    </div>
  )
}

export default Auth