import { fetchDocs } from "..";
import { firestoreClient } from "../../configs/client";
import type { Firestore } from "firebase/firestore";
import type { ImageSource } from "../../storage/types";
import type { CollectionBanner, CollectionBannerGroup } from "./types";
import collections from "../collections";

export const getPromotionBanners = async (
   firestore: Firestore = firestoreClient
): Promise<ImageSource[]> => {
   return (await fetchDocs(
      { collectionName: collections.PROMOTION_BANNERS },
      firestore
   )) as ImageSource[];
};

export const getCollectionBanners = async (
   collectionBannerNames: string,
   firestore: Firestore = firestoreClient
): Promise<string[]> => {
   const groups = (await fetchDocs(
      { collectionName: collections.COLLECTION_BANNERS },
      firestore
   )) as CollectionBannerGroup[];
   return groups
      .filter((g: CollectionBannerGroup) => g.name === collectionBannerNames)[0]
      .data.sort(
         (b1: CollectionBanner, b2: CollectionBanner) => b1.pos - b2.pos
      )
      .map((e: CollectionBanner) => e.url);
};

export const getModernCaptures = async (
   firestore: Firestore = firestoreClient
): Promise<ImageSource[]> => {
   return (await fetchDocs(
      { collectionName: collections.MODERN_CAPTURES },
      firestore
   )) as ImageSource[];
};
