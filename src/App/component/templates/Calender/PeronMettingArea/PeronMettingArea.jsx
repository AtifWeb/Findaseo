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
      <p className={styles.desc}>
        This is a test booking page — no meetings will actually happen and they
        are auto-cancelled twice per day. Use your actual email address to test
        see how the invite arrives from TidyCal. It's nice and tidy!
      </p>
    </div>
  );
};
