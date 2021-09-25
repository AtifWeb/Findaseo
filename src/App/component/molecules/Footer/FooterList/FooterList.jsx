import React from "react";
import styles from "./FooterList.module.css";
export const FooterList = ({ EachList }) => {
  return (
    <ul className={styles.FooterList}>
      {EachList.map((EachItem) => (
        <>
          {EachItem.type != "form" && (
            <li
              className={`${
                EachItem.type == "heading"
                  ? styles.specialtext
                  : styles.normalText
              }`}
            >
              {EachItem.text}
            </li>
          )}
          {EachItem.type == "form" && (
            <form className={styles.form}>
              <input
                type="text"
                placeholder={EachItem.text}
                className={styles.input}
              />
              <button className={styles.button}>{EachItem.buttontext}</button>
            </form>
          )}
        </>
      ))}
    </ul>
  );
};
