"use client"

import { 
   ReactNode, 
   Dispatch, 
   useState, 
   useEffect,
   createContext, 
   useContext, 
   SetStateAction
} from "react";

import { getUserMetadata } from "@/lib/firebase/firestore/user";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import registerAuthServiceWorker from "@/lib/firebase/worker";
import firebaseClientApp from "@/lib/firebase/client";

type CurrentUser = {
   user: User,
   metadata: any
} | null;

type FirebaseUserContextType = {
   currentUser: CurrentUser,
   setCurrentUser: Dispatch<SetStateAction<CurrentUser>>
};

const FirebaseUserContext = createContext<FirebaseUserContextType | null>(null);

export default function FirebaseUserProvider({ children }: { children: ReactNode }) {

   const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const auth = getAuth(firebaseClientApp);
      const unsub = onAuthStateChanged(auth, (user: User | null) => {
         if (user) {
            getUserMetadata(user.uid)
               .then((metadata) => setCurrentUser({ user, metadata }))
               .catch((error) => console.error("Error getting user metadata: ", error))
         }
      });

      return () => unsub!();
   }, []);   

   useEffect(() => {
      registerAuthServiceWorker()
         .then(() => setLoading(false))
         .catch((err) => console.error(err.message));
   }, []);

   return !loading && <FirebaseUserContext.Provider value={{ currentUser, setCurrentUser }}>
      { children }
   </FirebaseUserContext.Provider>;
}

export const useFirebaseUserContext = () => useContext(FirebaseUserContext);