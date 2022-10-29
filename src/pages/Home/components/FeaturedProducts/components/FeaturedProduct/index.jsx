import { useElementSize } from "usehooks-ts"

const FeaturedProduct = ({ largest, data }) => {

   const [ productRef, { width, height }] = useElementSize()

   return (
      <div className="featured-prod w-100pc thin-bd-r" ref={productRef}>
         <div className="posrel pt-80pc">
            <div className="posab top-0 left-0 bottom-0 right-0">
               <img className="posab pos-center" src={data?.image?.thumbnail} alt="prod_img"/>
               <span className="posab top-4pc left-4pc thin-bd-r dark-v" style={{ fontSize: (largest ? 0.018 : 0.035) * width }}>20%</span>
               <div className="name-desc posab bottom-3pc left-4pc">
                  <h4 style={{ fontSize: (largest ? 0.024 : 0.042) * width }} className="fw-600">{data?.name}</h4>
                  <p style={{ fontSize: (largest ? 0.02 : 0.035) * width }} className="blur">Rolexs powerhouse calibre 3235</p>
               </div>
               <h3 style={{ fontSize: (largest ? 0.03 : 0.045) * width }} className="posab bottom-3pc right-4pc">{data?.price}</h3>
            </div>
         </div>
      </div>
   )
}

export default FeaturedProduct