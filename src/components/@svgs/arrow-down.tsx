import { forwardRef } from "react";
import type { SVGProps } from "@/shared/types";

const ArrowDown = forwardRef<SVGSVGElement, SVGProps>(
   ({ className, ...props }, ref) => (
      <svg
         ref={ref}
         className={className}
         stroke="currentColor"
         fill="none"
         strokeWidth="2"
         viewBox="0 0 24 24"
         aria-hidden="true"
         height="1em"
         width="1em"
         {...props}>
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
      </svg>
   )
);

ArrowDown.displayName = "ArrowDown";
export default ArrowDown;
