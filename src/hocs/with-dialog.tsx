import { useEffect, useRef, useRouter } from "@/configs/imports-wrapper";
import { ComponentType } from "react";

export default function withDialog<P extends object>(
  BaseComponent: ComponentType<P>
) {
  return function DialogWrapper(props: any) {
    const ref = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
      ref.current?.showModal();
      const clickBackdrop = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
          (e.currentTarget as HTMLDialogElement).close();
        }
      }

      ref.current?.addEventListener("click", clickBackdrop);
      return () => {
        ref.current?.removeEventListener("click", clickBackdrop);
      }
    }, []);

    const closeModal = () => {
      ref.current?.close();
    };

    const onClose = () => {
      router.back();
    };

    return <BaseComponent {...props} {...{ ref, closeModal, onClose }} />;
  };
}
