"use client";

import {
   ReactNode,
   useState,
   useEffect,
   createContext,
   useContext,
   Dispatch,
   SetStateAction
} from "react";

import type { User } from "@/shared/types/entities";
import BaseAPI from "@/shared/api";

type CurrentUser = User | undefined;

type FirebaseUserContextType = {
   user: CurrentUser,
   setUser: Dispatch<SetStateAction<CurrentUser>>
} | null;

type SessionCheckResponse = {
   authenticated: boolean;
   user?: User;
};

const FirebaseUserContext = createContext<FirebaseUserContextType>(null);

export default function FirebaseUserProvider({
   children
}: {
   children: ReactNode;
}) {
   const [user, setUser] = useState<User>();

   useEffect(() => {
      (async () => {
         try {
            const { authenticated, user } = await BaseAPI.get<SessionCheckResponse>("/check-session");
            if (!authenticated || !user) return;
            setUser(user);
         } catch (err) {
            console.error("Error occurred when checking session");
         }
      })();
   }, []);

   return (
      <FirebaseUserContext.Provider value={{ user, setUser }}>
         {children}
      </FirebaseUserContext.Provider>
   );
};

export const useFirebaseUser = () => {
   const ctx = useContext(FirebaseUserContext);
   if (ctx === undefined) {
      throw new Error(
         "useFirebaseUser must be used within a FirebaseUserProvider"
      );
   }
   return ctx;
};
