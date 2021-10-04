import React from "react";
import { TextMessage } from "../../Atoms/LiveChat/TextMessage";
import { Message } from "./helper/Messages";

import styles from "./LiveChatMessageArea.module.css";

export const LiveChatMessageArea = () => {
  return (
    <div className={`${styles.LiveChatMessageArea} collapse-bot `}>
      <div className={styles.top}>
        <div className={styles.CloseIcon}>
          <i class="fas fa-chevron-left"></i>
        </div>
        <div className={styles.presentation}>
          <h3 className={styles.heading_top}> Pavelify</h3>
          <p className={styles.para_top}>Our mission is to help and i...</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyContent}>
          {Message.map((Message) => (
            <TextMessage text={Message.text} my_message={Message.message} />
          ))}
        </div>
        <form action="" className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Send a message"
              className={styles.input}
            />
            <div className={`${styles.IconWrapper} ${styles.Smile}`}>
              <i class="far fa-smile-wink"></i>
            </div>
            <div className={styles.IconWrapper}>
              <i class="fas fa-paperclip"></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
