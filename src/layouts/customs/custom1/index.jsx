import Navbar from "../../../common/Navbar/Navbar"
import Footer from "../../../common/Footer"
import UserMailGetter from "../../../common/UserMailGetter"
import Modal from "../../../common/PopupWrapper"
import BottomMenu from "../../../common/BottomMenu"

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