import React from "react";
import styles from "./PricingCardServices.module.css";
export const PricingCardServices = ({ services }) => {
  return (
    <ul className={styles.PricingCardServices}>
      {services.map((EachService) => (
        <li className={styles.listItem}>
          <i class="fas fa-check"></i>
          <p style={{ marginLeft: 10 }}>{EachService}</p>
        </li>
      ))}
    </ul>
  );
};
