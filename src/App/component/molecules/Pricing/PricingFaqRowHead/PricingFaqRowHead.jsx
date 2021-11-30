import React from "react";
import styles from "./PricingFaqRowHead.module.css";
export const PricingFaqRowHead = ({ question, HandleShow }) => {
  return (
    <div className={styles.head} onClick={HandleShow}>
      <h3 className={styles.question}>{question}</h3>
      <div className={styles.dropdown}>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
  );
};
