import { CATALOG_BANNER } from "utils/constants/base-source";
import "./catalog.css";
import Products from "./components/Products";
import Filters from "./components/Filters";

const Catalog = () => {
  return (
    <>
      <div className="catalog__banner">
        <img className="catalog__banner__image" src={CATALOG_BANNER} alt="catalog_banner"/>
      </div>
      <div className="catalog-main">
        <Filters />
        <Products />
      </div>
    </>
  )
}

export default Catalog;