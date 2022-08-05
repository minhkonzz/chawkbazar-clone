import { useState } from 'react'
import './Auth.css'
import UserSaver from './UserSaver'
import UserInput from '../../common/UserInput/UserInput'
import Button from '../../common/Button/Button'

const Auth = props => {

  const [ isLogin, setIsLogin ] = useState(true)

  return (
    <div className="auth-container">
      <button onClick={() => props.setOpenPopup(false)}><ion-icon name="close" /></button>
      <img alt="shop-title" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flogo.svg&w=96&q=75"/>
      <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
      { !isLogin && <UserInput label="Name"/> }
      <UserInput label="Email" h={50}/>
      <UserInput label="Password" h={50}/>
      { isLogin && <UserSaver /> }
      <Button text={ isLogin ? 'Login' : 'Register' } textColor='white' h={50}/>
      <span>or</span>
      <Button text="Login with Facebook" textColor="white" bgColor="rgb(66, 103, 178)" icon="logo-facebook" h={50}/>
      <Button text="Login with Google" textColor="white" bgColor="rgb(100, 150, 210)" icon="logo-google" h={50}/>
      <p>Dont have any account? <b onClick={() => setIsLogin(!isLogin)}>{ isLogin ? 'Register' : 'Login' }</b></p>
    </div>
  )
}

export default Auth