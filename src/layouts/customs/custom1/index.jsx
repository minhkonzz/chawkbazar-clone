import Navbar from "../../../common/Navbar/Navbar"
import Footer from "../../../common/Footer/Footer"
import UserMailGetter from "../../../common/UserMailGetter/UserMailGetter"
import Modal from "../../../common/PopupWrapper/PopupWrapper"

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
      </>
   )
}

export default Custom1Layout