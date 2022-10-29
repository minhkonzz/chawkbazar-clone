import HeaderBackground from '../../common/HeaderBackground'
import Navbar from '../../common/Navbar/Navbar'
import Footer from '../../common/Footer'
import UserMailGetter from '../../common/UserMailGetter'
import Modal from '../../common/PopupWrapper'
import BottomMenu from '../../common/BottomMenu'

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