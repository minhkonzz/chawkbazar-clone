// import { useRef } from "react";
// import { BaseSource } from "utils/constants";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { touchMenuSidebar } from "services/redux/store/reducers/popup.reducer";
import "./vertical-nav.css";

const VerticalNavbar = () => {

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const nestSidebarMenu = useRef(null);
  // const menuSidebarRef = useRef(null);

  // const touchNestSidebarMenu = () => {
  //   nestSidebarMenu.current.classList.toggle("open");
  // }

  // const closeSidebar = () => {
  //   menuSidebarRef.current.style.left = "-100%";
  //   setTimeout(() => {
  //     dispatch(touchMenuSidebar());
  //   }, 500);
  // }

  return (
    // <nav className="nav-vertical" ref={menuSidebarRef}>
    //   <div className="nav-vertical-top">
    //     <img alt="logo-shop" src={BaseSource.LOGO_SHOP_PATH} />
    //     <ion-icon name="close" onClick={closeSidebar} />
    //   </div>   
    //   <div className="nav-vertical-center">
    //     <ul className="nav-vertical-center__menu">
    //       <li className="nav-vertical-center__menu__link" onClick={() => { navigate("/catalog"); closeSidebar() }}>Products</li>
    //       <li className="nav-vertical-center__menu__link">
    //         <div className="nav-vertical-center__menu__link__title">
    //           Pages
    //           <ion-icon name="chevron-down" onClick={touchNestSidebarMenu}/>
    //         </div>
    //         <ul className="nav-vertical-center__menu-nest" ref={nestSidebarMenu}>
    //           <li className="nav-vertical-center__menu-nest__link" onClick={() => { navigate("/profile"); closeSidebar(); }}>My Account</li>
    //           <li className="nav-vertical-center__menu-nest__link" onClick={() => { navigate("/faq"); closeSidebar(); }}>FAQ</li>
    //           <li className="nav-vertical-center__menu-nest__link" onClick={() => { navigate("/terms"); closeSidebar(); }}>Terms & Conditions</li>
    //           <li className="nav-vertical-center__menu-nest__link" onClick={() => { navigate("/contactus"); closeSidebar(); }}>Contact us</li>
    //           <li className="nav-vertical-center__menu-nest__link" onClick={() => { navigate("/checkout/detail"); closeSidebar(); }}>Checkout</li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="nav-vertical-bottom">
    //     <a href="https://www.google.com/"><ion-icon name="logo-facebook"/></a>
    //     <a href="https://www.google.com/"><ion-icon name="logo-twitter"/></a>
    //     <a href="https://www.google.com/"><ion-icon name="logo-youtube"/></a>
    //     <a href="https://www.google.com/"><ion-icon name="logo-instagram"/></a>
    //   </div>
    // </nav>
    <nav className="nav-vertical">
      <div className="nav-vertical-top">
        <img alt="logo-shop" />
        {/* <ion-icon name="close" /> */}
      </div>   
      <div className="nav-vertical-center">
        <ul className="nav-vertical-center__menu">
          <li className="nav-vertical-center__menu__link">Products</li>
          <li className="nav-vertical-center__menu__link">
            <div className="nav-vertical-center__menu__link__title">
              Pages
              {/* <ion-icon name="chevron-down" /> */}
            </div>
            <ul className="nav-vertical-center__menu-nest">
              <li className="nav-vertical-center__menu-nest__link">My Account</li>
              <li className="nav-vertical-center__menu-nest__link">FAQ</li>
              <li className="nav-vertical-center__menu-nest__link">Terms & Conditions</li>
              <li className="nav-vertical-center__menu-nest__link">Contact us</li>
              <li className="nav-vertical-center__menu-nest__link">Checkout</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="nav-vertical-bottom">
        {/* <a href="https://www.google.com/"><ion-icon name="logo-facebook"/></a>
        <a href="https://www.google.com/"><ion-icon name="logo-twitter"/></a>
        <a href="https://www.google.com/"><ion-icon name="logo-youtube"/></a>
        <a href="https://www.google.com/"><ion-icon name="logo-instagram"/></a> */}
      </div>
    </nav>
  )
}

export default VerticalNavbar;