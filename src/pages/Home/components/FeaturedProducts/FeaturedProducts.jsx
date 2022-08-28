import './FeaturedProducts.css'
import FeaturedProduct from './FeaturedProduct'
import { sectionContext } from '../../Home'
import { useContext } from 'react'

const FeaturedProducts = () => {

   const sectionData = useContext(sectionContext)

   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <h1>Featured Products</h1>
            </div>
         </div>
         <div className="row">
            <div className="col lg-6 md-12 sm-12">
               <FeaturedProduct data={sectionData[0]}/>
            </div>
            <div className="col lg-6 md-12 sm-12">
               <div className="row">
                  <div className="col lg-6 md-6 sm-12">
                     <FeaturedProduct data={sectionData[1]}/>
                     <FeaturedProduct data={sectionData[2]}/>
                  </div>
                  <div className="col lg-6 md-6 sm-12">
                     <FeaturedProduct data={sectionData[3]}/>
                     <FeaturedProduct data={sectionData[4]}/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeaturedProducts