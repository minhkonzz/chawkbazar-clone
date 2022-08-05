const FeaturedProduct = () => {
   return (
      <div className="featured-prod">
         <img src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F2.png&w=640&q=75" alt="prod_img"/>
         <span>20%</span>
         <div className="name-desc">
            <h4>Nike bag</h4>
            <p className="blur">Rolexs powerhouse calibre 3235</p>
         </div>
         <div className="price">
            <h3>$16.38</h3>
         </div>
      </div>
   )
}

export default FeaturedProduct