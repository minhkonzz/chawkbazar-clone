import '../Cart.css'
import QtyController from '../../QtyController/QtyController'

const cartItemImgTemp = 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-14.png&w=128&q=75'

const CartItem = () => {
   return (
      <div className="cart-item d-flex jc-sb at-center w-100pc">
         <div className="cart-item-img"> 
            <img src={cartItemImgTemp} alt="cart-item-img" />
            <div className="del-icon w-100pc h-100pc">
               <ion-icon name="close-circle"/>
            </div>
         </div>
         <div className="cart-item-info">
            <p className="item-name">Hermes Carlton London - Red, XL</p>
            <p className="item-unit-price">Unit price: $15.00</p>
            <div className="d-flex w-100pc jc-sb at-center">
               {/* <QtyController w={120} h={35} textColor="white" bgColor="black"/> */}
               <div className="qty-ctl d-flex dark-v thin-bd-r">
                  <button className="qty-ctl-btn"><ion-icon name="remove"/></button>
                  <span className="qty d-flex jc-center at-center">1</span>
                  <button className="qty-ctl-btn"><ion-icon name="add"/></button>
               </div>
               <span><b>$12.00</b></span>
            </div>
         </div>
      </div>
   )
}

export default CartItem