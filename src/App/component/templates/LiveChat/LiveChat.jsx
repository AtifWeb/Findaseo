import React from "react";
import { CollapseAbleLiveChat } from "../../organisms/LiveChat/CollapseAbleLiveChat";
import styles from "./LiveChat.module.css";
import burger from "../../../../Assets/img/burger.png";
import { HandleBotDisplay } from "./events/HandleBotDisplay";
import { LiveChatMessageArea } from "../../organisms/LiveChat/LiveChatMessageArea";

export const LiveChat = () => {
  return (
    <div className={styles.LiveChat}>
      {" "}
      <CollapseAbleLiveChat />
      <LiveChatMessageArea />
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
