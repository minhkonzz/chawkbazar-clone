import Collections from "@/components/home/collections/template-c1w";
import FlashSale from "@/components/home/flash-sale/template-fs1w";
import SaleEvents from "@/components/home/sale-events/template-se1w";
import Promotions from "@/components/home/promotions";
import OnSellingProducts from "@/components/home/on-selling-products/template-osp1w";
import TopBrands from "@/components/home/top-brands/template-tb1w";
import NewArrivals from "@/components/home/new-arrivals/template-na1w";
import ServiceMemberContact from "@/components/home/service-member-contact";
import ModernCaptures from "@/components/home/modern-captures";

export default function Home() {
   return (
      <>
         <div className="wrapper1920 mx-auto">
            <Collections />
            <FlashSale />
            <OnSellingProducts />
            <TopBrands />
            <NewArrivals />
            <ServiceMemberContact />
            <ModernCaptures />
         </div>
      </>
   );
}
