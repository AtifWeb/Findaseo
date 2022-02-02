import React, { useState } from "react";
import { PricingFaqRowHead } from "../../../molecules/Pricing/PricingFaqRowHead/PricingFaqRowHead";
import styles from "./PricingFaqRow.module.css";
export const PricingFaqRow = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const HandleShow = (e) => {
    setShow(!show);
  };
  return (
    <div className={styles.PricingFaqRow}>
      <PricingFaqRowHead question={question} HandleShow={HandleShow} />
      {show && <p className={styles.answer}>{answer}</p>}
    </div>
  );
};
