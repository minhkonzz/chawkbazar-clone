import firebaseConfig from "./config";

const registerAuthServiceWorker = async () => {
   if (!("serviceWorker" in navigator)) return;
   const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
   const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;
   await navigator.serviceWorker.register(serviceWorkerUrl);
};

export default registerAuthServiceWorker;
