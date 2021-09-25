import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
export const Button = ({ text, type = null, outline = null, style }) => {
  return (
    <button
      className={`${styles.button} ${outline == true && styles.outline}`}
      style={style}
    >
      {type !== null ? (
        <Link className={`${styles.link} ${outline == true && styles.outline}`}>
          {text}
        </Link>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};
