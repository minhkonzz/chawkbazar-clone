import HorizontalNavbar from "../../../components/Navbar/components/HorizontalNavbar";
import Footer from "../../../../common/components/Footer"
import UserMailGetter from "../../../../common/components/UserMailGetter";
import Modal from "../../../../common/components/PopupWrapper";
import BottomMenu from "../../../../common/components/BottomMenu";
import { motion } from "framer-motion";

const Custom1Layout = ({ children }) => {

   return (
      <>
         <HorizontalNavbar />
         <motion.div 
            className="grid wide" 
            style={{ paddingTop: 100 }}
            initial={{ width: 0 }}
            animate={{ width: window.innerWidth >= 1024 ? "calc(100vw - 90px)" : window.innerWidth >= 740 && window.innerWidth <= 1023 ? "calc(100vw - 60px)" : "100vw" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.6 } }}>
            <main>
               { children }
               <UserMailGetter />
            </main>
            <Footer />
         </motion.div>
         <Modal />
         <BottomMenu />
      </>
   )
}

export default Custom1Layout