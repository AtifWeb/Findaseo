import React from "react";
import { Link } from "react-router-dom";
import { LiveChatSearchPure } from "../../../molecules/LiveChat/LiveChatSearchPure";
import styles from "./LiveChatSearch.module.css";
export const LiveChatSearch = () => {
  return (
    <div className={styles.LiveChatSearch}>
      <div className={styles.top}>
        <h5 className={styles.heading}>Find an answer</h5>
        <Link className={styles.link}>Open Help Center</Link>
      </div>

      <LiveChatSearchPure />
    </div>
  );
};
