import { firestoreRef } from "../../../configs/firebase.config"
import { collection, getDocs } from "firebase/firestore"

export const getAllRecords = async(collectionName) => {
    const docs = await getDocs(collection(firestoreRef, collectionName)); 
    console.log(docs);
}