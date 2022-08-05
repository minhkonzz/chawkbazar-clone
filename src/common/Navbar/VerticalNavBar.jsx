import { LOGO_SHOP_PATH } from "../../utils/constants"
import { useDispatch } from "react-redux"
import { touchMenuSidebar } from "../../store/reducers/popup"

const VerticalNavbar = () => {

   const dispatch = useDispatch()
   return (
      <div className="vertical-nav">
         <div className="vertical-nav-top">
            <img alt="logo-shop" src={LOGO_SHOP_PATH}/>
            <ion-icon name="close" onClick={() => dispatch(touchMenuSidebar())}/>
         </div>   
         <div className="vertical-nav-center">

         </div>
         <div className="vertical-nav-bottom">
            <div className="social-links">
               <a href="https://www.google.com/"><ion-icon name="logo-facebook"/></a>
               <a href="https://www.google.com/"><ion-icon name="logo-twitter"/></a>
               <a href="https://www.google.com/"><ion-icon name="logo-youtube"/></a>
               <a href="https://www.google.com/"><ion-icon name="logo-instagram"/></a>
            </div>
         </div>
      </div>
   )
}

export default VerticalNavbar