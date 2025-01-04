"use client";

import {
  type ReactNode as AppComponentsTree,
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  createContext
} from "@/configs/imports-wrapper";

import type { User } from "@/types/entities";
import context from "../use-context-wrapper";
import BaseAPI from "@/api";

type CurrentUser = User | undefined;

type FirebaseUserContextType = {
  loading: boolean;
  user: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser>>;
} | null;

type SessionCheckResponse = {
  authenticated: boolean;
  user?: User;
};

const FirebaseUserContext = createContext<FirebaseUserContextType>(null);

export default function FirebaseUserProvider({
  children
}: {
  children: AppComponentsTree;
}) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { authenticated, user } = await BaseAPI.get<SessionCheckResponse>("/check-session");
        setUser((authenticated && user) || undefined);
        setLoading(false);
      } catch (err) {
        console.error("Error occurred when checking session");
      }
    })();
  }, []);

  return (
    <FirebaseUserContext.Provider value={{ loading, user, setUser }}>
      {children}
    </FirebaseUserContext.Provider>
  );
}

export const useFirebaseUser = context(
  FirebaseUserContext,
  "useFirebaseUser must be used within a FirebaseUserProvider"
);
