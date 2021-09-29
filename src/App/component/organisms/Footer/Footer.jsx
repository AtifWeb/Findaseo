import React from "react";

import styles from "./Footer.module.css";
import { FooterWrapperNav } from "./FooterWrapperNav";
export const Footer = ({ FooterOptions }) => {
  return (
    <div className={styles.Footer}>
      <FooterWrapperNav FooterOptions={FooterOptions} />
    </div>
  );
};
