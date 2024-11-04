// import React, { useState, useEffect } from 'react';
// import './index.css';
// const sliderImages = [
//    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-1.jpg&w=1920&q=100",
//    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-2.jpg&w=1920&q=100",
//    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Fbanner-3.jpg&w=1920&q=100"
// ];

// const Slider = () => {

//   const [ currentIndex, setCurrentIndex ] = useState(0);

//   useEffect(() => {
//     const onNextSlide = () => {
//       if (currentIndex === 2) {
//         setCurrentIndex(0);
//         return;
//       }
//       setCurrentIndex(currentIndex + 1);
//     }
//     const slideTimeout = setInterval(onNextSlide, 6000);
//     return () => clearTimeout(slideTimeout);
//   }, [currentIndex]);

//   return (
//     <div className="home__banner__slider thin-bd-r"> {
//       sliderImages.map((slide, i) =>
//         <img
//           alt="home__banner__img"
//           key={i}
//           style={{
//             opacity: i === currentIndex ? 1 : 0,
//             zIndex: i === currentIndex ? 10 : -10,
//             transform: i === currentIndex ? "scale(1, 1)" : "scale(0.4, 0.4)"
//           }}
//           src={slide}
//         />
//       )}
//     </div>
//   )
// }

// export default Slider;
