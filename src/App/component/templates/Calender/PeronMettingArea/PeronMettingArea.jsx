import capitalize from "helpers/capitalize";
import React from "react";
import profileImage from "../../../../../Assets/img/msg4.png";
import styles from "./PeronMettingArea.module.css";
export const PeronMettingArea = ({
  data: { companyName, calendar, which },
}) => {
  return (
    <div className={`${styles.PeronMettingArea} `}>
      <div className={styles.profile}>
        <div
          className="livechat-tag"
          style={{
            background: calendar?.color || "#2D96D6",
            marginRight: "5px",
            width: "45px",
            height: "45px",
          }}
        >
          {capitalize(companyName)?.slice(0, 1) || 0}
        </div>
        {/* <img src={profileImage} alt="" className={styles.Img} /> */}
        <p className={styles.para}>{capitalize(companyName)}</p>
      </div>
      <h2 className={styles.heading}>{calendar?.name}</h2>
      <p className={styles.time}>{which}</p>
    </div>
  );
};
