import './Promotions.css'
import { useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const data = [ 
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-1.jpg&w=1200&q=100',
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-2.jpg&w=640&q=100', 
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-3.jpg&w=1200&q=100',
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-1.jpg&w=1200&q=100',
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-2.jpg&w=640&q=100', 
   'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fsmall%2Fbanner-3.jpg&w=1200&q=100'
]

const Promotions = () => {

   const [ focusIndex, setFocusIndex ] = useState(0)
   console.log('render Promotions')

   const settings = {
      lazyLoad: true, 
      centerMode: true,
      centerPadding: 0,
      dots: false,
      infinite: true,
      autoplay: true, 
      autoplaySpeed: 2000,
      speed: 1000,
      initialSlide: 0,
      slidesToShow: 3,
      slidesToScroll: 1,
      cssEase: "linear",
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 740,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
          }
      ],
      beforeChange: (current, next) => setFocusIndex(next),
   }

   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="promotions-wrapper">
            <Slider { ...settings }> {
               data.map((d, index) => {
                  return (
                     <div key={index} className={`promotion ${index === focusIndex ? 'active' : ''}`}>
                        <img className="thin-bd-r" src={d} alt="promo-img" />
                     </div>
                  )
               })}
            </Slider>
         </div>
      </div>
   )
}

export default Promotions