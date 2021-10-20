import { setDate } from "date-fns";
import React from "react";
import styles from "./CalenderBookingArea.module.css";
import { CalenderPure } from "./CalenderPure/CalenderPure";
export const CalenderBookingArea = ({ data }) => {
  return (
    <div className={styles.CalenderBookingArea}>
      <h2 className={styles.heading}>Pick a date:</h2>

      <CalenderPure date={data.date} setDate={data.setDate} />
    </div>
  );
};
