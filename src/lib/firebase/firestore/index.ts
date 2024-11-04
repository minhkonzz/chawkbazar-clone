import { FirestoreQueryDocumentsConfig } from "@/shared/types";
import { firestore as firestoreClient } from "../client";
import { is2DArray } from "@/shared/helpers/array";
import { FetchedDocs } from "./types";

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
   QueryDocumentSnapshot,
   QueryFilterConstraint,
   DocumentData,
   FieldPath,
   WhereFilterOp,
   and
} from "firebase/firestore";

export const fetchDocs = async (
   {
      collectionName,
      _limit,
      _startAfter,
      _where
   }: FirestoreQueryDocumentsConfig,
   firestore: Firestore = firestoreClient
): Promise<FetchedDocs> => {
   const { docs } = await getDocs(
      query(
         ...[
            collection(firestore, collectionName),
            ...(_limit ? [limit(_limit)] : []),
            ...(_startAfter ? [startAfter(_startAfter)] : []),
            ...(_where ? [where(..._where)] : [])
         ]
      )
   );
   return docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
      id: doc.id
   }));
};

export const fetchDoc = async (
   collectionName: string,
   id: string,
   firestore: Firestore = firestoreClient
): Promise<DocumentData | null> => {
   const _doc = await getDoc(doc(firestore, collectionName, id));
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
   return await setDoc(doc(firestore, collectionName, id), bodyData, {
      merge: true
   });
};
