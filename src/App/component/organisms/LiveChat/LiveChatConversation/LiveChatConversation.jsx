import React from "react";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import { ConversationMembers } from "../../../molecules/LiveChat/ConversationMembers";
import { LiveChatMembers } from "./helper/Member";
import styles from "./LiveChatConversation.module.css";
export const LiveChatConversation = () => {
  const HandleCovertingScreen = (e) => {
    e.preventDefault();
    document.querySelector("#collpase-area").style.display = "none";
    document.querySelector("#MessageArea").style.display = "block";
  };
  return (
    <div className={styles.LiveChatConversation}>
      <h2 className={styles.heading}>Your conversations</h2>
      <ConversationMembers members={LiveChatMembers} />
      <SenderButton
        text="Start New Conversation"
        onClick={HandleCovertingScreen}
      />
    </div>
  );
};
