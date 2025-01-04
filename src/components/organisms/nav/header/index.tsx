import { NextImage, NextLink, Suspense, _dynamic } from "@/configs/imports-wrapper";
import styles from "./style.module.css";

const HeaderTabs = _dynamic(() => import("./tabs"), { ssr: false });
const HeaderRight = _dynamic(() => import("./rs"), { ssr: false });

export default function NavHeader() {
  return (
    <header className={`${styles.wrapper} bg-white`}>
      <div
        className={`${styles.inner} wrapper-1920 d-flex jc-sb h-100pc mx-auto`}>
        <nav className="d-flex h-100pc at-center">
          <NextLink href="/">
            <NextImage
              className={`${styles.logo} h-auto`}
              src="/logo.webp"
              alt="logo_shop"
              width={95}
              height={30}
              priority
            />
          </NextLink>
          <ul className={styles.menu}>
            <HeaderTabs />
          </ul>
        </nav>
        <Suspense fallback={<span>Loading</span>}>
          <HeaderRight />
        </Suspense>
      </div>
    </header>
  );
}
