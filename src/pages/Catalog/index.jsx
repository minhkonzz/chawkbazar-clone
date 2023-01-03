import { CATALOG_BANNER } from "utils/constants/base-source";
import "./index.css";
import Products from "./components/Products";
import Filters from "./components/Filters";

const Catalog = () => {

  return (
    <>
      <div className="row">
        <div className="col lg-12 md-12 sm-12 mb-36px">
          <img className="w-100pc" src={CATALOG_BANNER} alt="catalog_banner"/>
        </div>
      </div>
      <div className="row">
        <div className="col lg-2-ahalf md-0 sm-0 mb-36px"><Filters /></div>
        <div className="col lg-9-ahalf md-12 sm-12 mb-36px"><Products /></div>
      </div>
    </>
  )
}

export default Catalog;