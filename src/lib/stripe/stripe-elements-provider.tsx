import { useMemo, type ReactNode } from "@/configs/imports-wrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/configs";

export default function StripeElementsProvider({
  children,
  publishKey,
  clientSecret
}: {
  children: ReactNode;
  clientSecret: string;
  publishKey?: string;
}) {
  const stripePublishKey = publishKey || env.STRIPE_PUBLISH_KEY!;
  const stripePromise = useMemo(
    () => loadStripe(stripePublishKey),
    [stripePublishKey]
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
}
