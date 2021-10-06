import React from "react";
import styles from "./ConversationMembers.module.css";
export const ConversationMembers = ({ members }) => {
  return (
    <div className={styles.ConversationMembers}>
      {members.map((Member) => (
        <img src={Member} className={styles.img} />
      ))}
    </div>
  );
};
