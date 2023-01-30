import { useEffect, useRef } from "react";
import NavbarLeftSide from "./components/NavbarLeftSide";
import NavbarRightSide from "./components/NavbarRightSide";
import "./index.css";

const HorizontalNavbar = () => {

  const navbarRef = useRef(null); 

  useEffect(() => {
    const onScroll = (e) => { navbarRef.current.style.boxShadow = `0 2px 8px ${window.scrollY > 0 ? '#e4e4e4' : 'transparent'}` };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll) };
  }, []);

  return (
    <header ref={navbarRef}>
      <nav>
        <NavbarLeftSide />
        <NavbarRightSide />
      </nav>
    </header>
  )
};

export default HorizontalNavbar;