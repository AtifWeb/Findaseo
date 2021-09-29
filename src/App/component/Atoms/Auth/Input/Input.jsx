import React from "react";
import styles from "./Input.module.css";
export const Input = ({ placeholder, type, width, id }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={styles.Input}
      style={{ width: width }}
    />
  );
};
