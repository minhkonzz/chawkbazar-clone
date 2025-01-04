import { forwardRef } from "@/configs/imports-wrapper";
import type { SVGProps } from "@/types/ui";

const Checked = forwardRef<SVGSVGElement, SVGProps>(
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
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
    </svg>
  )
);

Checked.displayName = "ArrowDown";
export default Checked;