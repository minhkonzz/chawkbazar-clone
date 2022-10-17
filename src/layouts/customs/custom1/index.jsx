import Navbar from "../../../common/Navbar/Navbar"
import Footer from "../../../common/Footer/Footer"
import UserMailGetter from "../../../common/UserMailGetter/UserMailGetter"
import Modal from "../../../common/PopupWrapper/PopupWrapper"
import BottomMenu from "../../../common/BottomMenu/BottomMenu"

const Custom1Layout = ({ children }) => {
   return (
      <>
         <Navbar />
         <div className="grid wide" style={{ paddingTop: 100 }}>
            <main>
               { children }
               <UserMailGetter />
            </main>
            <Footer />
         </div>
         <Modal />
         <BottomMenu />
      </>
   )
}

export default Custom1Layout