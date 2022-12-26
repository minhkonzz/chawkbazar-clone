import React, { useState, useEffect } from 'react';
import { sliderImages } from './data';
import './index.css';

const Slider = () => {

  const [ currentIndex, setCurrentIndex ] = useState(0);

  useEffect(() => {
    const onNextSlide = () => {
      if (currentIndex === 2) {
        setCurrentIndex(0); 
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
    const slideTimeout = setInterval(onNextSlide, 6000); 
    return () => clearTimeout(slideTimeout); 
  }, [currentIndex]);

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
      </div>
    </div>
  )
}

export default Slider;