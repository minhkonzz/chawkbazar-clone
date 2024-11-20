import dynamic from "next/dynamic";
import type { ReadonlyURLSearchParams } from "next/navigation";

export const transformFilterOptions = (
   searchParams: ReadonlyURLSearchParams
) => {
   const params = Array.from(searchParams.entries());
   return params.reduce((acc: any, cur: any) => {
      const [key, values] = cur;
      if (key === "price") {
         acc[key] = values.split(",").map((e: any) => {
            const [min, max] = e.split("-").map((e: any) => parseFloat(e));
            return { min, max };
         });
      } else {
         acc[key] = cur[1].split(",").map((e: any) => e);
      }
      return acc;
   }, {});
};

export const mergeStyles = (styles: any, classNames: string[] = []) => {
   return classNames.map(className => styles[className]).join(" ");
};

export const clientOnly = (path: string) => {
   return dynamic(() => import(path), { ssr: false });
};
