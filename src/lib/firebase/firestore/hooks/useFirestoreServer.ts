import { getFirestore } from "firebase/firestore";
import getAuthenticatedAppForUser from "../../server";

export default async function useFirestoreServer() {
   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   return getFirestore(firebaseServerApp);
};
