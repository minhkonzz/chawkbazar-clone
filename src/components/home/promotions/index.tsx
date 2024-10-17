"use client"

import { useState, useEffect } from "react";
import { isEmptyArray } from "@/shared/helpers/array";
import { getPromotionBanners } from "@/lib/firebase/firestore/banner";
import { env } from "@/configs";
import ReactSimplyCarousel from 'react-simply-carousel';
import Image from "next/image";
import styles from "./styles.module.css";

export default function Promotions() {

   const [activeIndex, setActiveIndex] = useState<number>(0);
   const [banners, setBanners] = useState<string[]>([]);

   useEffect(() => {
      (async () => {
         const _banners = await getPromotionBanners();
         setBanners(_banners.map((b: { url: string }) => b.url));
      })();
   }, []);

   if (isEmptyArray(banners)) return <></>;

   return (
      <section className="home-section">
         <ReactSimplyCarousel
            activeSlideIndex={activeIndex}
            autoplay
            autoplayDelay={8000}
            onRequestChange={setActiveIndex}
            itemsToShow={3}
            itemsToScroll={1}
            speed={800}
            infinite
            centerMode
            preventScrollOnSwipe
            itemsListProps={{ className: styles.items }}>
            {banners.map((b: string, i: number) => 
               <Image
                  key={i}
                  src={`${env.BANNER_IMAGE_STORAGE + b}`}
                  alt={`Promotion Banner ${i + 1}`}
                  width={1252}
                  height={496}
               />
            )}
         </ReactSimplyCarousel>
      </section>
   );
}

