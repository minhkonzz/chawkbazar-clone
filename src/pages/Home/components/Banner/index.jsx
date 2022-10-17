import { useState } from 'react'
import './Slider.css'

const sliderImages = [
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-1.jpg&w=1920&q=100",
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-2.jpg&w=1920&q=100",
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-3.jpg&w=1920&q=100"
];

const Slider = () => {

  const [ currentIndex, setCurrentIndex ] = useState(0)

  return (
    <div className="col lg-12 md-12 sm-12">
      <div className="slider d-flex posrel w-100pc o-h thin-bd-r"> {
        sliderImages.map((slide, index) =>
          <img
            className="posab w-100pc h-100pc"
            alt="slide_img"
            key={index}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 10 : -10,
              transform: index === currentIndex ? "scale(1, 1)" : "scale(0.4, 0.4)"
            }}
            src={slide}
          />
        )}
        <div className="nav-btns posab left-50pc z-5 bottom-1r"> {
          sliderImages.map((slide, index) => 
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`nav-btn ${index === currentIndex ? "bg-black" : "bg-white"}`}
            />
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Slider