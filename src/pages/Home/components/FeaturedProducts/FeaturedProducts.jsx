import './FeaturedProducts.css'
import FeaturedProduct from './FeaturedProduct'

const FeaturedProducts = () => {
   return (
      <div className="row">
         <div className="col lg-6 md-12 sm-12">
            <FeaturedProduct />
         </div>
         <div className="col lg-6 md-12 sm-12">
            <div className="row">
               <div className="col lg-6 md-6 sm-6">
                  <FeaturedProduct />
                  <FeaturedProduct />
               </div>
               <div className="col lg-6 md-6 sm-6">
                  <FeaturedProduct />
                  <FeaturedProduct />
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeaturedProducts