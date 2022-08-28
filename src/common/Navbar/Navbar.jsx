import { LOGO_SHOP_PATH } from '../../utils/constants'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { touchMenuSidebar, touchCartSidebar, touchAuthDialog } from '../../store/reducers/popup'
import './Navbar.css'
import './Dropdown.css'

const Navbar = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = (e) => ref.current.style.boxShadow = `0 2px 8px ${window.scrollY > 0 ? '#e4e4e4' : 'transparent'}`
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header>
      <nav ref={ref} className="d-flex jc-sb at-center w-full">
        <div className="navbar-left d-flex at-center">
          <ion-icon name="menu-outline" onClick={() => dispatch(touchMenuSidebar())}/> 
          <img alt="logo-shop" src={LOGO_SHOP_PATH}/>
          <ul className="d-flex">
            <li className="nav-link d-flex at-center" onClick={() => navigate('/catalog')}>Products</li>
            <li className="nav-link d-flex at-center">Shops</li>
            <li className="nav-link d-flex at-center">
              Pages
              <div className="dropdown-menu">
                <span className="blur" onClick={() => navigate('/profile')}>Your Profile</span>
                <span className="blur" onClick={() => navigate('/faq')}>FAQ</span>
                <span className="blur" onClick={() => navigate('/terms')}>Terms & Conditions</span>
                <span className="blur" onClick={() => navigate('/contactus')}>Contact us</span>
                <span className="blur" onClick={() => navigate('/checkout')}>Checkout</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="navbar-right d-flex at-center">
          <ion-icon name="search"/>
          <h4 onClick={() => dispatch(touchAuthDialog())}>Login</h4>
          <div className="cart-preview" onClick={() => dispatch(touchCartSidebar())}>
            <ion-icon name="bag-handle-outline" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar