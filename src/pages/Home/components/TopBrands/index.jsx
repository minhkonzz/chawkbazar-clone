import { useContext } from "react";
import './index.css';
import { BaseSource } from 'utils/constants';
import { HomeSectionContext } from "context/provider/homeSection.provider";

const TopBrands = () => {

  const { sectionData } = useContext(HomeSectionContext);

  return (
    <>
      <span className="home__section__title">Top brands</span>
      <div className="home__top-brands__items"> {
        sectionData.map((brand) => 
          <div className="home__top-brands__item">
            <img className="home__top-brands__item__image" src={`${BaseSource.PREFIX_API_SOURCE + brand?.background_image}`} alt="brand_image"/>
            <div className="home__top-brands__item__logo">
              <img src={`${BaseSource.PREFIX_API_SOURCE + brand?.logo}`} alt="brand_logo"/>
            </div>
          </div>
        )}
      </div>
    </>
  )
};

export default TopBrands;