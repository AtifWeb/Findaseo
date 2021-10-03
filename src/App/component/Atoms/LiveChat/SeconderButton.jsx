import React from "react";
import styles from "./SeconderButton.module.css";
import SenderImage from "../../../../Assets/img/sender.svg";
export const SenderButton = ({ text, img = null }) => {
  return (
    <button className={styles.SeconderButton}>
      {img ? img : <img src={SenderImage} alt="" />}
      <p className={styles.text}>{text}</p>
    </button>
  );
};
