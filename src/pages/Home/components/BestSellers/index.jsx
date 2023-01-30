import { useContext } from "react";
import Product from "common/components/Product/type-1";
import { HomeSectionContext } from "context/provider/homeSection.provider";
import "./best-sellers.css"

const BestSellers = () => {

  const { sectionData } = useContext(HomeSectionContext);

  return (
    <>
      <span className="home__section__title">Best Sellers</span>
      <div className="home__best-sellers__items">
        {sectionData.map((product, i) => 
          <Product key={i} data={product}/>
        )}
      </div>
    </>
  )
};

export default BestSellers;