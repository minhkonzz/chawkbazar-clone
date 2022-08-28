import HeaderBackground from '../../common/HeaderBackground/HeaderBackground'
import Navbar from '../../common/Navbar/Navbar'
import Footer from '../../common/Footer/Footer'
import UserMailGetter from '../../common/UserMailGetter/UserMailGetter'
import Modal from '../../common/PopupWrapper/PopupWrapper'

const DefaultLayout = ({ children }) => {
   console.log(children)
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
      </>
   )
}

export default DefaultLayout