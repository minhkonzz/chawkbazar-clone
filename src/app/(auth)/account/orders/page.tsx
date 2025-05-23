import { NextLink } from "@/configs/imports-wrapper";
import { getUserOrders } from "@/lib/firebase/firestore/order";
import { isEmptyArray } from "@/helpers/array";
import type { OrderListItem } from "@/types";
import styles from "./page.module.css";

import {
   useFirestoreServer,
   useAuthenticatedUser
 } from "@/lib/firebase/configs/server";

const _mockTableHead = ["Order", "Date", "Status", "Total", "Actions"];

export default async function AccountOrders() {
  const firestoreServer = useFirestoreServer();
  const user = await useAuthenticatedUser();
  const orders = await getUserOrders(user!.uid, firestoreServer);

  return (
    (!isEmptyArray(orders) && (
      <table className="w-100pc">
        <thead className={styles.thead}>
          <tr>
            {_mockTableHead.map((e, i: number) => (
              <th key={i} className={styles.th}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {orders.map((e: OrderListItem, i: number) => {
            const values = [
              e.date,
              e.state,
              `$${e.total} for ${e.totalItems} items`
            ];
            return (
              <tr key={e.id} className={styles.row}>
                <td className={styles.cell}>#{i + 1}</td>
                {values.map((v: string, _i: number) => (
                  <td key={_i} className={styles.cell}>
                    {v}
                  </td>
                ))}
                <td className={styles.cell}>
                  <NextLink href={`/orders/${e.id}`} className={styles.btn}>
                    View
                  </NextLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )) || <p>No data found</p>
  );
}
