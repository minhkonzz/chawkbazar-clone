import HeaderBackground from 'common/components/HeaderBackground';
import HorizontalNavbar from 'common/components/Navbar/components/HorizontalNavbar';
import Footer from 'common/components/Footer';
import UserMailGetter from 'common/components/UserMailGetter';
import Modal from 'common/components/PopupWrapper';
import BottomMenu from 'common/components/BottomMenu';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HorizontalNavbar />
      <main>
        <HeaderBackground />
        { children }
        <UserMailGetter />
      </main>
      <Footer />
      <Modal />
      <BottomMenu />
    </>
  )
}

export default DefaultLayout;