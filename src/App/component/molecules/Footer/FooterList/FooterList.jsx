import React from "react";
import { Link } from "react-router-dom";
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
              {EachItem.type == "listItems" ? (
                <Link
                  to={EachItem.url}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  {EachItem.text}
                </Link>
              ) : (
                <>{EachItem.text}</>
              )}
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
