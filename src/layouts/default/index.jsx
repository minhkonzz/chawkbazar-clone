import HeaderBackground from '../../common/HeaderBackground/HeaderBackground'
import Navbar from '../../common/Navbar/Navbar'
import Footer from '../../common/Footer/Footer'
import UserMailGetter from '../../common/UserMailGetter/UserMailGetter'
import Modal from '../../common/PopupWrapper/PopupWrapper'
import BottomMenu from '../../common/BottomMenu/BottomMenu'

const DefaultLayout = ({ children }) => {
   return (
      <>
         <Navbar />
         <HeaderBackground />
         <div className="grid wide">
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

export default DefaultLayout