import React from "react";
import styles from "./SelecTimeArea.module.css";
import { days } from "./event/days";
import { useHistory } from "react-router";
export const SelecTimeArea = () => {
  const history = useHistory();
  const RemovePopUp = (e) => {
    history.push("/plus/Calender/Confirm");
  };

  return (
    <div className={styles.SelecTimeArea}>
      <h2>Select time:</h2>

      <div className={styles.days}>
        {days.map((day) => (
          <div className={`${styles.day} days`} onClick={RemovePopUp}>
            <p style={{ pointerEvents: "none" }}>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
