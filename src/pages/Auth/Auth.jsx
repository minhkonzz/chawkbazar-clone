import { useState } from 'react'
import './Auth.css'
import UserSaver from './UserSaver'
import UserInput from '../../common/UserInput/UserInput'
import { useDispatch } from 'react-redux'
import { touchAuthDialog } from '../../store/Reducers/popup'

const Auth = () => {

  const dispatch = useDispatch()
  const [ isLogin, setIsLogin ] = useState(true)

  return (
    <div className="auth-container d-flex fd-col at-center posab pos-center">
      <button className="posab right-0 circle-bd-r top-m4pc" onClick={() => dispatch(touchAuthDialog())}><ion-icon name="close" /></button>
      <img alt="shop-title" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flogo.svg&w=96&q=75"/>
      <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
      { !isLogin && <UserInput label="Name"/> }
      <UserInput label="Email" h={50}/>
      <UserInput label="Password" h={50}/>
      { isLogin && <UserSaver /> }
      <button className="w-100pc dark-v d-flex jc-center at-center thin-bd-r">
        { isLogin ? 'Login' : 'Register' }
      </button>
      <span>or</span>
      <button className="w-100pc d-flex jc-center at-center thin-bd-r" style={{ backgroundColor: 'rgb(66, 103, 178)' }}>
        <ion-icon name="logo-facebook" /> 
        <span>Login with Facebook</span>
      </button>
      <button className="w-100pc d-flex jc-center at-center thin-bd-r" style={{ backgroundColor: 'rgb(100, 150, 210)' }}>
        <ion-icon name="logo-google" />
        <span>Login with Google</span>
      </button>
      <p>Dont have any account? <b onClick={() => setIsLogin(!isLogin)}>{ isLogin ? 'Register' : 'Login' }</b></p>
    </div>
  )
}

export default Auth