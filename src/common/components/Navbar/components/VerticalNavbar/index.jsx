import { useRef } from "react";
import { BaseSource } from "../../../../../utils/constants";
import { useDispatch } from "react-redux";
import { touchMenuSidebar } from "../../../../../services/redux/store/reducers/popup.reducer";
import "./index.css";

const VerticalNavbar = () => {

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
               <li className="fw-500">Products</li>
               <li className="fw-500">Shops</li>
               <li className="fw-500 posrel">
                  <div className="d-flex at-center jc-sb">
                     Pages
                     <ion-icon name="chevron-down" onClick={touchNestSidebarMenu}/>
                  </div>
                  <ul ref={nestSidebarMenu}>
                     <li className="fw-500 blur">My Account</li>
                     <li className="fw-500 blur">FAQ</li>
                     <li className="fw-500 blur">Terms & Conditions</li>
                     <li className="fw-500 blur">Contact us</li>
                     <li className="fw-500 blur">Checkout</li>
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