import { useContext } from "react";
import Product from "../../../../common/components/Product/type-1";
import { HomeSectionContext } from "../../../../context/provider/homeSection.provider";

const BestSellers = () => {

  const { sectionData } = useContext(HomeSectionContext);

  return (
    <>
      <div className="col lg-12 md-12 sm-12 mb-24px">
        <h1>Best Sellers</h1>
      </div>
      {
        sectionData.map((product, index) => (
          <div key={index} className="col lg-2-4 md-4 sm-6 mb-36px"><Product data={product}/></div>
      ))}
    </>
  )
};

export default BestSellers;