import styles from "./page.module.css";
import Header from "@/components/main-header"
import Collections from "@/components/collections";
import FlashSale from "@/components/flash-sale/template-fs1w";
import SaleEvents from "@/components/sale-events/template-se1w";
import OnSellingProducts from "@/components/on-selling-products/template-osp1w";
import TopBrands from "@/components/top-brands/template-tb1w";
import NewArrivals from "@/components/new-arrivals/template-na1w";
import ServiceMemberContact from "@/components/service-member-contact";
import ModeCaptures from "@/components/mode-captures";
import EmailSubscribe from "@/components/email-subscribe";
import Footer from "@/components/footer";

export default function () {
   return (
      <div>
         <Header />
         <main className={styles.main}>
            <Collections />
            <div className={`${styles.flashSale} mx-auto`}>
               <FlashSale />
            </div>
            <div className={`${styles.saleEvents} mx-auto`}>
               <SaleEvents />
            </div>
            <div className={`${styles.wrapper} mx-auto`}>
               <div className={styles.homeSection}>
                  <OnSellingProducts />
               </div>
               <div className={styles.homeSection}>
                  <TopBrands />
               </div>
               <div className={styles.homeSection}>
                  <NewArrivals />
               </div>
               <div className={styles.serviceMemberContact}>
                  <ServiceMemberContact />
               </div>
               <div className={styles.homeSection}>
                  <ModeCaptures />
               </div>
               <div className={styles.homeSection}>
                  <EmailSubscribe />
               </div>
            </div>
         </main>
         <Footer />
      </div>
   );
}
