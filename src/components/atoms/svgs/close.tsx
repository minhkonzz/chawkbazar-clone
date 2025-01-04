import { forwardRef } from "@/configs/imports-wrapper";
import type { SVGProps } from "@/types/ui";

const Close = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      {...props}>
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
    </svg>
  )
);

Close.displayName = "Close";
export default Close;
