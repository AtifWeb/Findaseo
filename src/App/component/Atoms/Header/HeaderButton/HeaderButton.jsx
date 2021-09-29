import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderButton.module.css";
export const HeaderButton = ({ text, buttonType, url }) => {
  return (
    <Link
      to={url}
      className={`${buttonType == "outline" ? styles.Outline : styles.Solid} ${
        styles.button
      }`}
    >
      {text}
    </Link>
  );
};
