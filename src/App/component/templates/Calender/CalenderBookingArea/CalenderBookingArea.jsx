import React from "react";
import styles from "./CalenderBookingArea.module.css";
import { CalenderPure } from "./CalenderPure/CalenderPure";
export const CalenderBookingArea = () => {
  return (
    <div className={styles.CalenderBookingArea}>
      <h1 className={styles.heading}>Select date:</h1>

      <CalenderPure />
    </div>
  );
};
