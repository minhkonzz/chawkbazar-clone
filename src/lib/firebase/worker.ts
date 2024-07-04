import firebaseConfig from "./config";

const registerAuthServiceWorker = async () => {
   if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;
      const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
   }
};

export default registerAuthServiceWorker;