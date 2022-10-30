import Navbar from "../../../../common/components/Navbar/Navbar"
import Footer from "../../../../common/components/Footer"
import UserMailGetter from "../../../../common/components/UserMailGetter"
import Modal from "../../../../common/components/PopupWrapper"
import BottomMenu from "../../../../common/components/BottomMenu"

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