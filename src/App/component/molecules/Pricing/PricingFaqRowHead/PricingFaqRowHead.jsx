import React from "react";
import styles from "./PricingFaqRowHead.module.css";
export const PricingFaqRowHead = ({ question }) => {
  return (
    <div className={styles.head}>
      <h3 className={styles.question}>{question}</h3>
      <div className={styles.dropdown}>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
  );
};
