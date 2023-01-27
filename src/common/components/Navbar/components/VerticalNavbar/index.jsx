import { useRef } from "react";
import { BaseSource } from "utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { touchMenuSidebar } from "services/redux/store/reducers/popup.reducer";
import "./index.css";

const VerticalNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const nestSidebarMenu = useRef(null)
  const menuSidebarRef = useRef(null)

  const touchNestSidebarMenu = () => {
    nestSidebarMenu.current.classList.toggle('open')
  }

  const closeSidebar = () => {
    menuSidebarRef.current.style.left = '-100%'
    setTimeout(() => {
      dispatch(touchMenuSidebar())
    }, 500)
  }

  return (
    <nav className="vertical-nav" ref={menuSidebarRef}>
      <div className="vertical-nav-top">
        <img alt="logo-shop" src={BaseSource.LOGO_SHOP_PATH}/>
        <ion-icon name="close" onClick={closeSidebar}/>
      </div>   
      <div className="vertical-nav-center">
        <ul>
          <li className="fw-500" onClick={() => { navigate("/catalog"); closeSidebar() }}>Products</li>
          <li className="fw-500 posrel">
            <div className="d-flex at-center jc-sb">
              Pages
              <ion-icon name="chevron-down" onClick={touchNestSidebarMenu}/>
            </div>
            <ul ref={nestSidebarMenu}>
              <li className="fw-500 blur" onClick={() => { navigate("/profile"); closeSidebar(); }}>My Account</li>
              <li className="fw-500 blur" onClick={() => { navigate("/faq"); closeSidebar(); }}>FAQ</li>
              <li className="fw-500 blur" onClick={() => { navigate("/terms"); closeSidebar(); }}>Terms & Conditions</li>
              <li className="fw-500 blur" onClick={() => { navigate("/contactus"); closeSidebar(); }}>Contact us</li>
              <li className="fw-500 blur" onClick={() => { navigate("/checkout/detail"); closeSidebar(); }}>Checkout</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="vertical-nav-bottom">
        <div className="social-links">
          <a href="https://www.google.com/"><ion-icon name="logo-facebook"/></a>
          <a href="https://www.google.com/"><ion-icon name="logo-twitter"/></a>
          <a href="https://www.google.com/"><ion-icon name="logo-youtube"/></a>
          <a href="https://www.google.com/"><ion-icon name="logo-instagram"/></a>
        </div>
      </div>
    </nav>
  )
}

export default VerticalNavbar;