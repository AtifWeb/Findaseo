import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderItem.module.css";
export const HeaderItem = ({ text, url, className = null }) => {
  return (
    <Link className={`${styles.HeaderItem} `} to={url}>
      {text}
    </Link>
  );
};
