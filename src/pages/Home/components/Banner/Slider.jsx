import { useState } from 'react'

const sliderImages = [
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-1.jpg&w=1920&q=100",
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-2.jpg&w=1920&q=100",
  "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-3.jpg&w=1920&q=100"
];

const Slider = () => {

  const [ currentIndex, setCurrentIndex ] = useState(0)

  return (
    <div className="row">
      <div className="col lg-12 md-12 sm-12">
        <div className="slider">
          {sliderImages.map((slide, index) =>
            <img
              alt="slide_img"
              key={index}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 10 : -10,
                transform: index === currentIndex ? "scale(1, 1)" : "scale(0.4, 0.4)"
              }}
              src={slide}
            />)
          }
          <div className="nav-btns">
            {sliderImages.map((slide, index) => 
              <button
                onClick={() => setCurrentIndex(index)}
                className={`nav-btn ${index === currentIndex ? "bg-black" : "bg-white"}`}
              />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider