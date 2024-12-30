import type { FirestoreQueryDocumentsConfig } from "@/shared/types";
import type { FetchedDocs } from "./types";
import { firestoreClient } from "../configs/client";

import {
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
   and,
   onSnapshot,
   runTransaction,
   type Firestore,
   type DocumentReference,
   type QueryDocumentSnapshot,
   type QueryFilterConstraint,
   type DocumentData,
   Transaction,
} from "firebase/firestore";

export const createDocRef = (
   collectionName: string,
   firestore: Firestore = firestoreClient,
) => {
   return doc(collection(firestore, collectionName));
}

export const getDocRef = (
   collectionName: string,
   id: string,
   firestore: Firestore = firestoreClient,
) => {
   return doc(firestore, collectionName, id);
}

export const fetchDocs = async (
   {
      collectionName,
      _limit,
      _startAfter,
      _where
   }: FirestoreQueryDocumentsConfig,
   firestore: Firestore = firestoreClient
): Promise<FetchedDocs> => {
   const q = query(
      ...[
         collection(firestore, collectionName),
         ...(_limit ? [limit(_limit)] : []),
         ...(_startAfter ? [startAfter(_startAfter)] : []),
         ...(_where ? [where(..._where)] : [])
      ]
   )
   const { docs } = await getDocs(q);
   return docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
      id: doc.id
   }));
};

export const getDocsSnapShot = <T extends FetchedDocs>(
   {
      collectionName,
      _limit,
      _startAfter,
      _where
   }: FirestoreQueryDocumentsConfig,
   cb: (data: T) => void,
   firestore: Firestore = firestoreClient
) => {
   let docs: FetchedDocs = [];
   const q = query(
      ...[
         collection(firestore, collectionName),
         ...(_limit ? [limit(_limit)] : []),
         ...(_startAfter ? [startAfter(_startAfter)] : []),
         ...(_where ? [where(..._where)] : [])
      ]
   )
   const unsub = onSnapshot(q, snapshot => {
      docs = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
         ...doc.data(),
         id: doc.id
      }))
      cb(docs as T);
   });
   return unsub;
}

export const fetchDoc = async (
   collectionName: string,
   id: string,
   firestore: Firestore = firestoreClient
): Promise<DocumentData | null> => {
   const _doc = await getDoc(getDocRef(collectionName, id, firestore));
   return _doc.exists() ? _doc.data() : null;
};

export const fetchWithCustomQuery = async (
   collectionName: string,
   customQuery: QueryFilterConstraint[],
   firestore: Firestore = firestoreClient
): Promise<FetchedDocs> => {
   const { docs } = await getDocs(
      query(collection(firestore, collectionName), and(...customQuery))
   );
   return docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
      id: doc.id
   }));
};

export const fetchDocFromReference = async (
   ref: DocumentReference<DocumentData, DocumentData>
): Promise<DocumentData | null> => {
   const _doc = await getDoc(ref);
   return _doc.exists() ? _doc.data() : null;
};

export const addNewDoc = async (
   collectionName: string,
   bodyData: Object,
   firestore: Firestore = firestoreClient
): Promise<DocumentReference> => {
   return await addDoc(collection(firestore, collectionName), bodyData);
};

export const upsertDoc = async (
   collectionName: string,
   id: string,
   bodyData: Object,
   firestore: Firestore = firestoreClient
): Promise<void> => {
   return await setDoc(
      getDocRef(collectionName, id, firestore), 
      bodyData, 
      { merge: true }
   );
};

export const performTransaction = <T>(
   func: (transaction: Transaction) => Promise<T>,
   firestore: Firestore = firestoreClient
) => {
   return runTransaction(firestore, func);
};
