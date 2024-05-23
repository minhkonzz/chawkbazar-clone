"use client";

import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";

const items = ["Item 1", "Item 2", "Item 3", "Item 1", "Item 2", "Item3"];
const MAX_WIDTH: number = 1920;
const TOTAL_SLIDES: number = 6; // Total number of slides including duplicates

export default function () {
  const swiperWrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<number>(0);
  const [currentTranslate, setCurrentTranslate] = useState<number>(0);
  const [prevTranslate, setPrevTranslate] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  let slideWidth = .6 * window.innerWidth; // Adjust according to container width

  useEffect(() => {
    const innerWidth: number = window.innerWidth;
    setInitialPosition(innerWidth)();
    window.addEventListener('resize', setInitialPosition(innerWidth));
    return () => window.removeEventListener('resize', setInitialPosition(innerWidth));
  }, []);

  const setInitialPosition = (innerWidth: number) => {
    return () => {
      slideWidth = Math.min(1920, innerWidth);
      const initialTranslate = -slideWidth * activeIndex + (window.innerWidth - slideWidth) / 2;
      setCurrentTranslate(initialTranslate);
      setPrevTranslate(initialTranslate);
      if (swiperWrapperRef.current) {
        swiperWrapperRef.current.style.transform = `translateX(${initialTranslate}px)`;
      }
    }
  };

  const handleTransitionEnd = () => {
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.transition = 'none';

      if (activeIndex >= TOTAL_SLIDES - 1) {
        setActiveIndex(1);
        const newTranslate = -slideWidth * 1 + (window.innerWidth - slideWidth) / 2;
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        swiperWrapperRef.current.style.transform = `translateX(${newTranslate}px)`;
      }

      if (activeIndex <= 0) {
        setActiveIndex(TOTAL_SLIDES - 2);
        const newTranslate = -slideWidth * (TOTAL_SLIDES - 2) + (window.innerWidth - slideWidth) / 2;
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        swiperWrapperRef.current.style.transform = `translateX(${newTranslate}px)`;
      }
    }
  };

  const setPositionByIndex = () => {
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.transition = 'transform .5s ease';
      const newTranslate = -slideWidth * activeIndex + (window.innerWidth - slideWidth) / 2;
      setCurrentTranslate(newTranslate);
      setPrevTranslate(newTranslate);
      swiperWrapperRef.current.style.transform = `translateX(${newTranslate}px)`;

      swiperWrapperRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }
  };

  const touchStart = (event: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartPos(event.type.includes('mouse') ? (event as React.MouseEvent).pageX : (event as React.TouchEvent).touches[0].clientX);
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.transition = 'none';
    }
    requestAnimationFrame(animation);
  };

  const touchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -slideWidth / 4) setActiveIndex((prev) => prev + 1);
    if (movedBy > slideWidth / 4) setActiveIndex((prev) => prev - 1);

    setPositionByIndex();
  };

  const touchMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (isDragging) {
      const currentPosition = event.type.includes('mouse') ? (event as React.MouseEvent).pageX : (event as React.TouchEvent).touches[0].clientX;
      setCurrentTranslate(prevTranslate + currentPosition - startPos);
      if (swiperWrapperRef.current) {
        swiperWrapperRef.current.style.transform = `translateX(${prevTranslate + currentPosition - startPos}px)`;
      }
    }
  };

  const animation = () => {
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.transform = `translateX(${currentTranslate}px)`;
    }
    if (isDragging) requestAnimationFrame(animation);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        ref={swiperWrapperRef}
        onMouseDown={touchStart}
        onMouseMove={touchMove}
        onMouseUp={touchEnd}
        onMouseLeave={touchEnd}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        { items.map((item, index) => <div key={index} className={styles.item}>{item}</div>) }
      </div>
    </div>
  )
}

/*
   const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const containerWidth = document.querySelector('.swiper-container').clientWidth;
const slideWidth = slides[0].clientWidth;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let activeIndex = 1;

function setInitialPosition() {
  currentTranslate = -slideWidth * activeIndex + (containerWidth - slideWidth) / 2;
  prevTranslate = currentTranslate;
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function updateSlides() {  
  slides.find((slide, index) => index === activeIndex).classList.toggle("active");
}

function setPositionByIndex() {
  swiperWrapper.style.transition = 'transform 0.5s ease';
  currentTranslate = -activeIndex * slideWidth + (containerWidth - slideWidth) / 2;
  prevTranslate = currentTranslate;
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;

  // Reset position without transition after the animation ends
  swiperWrapper.addEventListener('transitionend', handleTransitionEnd);
}

function handleTransitionEnd() {

  if (activeIndex >= slides.length - 2) {
    activeIndex = 1;
  } else if (activeIndex <= 0) {
    activeIndex = slides.length - 3;
  }

  currentTranslate = -activeIndex * slideWidth + (containerWidth - slideWidth) / 2;
  prevTranslate = currentTranslate;
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  swiperWrapper.removeEventListener('transitionend', handleTransitionEnd);
}

function animation() {
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

function touchStart(index) {
  return function(event) {
    isDragging = true;
    startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    swiperWrapper.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -slideWidth / 4) activeIndex += 1;
  if (movedBy > slideWidth / 4) activeIndex -= 1;

  setPositionByIndex();
  updateSlides();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

slides.forEach((slide, index) => {
  slide.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

// Initialize
setInitialPosition();
updateSlides();
*/