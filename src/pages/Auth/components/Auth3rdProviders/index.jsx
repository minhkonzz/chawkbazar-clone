import { memo } from "react"; 
import { AuthService } from "services/firebase/auth";

const Auth3rdProviders = () => {
  return (
    <>
      <span>or</span>
       <button className="btn-fb w-100pc thin-bd-r d-flex at-center jc-center">
        <span><ion-icon name="logo-facebook" /></span> 
        <span className="fw-600">Login with Facebook</span>
      </button>
      <button className="btn-google w-100pc thin-bd-r d-flex at-center jc-center" onClick={() => {
        AuthService.signInWithGoogle()
        .then(() => {
          console.log("Login With Google Success");
        })
        .catch((err) => {
          console.log(err.message);
        });
      }}>
        <span><ion-icon name="logo-google" /></span>
        <span className="fw-600">Login with Google</span>
      </button>
    </>
  )
}

export default memo(Auth3rdProviders); 