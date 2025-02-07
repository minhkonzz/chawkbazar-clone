import { useContext, type Context } from "react";

const context = <T>(context: Context<T>, errMessage: string) => () => {
   const ctx = useContext(context);
   if (ctx === undefined) {
      throw new Error(errMessage);
   }
   return ctx;
}

export default context
