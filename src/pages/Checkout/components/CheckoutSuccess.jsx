import { useNavigate } from "react-router-dom";
import BagSvg from "common/svgs/bag";

const CheckoutSuccess = () => {

  const navigate = useNavigate();

  return (
    <div className="col lg-12 md-12 sm-12">
      <div className="checkout__success d-flex fd-col at-center">
        <BagSvg />
        <div className="checkout__success-title d-flex at-center">
          <ion-icon name="checkmark-circle" />
          <p className="fw-700">Cảm ơn bạn đã mua sản phẩm</p>
        </div>
        <button className="dark-v thin-bd-r fw-600" onClick={() => navigate("/")}>Trở lại trang chủ</button>
      </div>
    </div>
  )
}

export default CheckoutSuccess;