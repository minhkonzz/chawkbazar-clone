import VerticalNavbar from "../Navbar/components/VerticalNavbar";
import Cart from "../Cart";
import Auth from "../../../pages/Auth";
import ProductDetail from "../../../pages/ProductDetail";
import MessageBox from "../MessageBox";
import { useSelector } from "react-redux";

const Modal = () => {

   const popup = useSelector((state) => state.popup);

   return (
      <> 
         {
            (popup.menuSidebar && <div className="popup-wrapper-d"><VerticalNavbar/></div>) || 
            (popup.cartSidebar && <div className="popup-wrapper-d"><Cart/></div>) || 
            (popup.authDialog && <div className="popup-wrapper-d"><Auth/></div>) || 
            (popup.productDetailId && <div className="popup-wrapper-d"><ProductDetail productId={popup.productDetailId} /></div>)
         }
         { (popup.message && <div className="popup-wrapper"><MessageBox message={popup.message}/></div>) }
      </>
   );
};

export default Modal;