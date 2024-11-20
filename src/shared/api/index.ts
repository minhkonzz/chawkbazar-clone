import { RequestOptions } from "../interfaces/configs";
import { env } from "@/configs";

export default class BaseAPI {
   static get<T>(path: string, options: RequestOptions = {}): Promise<T> {
      return this.fetchApi("GET", path, options);
   }

   static post<T>(path: string, body: unknown, options: RequestOptions = {}): Promise<T> {
      return this.fetchApi("POST", path, {
         ...options,
         body: JSON.stringify(body)
      });
   }

   static put<T>(path: string, body: unknown, options: RequestOptions = {}): Promise<T> {
      return this.fetchApi("PUT", path, {
         ...options,
         body: JSON.stringify(body)
      });
   }

   static delete<T>(path: string, options: RequestOptions = {}): Promise<T> {
      return this.fetchApi("DELETE", path, options);
   }

   static async fetchApi<T>(
      method: string,
      path: string,
      options: RequestOptions = {}
   ): Promise<T> {
      const response = await fetch(`${env.BASE_URL}/api${path}`, {
         method,
         ...options,
         headers: {
            "Content-Type": "application/json",
           ...options.headers
         }
      });

      if (!response.ok) 
         throw new Error("request failed");

      return response.json() as Promise<T>;
   }
};