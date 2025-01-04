import type { FirestoreQueryDocumentsConfig } from "@/types";
import type { FetchedDoc } from "./types";
import { firestoreClient } from "../configs/client";

import {
  query,
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  limit,
  startAfter,
  and,
  onSnapshot,
  orderBy,
  runTransaction,
  type Firestore,
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  type DocumentData,
  type Transaction
} from "@/configs/imports-wrapper";

const createQuery = (
  {
    collectionName,
    _limit,
    _startAfter,
    _orderBy,
    _filterConstraint
  }: FirestoreQueryDocumentsConfig,
  firestore: Firestore = firestoreClient
) => {
  return query(
    collection(firestore, collectionName), 
    and(...(_filterConstraint ? _filterConstraint : [])),
    ...(_limit ? [limit(_limit)] : []),
    ...(_startAfter ? [startAfter(_startAfter)] : []),
    ...(_orderBy ? [orderBy(..._orderBy)] : [])
  );
}

export const createDocRef = (
  collectionName: string,
  firestore: Firestore = firestoreClient
) => {
  return doc(collection(firestore, collectionName));
};

export const getDocRef = (
  collectionName: string,
  id: string,
  firestore: Firestore = firestoreClient
) => {
  return doc(firestore, collectionName, id);
};

export const fetchDocs = async (
  configs: FirestoreQueryDocumentsConfig,
  firestore: Firestore = firestoreClient
): Promise<FetchedDoc[]> => {
  const q = createQuery(configs, firestore);
  const { docs } = await getDocs(q);
  return docs.map((doc: QueryDocumentSnapshot) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getDocSnapShot = <T extends FetchedDoc>(
  collectionName: string,
  id: string,
  cb: (data: T) => void,
  firestore: Firestore = firestoreClient
) => { 
  const unsub = onSnapshot(
    getDocRef(collectionName, id, firestore), 
    (doc: DocumentSnapshot) => {
      cb({
        ...doc.data(),
        id: doc.id
      } as T);
    }
  );
  return unsub;
};

export const getDocsSnapShot = <T extends FetchedDoc[]>(
  configs: FirestoreQueryDocumentsConfig,
  cb: (data: T) => void,
  firestore: Firestore = firestoreClient
) => {
  let docs: FetchedDoc[] = [];
  const q = createQuery(configs, firestore);
  const unsub = onSnapshot(q, snapshot => {
    docs = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
      id: doc.id
    }));
    cb(docs as T);
  });
  return unsub;
};

export const fetchDoc = async (
  collectionName: string,
  id: string,
  firestore: Firestore = firestoreClient
): Promise<DocumentData | null> => {
  const _doc = await getDoc(getDocRef(collectionName, id, firestore));
  return _doc.exists() ? { ..._doc.data(), id: _doc.id } : null;
};

export const _getDocSnapShot = async (
  collectionName: string,
  id: string, 
  firestore: Firestore = firestoreClient
): Promise<DocumentSnapshot> => {
  return await getDoc(getDocRef(collectionName, id, firestore));
};

export const fetchDocFromReference = async (
  ref: DocumentReference<DocumentData, DocumentData>
): Promise<DocumentData | null> => {
  const _doc = await getDoc(ref);
  return _doc.exists() ? { ..._doc.data(), id: _doc.id } : null;
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
  return await setDoc(getDocRef(collectionName, id, firestore), bodyData, {
    merge: true
  });
};

export const performTransaction = <T>(
  func: (transaction: Transaction) => Promise<T>,
  firestore: Firestore = firestoreClient
) => {
  return runTransaction(firestore, func);
};
