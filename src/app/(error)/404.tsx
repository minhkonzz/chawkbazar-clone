import { NextImage } from "@/configs/imports-wrapper";
import { Button } from "@/components/atoms";
import Bag404 from "../../../public/404.svg";
import styles from "./style.module.css";

export default function Page404() {
  return (
    <div
      className={`${styles.wrapper} d-flex fd-col jc-center at-center`}>
      <NextImage
        width={824}
        height={493}
        src={Bag404}
        alt="404"
        className={styles.image}
      />
      <Button className={styles.btn}>Back to home</Button>
    </div>
  );
}
