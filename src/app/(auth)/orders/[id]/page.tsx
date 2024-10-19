import { getOrder } from "@/lib/firebase/firestore/order";
import { fixDecimal } from "@/shared/helpers/number";
import { SelectedProduct } from "@/shared/types";
import styles from "./page.module.css";
import Banner from "@/components/banner";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

export default async function AccountOrder({ 
   params
}: { 
   params: { id: string }
}) {
   const firestoreServer = await useFirestoreServer();
   const order = await getOrder(params.id, firestoreServer);

   if (!order) throw new Error("Order not found");
   
   const orderData = [
      { id: "m1", title: "Order number", value: order.id },
      { id: "m2", title: "Date", value: order.date },
      { id: "m3", title: "Email", value: order.email },
      { id: "m4", title: "Total", value: order.subtotal },
      { id: "m5", title: "Payment method", value: order.paymentMethod }
   ];

   return (
      <Banner title="Order">
         <div className="wrapper1920">
            <div className={styles.container}>
               <div className={`${styles.message} d-flex at-center`}>
                  <span className={`${styles.confirmIcWrapper} d-flex at-center jc-center`}>
                     <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 512 512" 
                        className={styles.confirmIc} 
                        height="1em" 
                        width="1em">
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
                     </svg>
                  </span>
                  Thank you. Your order has been received.
               </div>
               <ul className={`${styles.meta} d-flex`}>
                  {orderData.map((e, i: number) => 
                     <li key={`${e.id}-${i}`} className={styles.metaPart}>
                        <h6 className={styles.metaPartTitle}>{e.title}</h6>
                        { e.value }
                     </li>
                  )}
               </ul>
               <div className={styles.detail}>
                  <h2 className={styles.detailHeading}>Order details</h2>
                  <table className={`${styles.ordered} w-100pc`}>
                     <thead>
                        <tr>
                           <th className={styles.head}>Product</th>
                           <th className={styles.head}>Total</th>
                        </tr>
                     </thead>
                     <tbody>
                        {order?.products.map((e: SelectedProduct, i: number) => 
                           <tr key={`${e.id}-${i}`} className={styles.row}>
                              <td className={styles.cell}>{`${e.name} - ${e.selectedColor.value}, ${e.selectedSize.value} * ${e.qty}`}</td>
                              <td className={styles.cell}>{`$${fixDecimal(e.lastPrice * e.qty, 2)}`}</td>
                           </tr>
                        )}
                     </tbody>
                     <tfoot>
                        {[
                           { id: "t1", title: "Subtotal", value: `$${fixDecimal(order.subtotal, 2)}` },
                           { id: "t2", title: "Shipping", value: `$${fixDecimal(order.shipFee, 2)}` },
                           { id: "t3", title: "Tax", value: "$0.00" },
                           { id: "t4", title: "Total", value: `$${fixDecimal(order.total, 2)}` },
                           { id: "t5", title: "Notes", value: `$${order.note}` }
                        ].map((e, i) => 
                           <tr key={i} className={`${styles.row}${!(i % 2) ? " hl" : ""}`}>
                              <td className={styles.cell}>{e.title}</td>
                              <td className={styles.cell}>{e.value}</td>
                           </tr>
                        )}
                     </tfoot>
                  </table>
               </div>
            </div>
         </div>
      </Banner>
   );
};