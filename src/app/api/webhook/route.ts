import { env } from "@/configs";
import { stripe } from "@/lib/stripe/config";

export async function POST(req: Request) {
   if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new Response("STRIPE WEBHOOK IS NOT CONFIGURED", { status: 500 });
   }

   const sig = req.headers.get("Stripe-Signature");
   if (!sig) {
      throw new Response("Missing Stripe-Signature header", { status: 401 });
   }

   try {
      const payload = await req.text();
      const event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET!);
      switch (event.type) {
         case "payment_intent.succeeded":
            // Handle successful payment intent
            break;
         // Add more event types as needed
         default:
            console.log(`Unhandled event type: ${event.type}`);
      }
      return new Response("payment-succeeded", { status: 200 });
   } catch (err) {
      return new Response("Invalid signature", { status: 401 });
   }
}