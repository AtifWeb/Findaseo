import React from "react";
import { CollapseAbleLiveChat } from "../../organisms/LiveChat/CollapseAbleLiveChat";
import styles from "./LiveChat.module.css";
import burger from "../../../../Assets/img/burger.png";
import { HandleBotDisplay } from "./events/HandleBotDisplay";
export const LiveChat = () => {
  return (
    <div className={styles.LiveChat}>
      <CollapseAbleLiveChat />

      <button
        className={styles.button}
        onClick={HandleBotDisplay}
        onTouchStart={HandleBotDisplay}
      >
        <img src={burger} alt="" />
      </button>
    </div>
  );
};
