import Collections from "./collections/template-c1w";
import FlashSale from "./flash-sale/template-fs1w";
import OnSellingProducts from "./on-selling-products/template-osp1w";
import TopBrands from "./top-brands/template-tb1w";
import NewArrivals from "./new-arrivals/template-na1w";
import ServiceMemberContact from "./service-member-contact";
import ModernCaptures from "./modern-captures";

export default function Home() {
  return (
    <div className="wrapper1920 mx-auto">
      <Collections />
      <FlashSale />
      <OnSellingProducts />
      <TopBrands />
      <NewArrivals />
      <ServiceMemberContact />
      <ModernCaptures />
    </div>
  );
}
