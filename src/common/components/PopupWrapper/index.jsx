import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PC_VIEW } from "utils/constants/meaning-vars";
import VerticalNavbar from "../Navbar/components/VerticalNavbar";
import Cart from "../Cart";
import Auth from "pages/Auth";
import FiltersSidebar from "pages/Catalog/components/FiltersSidebar";
import ProductDetail from "pages/ProductDetail";
import MessageBox from "../MessageBox";

const Modal = () => {

  const { 
    menuSidebar, 
    cartSidebar, 
    filtersSidebar, 
    authDialog, 
    productDetailId,
    message
  } = useSelector((state) => state.popup);

  useEffect(() => {
    const bodyStyle = document.body.style; 
    const isModalOpen = menuSidebar || cartSidebar || filtersSidebar || authDialog || productDetailId;
    if (PC_VIEW) {
      bodyStyle.overflowY = isModalOpen ? "hidden" : "scroll"; // on PC
      return; 
    }

    if (isModalOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`; 
      return; 
    }
    bodyStyle.position = "";
    bodyStyle.top = ""; 
    window.scrollTo(0, parseInt(bodyStyle.top || '0') * -1);
    return;
  }, [
    menuSidebar, 
    cartSidebar, 
    filtersSidebar,
    authDialog,
    productDetailId
  ]);

  return (
    <> {
      ( menuSidebar && <div className="popup-wrapper-d"><VerticalNavbar/></div> ) || 
      ( cartSidebar && <div className="popup-wrapper-d"><Cart/></div> ) || 
      ( filtersSidebar && <div className="popup-wrapper-d"><FiltersSidebar/></div> ) || 
      ( authDialog && <div className="popup-wrapper-d"><Auth/></div> ) || 
      ( productDetailId && <div className="popup-wrapper-d"><ProductDetail productId={productDetailId} /></div> )}
      {( message && <div className="popup-wrapper"><MessageBox message={message}/></div> )}
    </>
   );
};

export default Modal;