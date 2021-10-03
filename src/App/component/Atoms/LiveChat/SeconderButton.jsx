import React from "react";
import styles from "./SeconderButton.module.css";
import SenderImage from "../../../../Assets/img/sender.svg";
import { Link } from "react-router-dom";
export const SenderButton = ({ text, img = null, to = null }) => {
  return (
    <Link className={styles.SeconderButton} to={to}>
      {img ? img : <img src={SenderImage} alt="" />}
      <p className={styles.text}>{text}</p>
    </Link>
  );
};
