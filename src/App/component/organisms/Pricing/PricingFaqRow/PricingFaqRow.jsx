import React from "react";
import { PricingFaqRowHead } from "../../../molecules/Pricing/PricingFaqRowHead/PricingFaqRowHead";
import styles from "./PricingFaqRow.module.css";
export const PricingFaqRow = ({ question, answer }) => {
  return (
    <div className={styles.PricingFaqRow}>
      <PricingFaqRowHead question={question} />
      <p className={styles.answer}>{answer}</p>
    </div>
  );
};
