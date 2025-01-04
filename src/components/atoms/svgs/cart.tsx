import { forwardRef } from "@/configs/imports-wrapper";
import type { SVGProps } from "@/types/ui";

const Cart = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={className}
      width="18px"
      height="18px"
      viewBox="0 0 20 20"
      {...props}>
      <path
        d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z"
        transform="translate(-2 -2)"
        fill="currentColor"
        fillRule="evenodd"></path>
    </svg>
  )
);

Cart.displayName = "Cart";
export default Cart;
