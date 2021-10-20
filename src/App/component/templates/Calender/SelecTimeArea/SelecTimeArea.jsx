import React from "react";
import styles from "./SelecTimeArea.module.css";
import { days } from "./event/days";
import { useHistory } from "react-router";
import { useState } from "react";
export const SelecTimeArea = ({ data: { times, setTime, time } }) => {
  const history = useHistory();
  const [selected, setSelected] = useState(time);
  const RemovePopUp = (e) => {
    history.push("/plus/Calender/Confirm");
  };

  const selectTime = (day) => {
    setSelected(day);
    setTime(day);
  };

  return (
    <div className={styles.SelecTimeArea}>
      <h2>Select time:</h2>

      <div className={styles.days}>
        {times &&
          times.map((day) => (
            <div
              key={day}
              className={`${styles.day} days ${
                selected === day ? styles.active : ""
              }`}
              onClick={() => selectTime(day)}
            >
              <p style={{ pointerEvents: "none" }}>{day}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
