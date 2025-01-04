"use client";

import { useFirebaseUser, useCart } from "@/context";
import Tab from "./item";
import styles from "./style.module.css";

export default function HeaderTabs() {
  const {
    cart: { items }
  } = useCart()!;
  const { user } = useFirebaseUser()!;
  return (
    <ul className={styles.menu}>
      <Tab tabName="Search" href="/catalog" />
      <Tab tabName="Pages" href="#">
        <ul className={`${styles.dropdown} posab`}>
          {user && (
            <li>
              <a href="/account">My Account</a>
            </li>
          )}
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="/policy">Terms & Conditions</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
          {items.length > 0 && (
            <li>
              <a href="/checkout">Checkout</a>
            </li>
          )}
        </ul>
      </Tab>
    </ul>
  );
}
