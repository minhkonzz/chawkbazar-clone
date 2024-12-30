import { fetchDocs } from "..";
import { firestoreClient } from "../../configs/client";
import type { Firestore } from "firebase/firestore";
import type { CollectionBanner } from "./types";
import collections from "../collections";

// export const getPromotionBanners = async (
//    firestore: Firestore = firestoreClient
// ): Promise<ImageSource[]> => {
//    return (await fetchDocs(
//       { collectionName: collections.PROMOTION_BANNERS },
//       firestore
//    )) as ImageSource[];
// };

export const getCollectionBanners = async (
   firestore: Firestore = firestoreClient
): Promise<string[]> => {
   const banners = (await fetchDocs(
      { 
         collectionName: collections.BANNERS, 
         _where: ["slug", "array-contains", "collection-banners"] 
      },
      firestore
   )) as CollectionBanner[];

   return banners
      .sort((b1, b2) => {
         // format of b1.slug is `collection-banners-[index]`
         const b1Index = Number(b1.slug.at(-1));
         const b2Index = Number(b2.slug.at(-1));
         return b1Index - b2Index
      })
      .map((e: CollectionBanner) => e.image);
};

export const getModernCaptures = async (
   firestore: Firestore = firestoreClient
): Promise<Array<{ id: string, image: string }>> => {
   return (await fetchDocs(
      { collectionName: collections.MODERN_CAPTURES },
      firestore
   )) as Array<{ id: string, image: string }>;
};
