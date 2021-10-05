import React from "react";
import profileImage from "../../../../../Assets/img/msg4.png";
import styles from "./PeronMettingArea.module.css";
export const PeronMettingArea = () => {
  return (
    <div className={`${styles.PeronMettingArea} `}>
      <div className={styles.profile}>
        <img src={profileImage} alt="" className={styles.Img} />
        <p className={styles.para}>Atif Asim</p>
      </div>
      <h2 className={styles.heading}>15 Minute Meeting</h2>
      <p className={styles.time}>15 minutes</p>
    </div>
  );
};
