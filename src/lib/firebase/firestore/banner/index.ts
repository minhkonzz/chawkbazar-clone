import { fetchDocs } from "..";
import { Firestore } from "firebase/firestore";
import { firestore as firestoreClient } from "../../client";

export const getPromotionBanners = async (
   firestore: Firestore = firestoreClient
) => {
   return await fetchDocs({ collectionName: "promotion-banners" }, firestore);
};

export const getCollectionBanners = async (
   collectionBannerNames: string,
   firestore: Firestore = firestoreClient
) => {
   const groups = await fetchDocs({ collectionName: "collection-banners" }, firestore);
   return groups.filter((g: any) => g.name === collectionBannerNames)[0]
      .data
      .sort((b1: any, b2: any) => b1.pos - b2.pos)
      .map((e: any) => e.storageUrl);
};