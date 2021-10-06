import React from "react";
import styles from "./Input.module.css";
export const Input = ({ placeholder, type, width, id, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={styles.Input}
      style={{ width: width }}
      value={value}
      onChange={onChange}
    />
  );
};
