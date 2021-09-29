import React from "react";
import { PricingFaqRow } from "../../../organisms/Pricing/PricingFaqRow/PricingFaqRow";

import styles from "./PricingFaq.module.css";
export const PricingFaq = ({ PricingQuestion }) => {
  return (
    <div className={`${styles.PricingFaq} w-1200`}>
      <h1 className={styles.mainheading}>Frequently Asked Questions</h1>
      {PricingQuestion.map((EachQuestsion) => (
        <PricingFaqRow
          question={EachQuestsion.question}
          answer={EachQuestsion.answer}
        />
      ))}
    </div>
  );
};
