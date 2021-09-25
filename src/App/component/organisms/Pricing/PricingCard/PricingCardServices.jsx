import React from "react";
import styles from "./PricingCardServices.module.css";
export const PricingCardServices = ({ services }) => {
  return (
    <ul className={styles.PricingCardServices}>
      {services.map((EachService) => (
        <li className={styles.listItem}>{EachService}</li>
      ))}
    </ul>
  );
};
