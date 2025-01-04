import { forwardRef } from "@/configs/imports-wrapper";
import type { SVGProps } from "@/types/ui";

const Lightning = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={className}
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 14 14 3v7h6L10 21v-7H4z"
        />
      </g>
    </svg>
  )
);

Lightning.displayName = "Lightning";
export default Lightning;
