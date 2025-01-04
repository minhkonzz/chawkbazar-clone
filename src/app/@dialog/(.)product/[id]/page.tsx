"use client";

import {
  useState,
  useEffect,
  forwardRef,
  NextImage,
  type ForwardedRef
} from "@/configs/imports-wrapper";

import { getProductSnapShotById } from "@/lib/firebase/firestore/product";
import type { DialogProps } from "@/types/ui";
import type { Product as SerializedProduct } from "@/types/entities";
import CloseButton from "../../close-button";
import ProductDetailMain from "./main/main";
import ProductDetailSkeleton from "./skeleton/skeleton";
import withDialog from "@/hocs/with-dialog";
import styles from "./style.module.css";

type Props = DialogProps & { params: { id: string } };

export default withDialog(
  forwardRef(function ProductDetail(
    { onClose, closeModal, params: { id } }: Props,
    ref: ForwardedRef<HTMLDialogElement | null>
  ) {
    const [product, setProduct] = useState<SerializedProduct>();

    useEffect(() => {
      const unsub = getProductSnapShotById(id, (product: SerializedProduct) => {
        setProduct(product);
      });
      return () => unsub();
    }, []);

    return (
      <dialog
        ref={ref}
        onClose={onClose}
        className={`${styles.wrapper} w-100pc d-flex pos-center bg-white`}>
        <CloseButton onClick={closeModal} />
        {(product && (
          <>
            <div className={`${styles.image} posrel o-h`}>
              <NextImage
                width={430}
                height={596}
                objectFit="contain"
                style={{ width: "100%", height: "auto" }}
                src={product.images.pm!}
                alt={product.name}
              />
            </div>
            <ProductDetailMain item={product} />
          </>
        )) || <ProductDetailSkeleton />}
      </dialog>
    );
  })
);
