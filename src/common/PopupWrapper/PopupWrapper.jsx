import './PopupWrapper.css'
import VerticalNavbar from '../Navbar/VerticalNavBar'
import Cart from '../Cart/Cart'
import { useSelector } from 'react-redux'
// import { useEffect, useRef } from 'react'

const PopupWrapper = () => {

   const state = useSelector(state => state.popup)

   return (
      <>
         {
            (state.menuSidebar && <div className="popup-wrapper w-full h-full"><VerticalNavbar/></div>) || 
            (state.cartSidebar && <div className="popup-wrapper w-full h-full"><Cart/></div>)
         }
      </>
   )
}

export default PopupWrapper