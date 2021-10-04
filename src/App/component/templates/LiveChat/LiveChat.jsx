import React from "react";
import { CollapseAbleLiveChat } from "../../organisms/LiveChat/CollapseAbleLiveChat";
import styles from "./LiveChat.module.css";
import burger from "../../../../Assets/img/chat.png";
import { HandleBotDisplay } from "./events/HandleBotDisplay";
import { LiveChatMessageArea } from "../../organisms/LiveChat/LiveChatMessageArea";

export const LiveChat = () => {
  return (
    <div className={styles.LiveChat}>
      {" "}
      <LiveChatMessageArea />
      <CollapseAbleLiveChat />
      <button
        className={styles.button}
        onClick={HandleBotDisplay}
        onTouchStart={HandleBotDisplay}
        id="burgerButton"
      >
        <img src={burger} alt="" className={styles.Img} />
      </button>
    </div>
  );
};
