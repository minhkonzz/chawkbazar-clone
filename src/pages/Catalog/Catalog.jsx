import './Catalog.css'
import Navbar from '../../common/Navbar/Navbar'
import Product from "../../common/Product/type-1/Product"
import Filters from "./components/Filters"
import UserMailGetter from "../../common/UserMailGetter/UserMailGetter"
import Footer from "../../common/Footer/Footer"

const Catalog = () => {
   return (
      <>
         <header>
            <Navbar />
         </header>
         <div className="grid wide" style={{ paddingTop: 120 }}>
            <main>
               <div className="row">
                  <div className="col lg-2-ahalf md-0 sm-0">
                     <Filters />
                  </div>
                  <div className="col lg-9-ahalf md-12 sm-12">
                     <div className="row">
                        <div className="col lg-12 md-12 sm-12">
                           <h2 style={{ fontWeight: '700' }}>Casual wear</h2>
                        </div>
                     </div>
                     <div className="row">
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                        <Product lg={'2-4'} md={4} sm={6}/>
                     </div>
                     <div className="row">
                        <div className="col lg-12 md-12 sm-12 d-flex jc-center at-center">
                           <button className="load-more thin-bd-r">Load more</button>
                        </div>
                     </div>
                  </div>
               </div>
               <UserMailGetter />
            </main>
            <Footer />
         </div>
      </>
   )
}

export default Catalog