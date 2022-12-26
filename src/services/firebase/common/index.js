import { firestoreRef } from "../../../configs/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const getAllRecords = async(collectionName) => {
  let res = [];
  const docs = await getDocs(collection(firestoreRef, collectionName)); 
  docs.forEach((doc) => { res = [ ...res, {...doc.data(), id: doc.id } ]});
  return res;
};