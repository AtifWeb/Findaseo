import React from "react";
import styles from "./TextMessage.module.css";
export const TextMessage = ({ text, my_message = null, primaryColor }) => {
  return (
    <p
      className={styles.TextMessage}
      style={{
        alignSelf: my_message && "flex-end",
        background: my_message && (primaryColor || "#13215E"),
        color: my_message && "#fff",
      }}
    >
      {text}
    </p>
  );
};
