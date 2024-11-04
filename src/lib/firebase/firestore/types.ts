import { DocumentData } from "firebase/firestore";

export type FetchedDocs = Array<DocumentData & { id: string }>;
