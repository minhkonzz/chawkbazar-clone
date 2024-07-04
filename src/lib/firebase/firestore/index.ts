import { FirestoreQueryDocumentsConfig } from "@/shared/types";

import { 
   Firestore, 
   query, 
   addDoc, 
   collection, 
   getDocs,
   getDoc,
   setDoc,
   doc, 
   where,
   limit, 
   startAfter, 
   DocumentReference,
   DocumentData,
   and
} from "firebase/firestore";

import { firestore as firestoreClient } from "../client";
import { is2DArray } from "@/shared/helpers/array";

export const fetchDocs = async ({
   collectionName,
   _limit,
   _startAfter,
   _where
}: FirestoreQueryDocumentsConfig,
   firestore: Firestore = firestoreClient, 
): Promise<any> => {
   const { docs } = await getDocs(
      query (...[
         collection(firestore, collectionName),
         ...(_limit ? [limit(_limit)] : []),
         ...(_startAfter ? [startAfter(_startAfter)] : []),
         ...(_where ? (is2DArray(_where) ? _where.map((e: [any, any, any]) => where(...e)) : [where(..._where)]) : [])
      ])
   );
   return docs.map((doc: any) => ({...doc.data(), id: doc.id }));
};

export const fetchWithCustomQuery = async (
   collectionName: string,
   customQuery: any,
   firestore: Firestore = firestoreClient
): Promise<any> => {
   const { docs } = await getDocs(
      query (
         collection(firestore, collectionName),
         and(...customQuery)
      )
   );
   return docs.map((doc: any) => ({...doc.data(), id: doc.id }));
};

export const fetchDocFromReference = async (
   ref: DocumentReference<DocumentData, DocumentData>
): Promise<any> => {
   const returnedDoc = await getDoc(ref);
   return returnedDoc.exists() ? returnedDoc.data() : null;
};

export const fetchDoc = async (
   collectionName: string,
   id: string,
   firestore: Firestore = firestoreClient
): Promise<any> => {
   const returnedDoc = await getDoc(doc(firestore, collectionName, id));
   return returnedDoc.exists() ? returnedDoc.data() : null; 
};

export const addNewDoc = async (
   collectionName: string,
   bodyData: any,
   firestore: Firestore = firestoreClient
): Promise<any> => {
   return await addDoc(collection(firestore, collectionName), bodyData);
};

export const upsertDoc = async (
   collectionName: string,
   id: string,
   bodyData: any,
   firestore: Firestore = firestoreClient
): Promise<void> => {
   return await setDoc(
      doc(firestore, collectionName, id),
      bodyData,
      { merge: true }
   );
};