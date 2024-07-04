import firebaseConfig from "./config";
import { env } from "@/configs";

const registerAuthServiceWorker = async () => {
   let unregistered = false;
   const registrations = await navigator.serviceWorker.getRegistrations();
   const worker = registrations.find(registration => registration.scope === env.BASE_URL);
   if (worker) unregistered = await worker.unregister();
   if ("serviceWorker" in navigator && (!worker || (worker && unregistered))) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;
      await navigator.serviceWorker.register(serviceWorkerUrl);
   }
};

export default registerAuthServiceWorker;