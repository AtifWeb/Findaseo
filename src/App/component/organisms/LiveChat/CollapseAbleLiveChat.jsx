import React from "react";
import { HandleBotDisplay } from "../../templates/LiveChat/events/HandleBotDisplay";
import { BookMeeting } from "./BookMeeting/BookMeeting";
import styles from "./CollapseAbleLiveChat.module.css";
import { LiveChatConversation } from "./LiveChatConversation/LiveChatConversation";
import { LiveChatSearch } from "./LiveChatSearch/LiveChatSearch";
export const CollapseAbleLiveChat = () => {
  return (
    <div
      className={`${styles.CollapseAbleLiveChat} collapse-bot`}
      id="collpase-area"
    >
      <div className={styles.top}>
        <div
          className={styles.CloseIcon}
          onClick={HandleBotDisplay}
          onTouchStart={HandleBotDisplay}
        >
          <i class="fas fa-times"></i>
        </div>
        <h1 className={styles.heading}>Hello from Pavelify 👋🏻</h1>
        <p className={styles.para}>
          Our mission is to help and inspire 1 Billion people 🚀 How can we help
          you today?
        </p>
      </div>
      <LiveChatConversation />
      <LiveChatSearch />
      <BookMeeting />
    </div>
  );
};
