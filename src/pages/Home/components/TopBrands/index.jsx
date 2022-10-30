import './index.css'
import { BaseSource } from '../../../../utils/constants'
import { useCreatedContext } from "../../../../services/context/provider"

const TopBrands = () => {

   const [ state, dispatch ] = useCreatedContext();

   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <h1>Top brands</h1>
            </div>
         </div>
         <div className="row"> {
            state?.sectionData.map(brand => {
               return (
                  <div key={brand?.id} className="col lg-3 md-4 sm-6">
                     <div className="top-brand w-100pc thin-bd-r o-h">
                        <div className="posrel pt-100pc">
                           <div className="posab top-0 left-0">
                              <img className="top-brand-img" src={`${BaseSource.PREFIX_API_SOURCE + brand?.background_image?.thumbnail}`} alt="brand_image"/>
                              <div className="top-brand-logo posab top-0 left-0 right-0 bottom-0">
                                 <img className="posab pos-center" src={`${BaseSource.PREFIX_API_SOURCE + brand?.image?.thumbnail}`} alt="brand_logo"/>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default TopBrands