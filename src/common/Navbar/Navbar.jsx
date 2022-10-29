import { BaseSource } from '../../utils/constants'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { touchMenuSidebar, touchCartSidebar, touchAuthDialog } from '../../store/Reducers/global/popup'
import './Navbar.css'
import './Dropdown.css'

const Navbar = () => {
  
  const userLoggedIn = useSelector(state => state.currentUser.userLoggedIn); 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navbarRef = useRef(null)

  useEffect(() => {
    const onScroll = (e) => navbarRef.current.style.boxShadow = `0 2px 8px ${window.scrollY > 0 ? '#e4e4e4' : 'transparent'}`
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header>
      <nav ref={navbarRef} className="d-flex jc-sb at-center w-full">
        <div className="navbar-left d-flex at-center">
          <ion-icon name="menu-outline" onClick={() => dispatch(touchMenuSidebar())}/> 
          <img alt="logo-shop" src={BaseSource.LOGO_SHOP_PATH}/>
          <ul className="d-flex">
            <li className="nav-link d-flex at-center fw-600" onClick={() => navigate('/catalog')}>Products</li>
            <li className="nav-link d-flex at-center fw-600">Shops</li>
            <li className="nav-link d-flex at-center fw-600">
              Pages
              <div className="dropdown-menu">
                <span onClick={() => navigate('/profile')}>My Account</span>
                <span onClick={() => navigate('/faq')}>FAQ</span>
                <span onClick={() => navigate('/terms')}>Terms & Conditions</span>
                <span onClick={() => navigate('/contactus')}>Contact us</span>
                <span onClick={() => navigate('/checkout')}>Checkout</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="navbar-right d-flex at-center">
          <ion-icon name="search"/>
          <h4 onClick={() => dispatch(touchAuthDialog())}>{userLoggedIn ? userLoggedIn.email : "Login"}</h4>
          <div className="cart-preview" onClick={() => dispatch(touchCartSidebar())}>
            <ion-icon name="bag-handle-outline" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar