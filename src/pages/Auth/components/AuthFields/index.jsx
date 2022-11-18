import { useEffect, useState } from "react";
import UserSaver from "../../UserSaver";
import UserInput from "../../../../common/components/UserInput";
import Auth3rdProviders from "../Auth3rdProviders";
import { AuthService } from "../../../../services/firebase/auth";

const AuthFields = ({ isLogin, setIsLogin, authState }) => {

    console.log("render AuthFields component"); 
    const { isAuthFailed, setIsAuthFailed } = authState;
    const [ isAuth, setIsAuth ] = useState(0);
    const [ name, setName ] = useState(""); 
    const [ email, setEmail ] = useState(""); 
    const [ password, setPassword ] = useState("");

    const onAuthRequest = () => {
        if (isLogin) {
            AuthService.signIn(email, password)
            .then((currentUserUID) => {
                if (currentUserUID) console.log(currentUserUID);  
            }) 
            .catch((err) => {
                console.error(err);
                setIsAuthFailed(true); 
            })
        }  
        else {
            AuthService.signUp(email, password)
            .then(() => {
                console.log("Sign up OK"); 
            })
            .catch((err) => {
                console.error(err.message); 
                setIsAuthFailed(true); 
            })
        } 
        setIsAuth(isAuth + 1);
    }

    useEffect(() => {
        if (!isLogin) setName(""); 
        setEmail(""); 
        setPassword(""); 
    }, [isLogin])

    return (
            isAuthFailed ?  
            <div className="auth-status d-flex">
                <span className="failed checkmark">
                    <ion-icon name="close-circle" />
                </span>
                <p>{`${isLogin ? "Email or Password not right" : "Sign up not success" }`} </p>
            </div> : 
            <> 
                <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
                { !isLogin && <UserInput label="Name" inputValue={name} onChangeText={setName} /> }
                { !isLogin && name.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập tên của bạn</p>} 
                <UserInput label="Email" inputValue={email} onChangeText={setEmail} />
                { email.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập Email</p> }
                <UserInput label="Password" inputValue={password} onChangeText={setPassword} isPassword />
                { password.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập password</p> } 
                { isLogin && <UserSaver /> }
                <p>Dont have any account? <b onClick={() => setIsLogin(!isLogin)}>{ isLogin ? 'Register' : 'Login' }</b></p>
                <button className="btn-log-to w-100pc dark-v d-flex jc-center at-center thin-bd-r" onClick={onAuthRequest}>
                    { isLogin ? 'Login' : 'Register' }
                </button>
                <Auth3rdProviders />
            </>
    )
}

export default AuthFields;