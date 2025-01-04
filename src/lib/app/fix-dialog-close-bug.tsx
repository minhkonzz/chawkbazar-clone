import { type ReactNode as Dialog, usePathname } from "@/configs/imports-wrapper";

export const FixDialogCloseBug = ({
  expectedPath,
  children,
}: {
  expectedPath: string | RegExp;
  children: Dialog;
}) => {
  const pathname = usePathname();

  if (expectedPath instanceof RegExp) {
    if (expectedPath.test(pathname)) {
      return children;
    }
    return null;
  } else if (pathname.includes(expectedPath)) {
    return children;
  }
  return null;
};