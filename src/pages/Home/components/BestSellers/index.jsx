import { useContext } from "react";
import Product from "../../../../common/components/Product/type-1"
import { HomeSectionContext } from "../../../../context/provider/homeSection.provider"

const BestSellers = () => {

   const { sectionData } = useContext(HomeSectionContext);

   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <h1>Best Sellers</h1>
            </div>
         </div>
         <div className="row"> {   
            sectionData.map((product, index) => (
               <div key={index} className="col lg-2-4 md-4 sm-6"><Product data={product}/></div>
            ))}
         </div>
      </div> 
   )
}

export default BestSellers