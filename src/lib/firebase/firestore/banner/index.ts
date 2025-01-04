import { fetchDocs } from "..";
import { firestoreClient } from "../../configs/client";
import type { Firestore } from "firebase/firestore";
import type { CollectionBanner } from "./types";
import collections from "../collections";

export const getCollectionBanners = async (
   firestore: Firestore = firestoreClient
): Promise<string[]> => {
   const key = "collection-banners";
   const banners = (await fetchDocs(
      { collectionName: collections.BANNERS },
      firestore
   )) as CollectionBanner[];

   return banners
      .filter(b => b.slug.substring(0, b.slug.length - 2) === key)
      .sort((b1, b2) => {
         // format of b1.slug is `collection-banners-[index]`
         const b1Index = Number(b1.slug.at(-1));
         const b2Index = Number(b2.slug.at(-1));
         return b1Index - b2Index;
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
