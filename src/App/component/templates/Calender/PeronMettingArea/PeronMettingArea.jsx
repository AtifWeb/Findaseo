import React from "react";
import profileImage from "../../../../../Assets/img/msg4.png";
import styles from "./PeronMettingArea.module.css";
export const PeronMettingArea = ({
  data: { companyName, calendar, which },
}) => {
  return (
    <div className={`${styles.PeronMettingArea} `}>
      <div className={styles.profile}>
        <img src={profileImage} alt="" className={styles.Img} />
        <p className={styles.para}>{companyName}</p>
      </div>
      <h2 className={styles.heading}>{calendar?.name}</h2>
      <p className={styles.time}>{which}</p>
    </div>
  );
};
