import { memo } from "react"; 

const Auth3rdProviders = () => {
  return (
    <>
      <span>or</span>
      {/* <button className="btn-fb posrel w-100pc thin-bd-r fw-600">
        <span className="posab top-50pc left-23pc">
          <ion-icon name="logo-facebook" />
        </span> 
        <span className="posab pos-center">Login with Facebook</span>
      </button>
      <button className="btn-google posrel w-100pc thin-bd-r fw-600">
        <span className="posab top-50pc left-25pc">
          <ion-icon name="logo-google" />
        </span>
        <span className="posab pos-center">Login with Google</span>
      </button> */}
       <button className="btn-fb w-100pc thin-bd-r d-flex at-center jc-center">
        <span>
          <ion-icon name="logo-facebook" />
        </span> 
        <span className="fw-600">Login with Facebook</span>
      </button>
      <button className="btn-google w-100pc thin-bd-r d-flex at-center jc-center">
        <span>
          <ion-icon name="logo-google" />
        </span>
        <span className="fw-600">Login with Google</span>
      </button>
    </>
  )
}

export default memo(Auth3rdProviders); 