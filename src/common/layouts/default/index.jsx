import HeaderBackground from '../../../common/components/HeaderBackground'
import Navbar from '../../../common/components/Navbar/Navbar'
import Footer from '../../../common/components/Footer'
import UserMailGetter from '../../../common/components/UserMailGetter'
import Modal from '../../../common/components/PopupWrapper'
import BottomMenu from '../../../common/components/BottomMenu'

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