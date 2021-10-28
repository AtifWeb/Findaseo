import React from "react";
import styles from "./FooterList.module.css";
export const FooterList = ({ EachList }) => {
  return (
    <ul className={styles.FooterList}>
      {EachList.map((EachItem, index) => (
        <div key={String(index)}>
          {EachItem.type != "form" &&
            (EachItem.type === "image" ? (
              <img
                style={{ width: "140px", marginTop: "-60px" }}
                src={`images/${EachItem.text}`}
              />
            ) : (
              <li
                className={`${
                  EachItem.type === "heading"
                    ? styles.specialtext
                    : styles.normalText
                }`}
              >
                {EachItem.text}
              </li>
            ))}
          {EachItem.type === "form" && (
            <form className={styles.form}>
              <input
                type="text"
                placeholder={EachItem.text}
                className={styles.input}
              />
              <button className={styles.button}>{EachItem.buttontext}</button>
            </form>
          )}
        </div>
      ))}
    </ul>
  );
};
