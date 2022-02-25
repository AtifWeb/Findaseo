import { loadAttachment } from "helpers/fileUpload";
import linkify from "helpers/linkify";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "./TextMessage.module.css";
export const TextMessage = ({
  text,
  my_message = null,
  primaryColor,
  attachment,
}) => {
  return (
    <p
      className={styles.TextMessage}
      style={{
        alignSelf: my_message && "flex-end",
        background: my_message && (primaryColor || "#13215E"),
        color: my_message ? "#fff" : "#111",
        wordBreak: "break-word",
      }}
    >
      {ReactHtmlParser(
        attachment ? loadAttachment(text, true) || linkify(text) : linkify(text)
      )}
    </p>
  );
};
