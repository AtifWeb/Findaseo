import React from "react";
import styles from "./SelecTimeArea.module.css";
import { days } from "./event/days";
export const SelecTimeArea = () => {
  const RemovePopUp = (e) => {
    e.preventDefault();
    document.querySelectorAll(".days").forEach((Each) => {
      Each.style.background = "#fff";
      Each.style.color = "#333";
    });
    e.target.style.background = "#12205B";
    e.target.style.color = "#fff";
    document.querySelector(".popup-calender").style.display = "flex";
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
