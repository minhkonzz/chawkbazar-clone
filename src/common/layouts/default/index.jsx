import HeaderBackground from '../../../common/components/HeaderBackground';
import HorizontalNavbar from '../../components/Navbar/components/HorizontalNavbar';
import Footer from '../../../common/components/Footer';
import UserMailGetter from '../../../common/components/UserMailGetter';
import Modal from '../../../common/components/PopupWrapper';
import BottomMenu from '../../../common/components/BottomMenu';

const DefaultLayout = ({ children }) => {
   return (
      <>
         <HorizontalNavbar />
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