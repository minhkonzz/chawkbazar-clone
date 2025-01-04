import { type ReactNode, _dynamic } from "@/configs/imports-wrapper";
import styles from "./layout.module.css";
import Banner from "@/components/organisms/banner";

const AccountNav = _dynamic(() => import("@/components/organisms/profile-nav"), {
  ssr: false
});

export default function Account({ children }: { children: ReactNode }) {
  return (
    <Banner title="My Account">
      <div className="wrapper1920">
        <div className={`${styles.wrapper} d-flex mx-auto`}>
          <nav className={styles.nav}>
            <AccountNav styles={styles} />
          </nav>
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </Banner>
  );
}
