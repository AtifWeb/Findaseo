import React from "react";
import styles from "./LiveChatSearchPure.module.css";
export const LiveChatSearchPure = () => {
  return (
    <div className={styles.LiveChatSearchPure}>
      <input type="text" placeholder="Search..." className={styles.input} />
      <button className={styles.button}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};
