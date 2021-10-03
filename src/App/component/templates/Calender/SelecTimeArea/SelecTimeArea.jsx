import React from "react";
import styles from "./SelecTimeArea.module.css";
import { days } from "./event/days";
export const SelecTimeArea = () => {
  return (
    <div className={styles.SelecTimeArea}>
      <h2>Select time:</h2>

      <div className={styles.days}>
        {days.map((day) => (
          <div className={styles.day}>
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
