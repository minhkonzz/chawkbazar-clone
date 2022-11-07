import { useState } from "react";
import UserSaver from "../../UserSaver";
import UserInput from "../../../../common/components/UserInput"
import { AuthService } from "../../../../services/firebase/auth"

const AuthFields = () => {

    const [ isAuth, setIsAuth ] = useState(0);
    const [ isLogin, setIsLogin ] = useState(true);
    const [ name, setName ] = useState(""); 
    const [ email, setEmail ] = useState(""); 
    const [ password, setPassword ] = useState("");

    const onAuthRequest = () => {
        if (isLogin) {
            AuthService.signIn(email, password)
            .then((currentUserUID) => {
                if (currentUserUID) alert("Dang nhap thanh cong"); 
            }) 
            .catch((err) => console.error(err.message))
        }  
        else {
            AuthService.signUp(email, password)
            .then(() => {
                alert("Dang ky thanh cong"); 
            })
            .catch((err) => console.error(err.message))
        } 
        setIsAuth(isAuth + 1);
    }

    const onNavigateToRegister = () => {
        setIsLogin(!isLogin);
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
            { !isLogin && <UserInput label="Name" inputValue={name} onChangeText={setName} /> }
            { !isLogin && name.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập tên của bạn</p>} 
            <UserInput label="Email" inputValue={email} onChangeText={setEmail} />
            { email.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập Email</p> }
            <UserInput label="Password" inputValue={password} onChangeText={setPassword} isPassword />
            { password.length === 0 && isAuth > 0 && <p className="warn-title">Vui lòng nhập password</p> } 
            { isLogin && <UserSaver /> }
            <button className="btn-log-to w-100pc dark-v d-flex jc-center at-center thin-bd-r" onClick={onAuthRequest}>
            { isLogin ? 'Login' : 'Register' }
            </button>
            <p>Dont have any account? <b onClick={onNavigateToRegister}>{ isLogin ? 'Register' : 'Login' }</b></p>
        </>
    )
}

export default AuthFields;