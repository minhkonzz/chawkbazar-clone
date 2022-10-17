import VerticalNavbar from '../Navbar/VerticalNavBar'
import Cart from '../Cart/Cart'
import Auth from '../../pages/Auth/Auth'
import ProductDetail from '../../pages/ProductDetail/ProductDetail'
import { useSelector } from 'react-redux'

const Modal = () => {

   const state = useSelector(state => state.popup)

   return (
      <> 
         {
            (state.menuSidebar && <div className="popup-wrapper"><VerticalNavbar/></div>) || 
            (state.cartSidebar && <div className="popup-wrapper"><Cart/></div>) || 
            (state.authDialog && <div className="popup-wrapper"><Auth/></div>) || 
            (state.productDetailId && <div className="popup-wrapper"><ProductDetail productId={state.productDetailId} /></div>)
         }
      </>
   )
}

export default Modal