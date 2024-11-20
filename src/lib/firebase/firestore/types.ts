import type { DocumentData } from "firebase/firestore";

export type FetchedDocs = Array<DocumentData & { id: string }>;
