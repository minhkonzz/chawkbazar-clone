import HorizontalNavbar from "common/components/Navbar/components/HorizontalNavbar";
import Footer from "common/components/Footer"
import UserMailGetter from "common/components/UserMailGetter";
import Modal from "common/components/PopupWrapper";
import BottomMenu from "common/components/BottomMenu";

const Custom1Layout = ({ children }) => {
  return (
    <>
      <HorizontalNavbar />
      <main>
        { children }
        <UserMailGetter />
      </main>
      <Footer />
      <Modal />
      <BottomMenu />
    </>
  )
}

export default Custom1Layout;