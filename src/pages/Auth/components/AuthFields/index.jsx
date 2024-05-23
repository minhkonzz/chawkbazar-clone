// import { useEffect, useState } from "react";
// import UserSaver from "../../UserSaver";
// import UserInput from "common/components/UserInput";
// import Auth3rdProviders from "../Auth3rdProviders";
// import { AuthService } from "services/firebase/auth";
// import { regex } from "utils/constants";

// const AuthFields = ({ isLogin, setIsLogin, authState }) => {
  
//   const { isAuthFailed, setIsAuthFailed } = authState;
//   const [ name, setName ] = useState(""); 
//   const [ email, setEmail ] = useState(""); 
//   const [ password, setPassword ] = useState("");
//   const [ errors, setErrors ] = useState(null);
//   // const [ headerStatus, setHeaderStatus ] = useState(null);
  
//   const onAuthRequest = () => {
//     const userInputErrors = getUserInputErrors();
//     console.log(userInputErrors);
//     if (userInputErrors) {
//       setErrors(userInputErrors);
//       return;
//     }
//     if (isLogin) {
//       AuthService.signIn(email, password)
//       .then((currentUserUID) => {
//         if (currentUserUID) {
//           console.log("Login success")
//           localStorage.setItem("user_pwd", password);
//         }  
//       }) 
//       .catch((err) => {
//         setIsAuthFailed(true); 
//       })
//     }  
//     else {
//       AuthService.signUp(email, password, name)
//       .then(() => {
//         console.log("Sign up success");
//       })
//       .catch((err) => {
//         setIsAuthFailed(true); 
//       })
//     }
//   }

//   const getUserInputErrors = () => {
//     const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = regex;
//     const nameRegexExtract = name.match(NAME_REGEX);
//     const emailRegexExtract = email.match(EMAIL_REGEX);
//     const passwordRegexExtract = password.match(PASSWORD_REGEX);
//     const nameError = !isLogin && ((name.length === 0 && "Vui lòng thêm username") || (!nameRegexExtract && "Chỉ ký tự chữ hoặc số")) || "";
//     const emailError = (email.length === 0 && "Vui lòng thêm Email") || (!emailRegexExtract && "Email không đúng định dạng") || "";
//     const passwordError = (password.length === 0 && "Vui lòng thêm password") || (!passwordRegexExtract && "Password tối thiểu 8 đến 15 ký tự, chứa ít nhất 1 ký tự đặc biệt và 1 ký tự in hoa") || "";
//     if (nameError || emailError || passwordError) {
//       return {
//         nameError,
//         emailError,
//         passwordError
//       }
//     }
//     return null;
//   }

//   useEffect(() => {
//     if (!isLogin) setName(""); 
//     setEmail(""); 
//     setPassword(""); 
//     setErrors(null);
//     // if (headerStatus) setHeaderStatus(null);
//   }, [isLogin]);

//   useEffect(() => {
//     if (errors) setErrors(null);
//     // if (headerStatus) setHeaderStatus(null);
//   }, [name, email, password]);

//   return (
//     isAuthFailed ?  
//     <div className={`auth__status w-100pc failed`}>
//       <ion-icon name="close-circle-outline" />
//       <p className="auth__status-text fw-600">Đăng nhập không thành công</p>
//     </div> :
//     <> 
//       <p className="auth-title">{ isLogin ? 'Login with your email & password' : 'By signing up, you agree to our terms & policy'}</p>
//       { !isLogin && <UserInput label="Name" inputValue={name} onChangeText={setName} errorMessage={errors?.nameError}/> }
//       <UserInput label="Email" inputValue={email} onChangeText={setEmail} errorMessage={errors?.emailError}/>
//       <UserInput isPassword label="Password" inputValue={password} onChangeText={setPassword} errorMessage={errors?.passwordError}/>
//       { isLogin && <UserSaver /> }
//       <p>Dont have any account? <b onClick={() => setIsLogin(!isLogin)}>{ isLogin ? 'Register' : 'Login' }</b></p>
//       <button className="btn-log-to w-100pc dark-v thin-bd-r fw-600" onClick={onAuthRequest}>
//         { isLogin ? 'Login' : 'Register' }
//       </button>
//       <Auth3rdProviders />
//     </>
//   )
// }

// export default AuthFields;