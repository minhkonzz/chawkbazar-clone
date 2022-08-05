import PopupWrapper from '../PopupWrapper/PopupWrapper'
import { LOGO_SHOP_PATH } from '../../utils/constants'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { touchMenuSidebar, touchCartSidebar } from '../../store/reducers/popup'
import './Navbar.css'

const Navbar = () => {
  
  console.log('render Navbar component')
  const dispatch = useDispatch()
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = (e) => ref.current.style.boxShadow = `0 2px 8px ${window.scrollY > 0 ? '#e4e4e4' : 'transparent'}`
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav ref={ref} className="d-flex jc-sb at-center">
        <div className="navbar-left d-flex">
          <ion-icon name="menu-outline" onClick={() => dispatch(touchMenuSidebar())}/> 
          <img alt="logo-shop" src={LOGO_SHOP_PATH}/>
          <ul className="d-flex">
            <li className="nav-link">Men Wear</li>
            <li className="nav-link">Woman wear</li>
            <li className="nav-link">Search</li>
            <li className="nav-link">Shops</li>
            <li className="nav-link">Pages</li>
          </ul>
        </div>
        <div className="navbar-right d-flex at-center">
          <ion-icon name="search"/>
          <h4>Login</h4>
          <div className="cart-preview" onClick={() => dispatch(touchCartSidebar())}>
            <ion-icon name="bag-handle-outline" />
          </div>
        </div>
      </nav>
      <PopupWrapper />
    </>
  )
}

export default Navbar