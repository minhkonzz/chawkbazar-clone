export { default as NextImage } from "next/image";
export { default as NextLink } from "next/link";
export { default as _dynamic } from "next/dynamic";

export {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useRef,
  forwardRef,
  Suspense,
  createContext,
  type ReactElement,
  type Context,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type DependencyList,
  type ForwardedRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ChangeEvent as ReactChangeEvent,
  type MouseEvent as ReactMouseEvent,
  type FormEventHandler as ReactFormEventHandler
} from "react";

export { 
  type ReadonlyURLSearchParams,
  RedirectType, 
  redirect, 
  useRouter, 
  useSearchParams, 
  usePathname 
} from "next/navigation";

export { 
  NextRequest, 
  NextResponse 
} from "next/server";

export {
  initializeApp,
  initializeServerApp,
  getApps
} from "firebase/app";

export {
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
  startAt,
  and,
  or,
  onSnapshot,
  orderBy,
  runTransaction,
  getFirestore,
  type Timestamp,
  type Firestore,
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  type QueryFilterConstraint,
  type QueryFieldFilterConstraint,
  type QueryCompositeFilterConstraint,
  type DocumentData,
  type Transaction,
  type OrderByDirection
} from "firebase/firestore";

export {
  type User,
  getAuth, 
  setPersistence, 
  inMemoryPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";


