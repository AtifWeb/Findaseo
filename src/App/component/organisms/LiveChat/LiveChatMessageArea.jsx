import React from "react";
import { TextMessage } from "../../Atoms/LiveChat/TextMessage";
import { Message } from "./helper/Messages";
import SenderImage from "../../../../Assets/img/sender_navy.svg";
import styles from "./LiveChatMessageArea.module.css";

export const LiveChatMessageArea = () => {
  const HandleCovertingScreen = (e) => {
    e.preventDefault();
    document.querySelector("#collpase-area").style.display = "block";
    document.querySelector("#MessageArea").style.display = "none";
  };

  return (
    <div
      className={`${styles.LiveChatMessageArea} collapse-bot `}
      id="MessageArea"
    >
      <div className={styles.top}>
        <div className={styles.CloseIcon} onClick={HandleCovertingScreen}>
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

            <label htmlFor="send" className={styles.LabelWrapper}>
              <img src={SenderImage} alt="" />
            </label>

            <input
              type="submit"
              value=""
              id="send"
              style={{ display: "none" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
