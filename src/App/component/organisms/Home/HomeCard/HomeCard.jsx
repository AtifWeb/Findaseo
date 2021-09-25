import React from "react";
import styles from "./HomeCard.module.css";
export const HomeCard = ({ bgcolor, title, desc, LargeText }) => {
  return (
    <div className={styles.HomeCard}>
      <div className={styles.Top} style={{ background: bgcolor }}>
        <h1 className={styles.LongText}>{LargeText}</h1>
      </div>
      <div className={styles.content}>
        <h1 className={styles.head}>{title}</h1>
        <p className={styles.para}>{desc}</p>
      </div>
    </div>
  );
};
