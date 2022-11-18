import { memo } from "react"; 

const Auth3rdProviders = () => {

    console.log("Render Auth3rdProviders"); 

    return (
        <>
            <span>or</span>
            <button className="btn-fb w-100pc d-flex jc-center at-center thin-bd-r">
                <ion-icon name="logo-facebook" /> 
                <span>Login with Facebook</span>
            </button>
            <button className="btn-google w-100pc d-flex jc-center at-center thin-bd-r">
                <ion-icon name="logo-google" />
                <span>Login with Google</span>
            </button>
        </>
    )
}

export default memo(Auth3rdProviders); 