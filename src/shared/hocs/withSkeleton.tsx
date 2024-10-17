import { Suspense } from "react";

const withSkeleton = (
   BaseComponent: any,
   Skeleton: any
) => {
   return () => (
      <Suspense fallback={<Skeleton />}>
         <BaseComponent />
      </Suspense> 
   );
};

export default withSkeleton;