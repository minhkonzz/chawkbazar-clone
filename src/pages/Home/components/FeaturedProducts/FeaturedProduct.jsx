const FeaturedProduct = ({ data }) => {
   return (
      <div className="featured-prod w-100pc thin-bd-r">
         <div className="posrel pt-80pc">
            <div className="posab top-0 left-0 bottom-0 right-0">
               <img className="posab pos-center" src={data?.image.thumbnail} alt="prod_img"/>
               <span className="posab top-4pc left-4pc thin-bd-r dark-v">20%</span>
               <div className="name-desc posab bottom-3pc left-4pc">
                  <h4>{data?.name}</h4>
                  <p className="blur">Rolexs powerhouse calibre 3235</p>
               </div>
               <h3 className="posab bottom-3pc right-4pc">{data?.price}</h3>
            </div>
         </div>
      </div>
   )
}

export default FeaturedProduct