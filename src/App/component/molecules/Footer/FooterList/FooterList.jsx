import React from "react";
import { Link } from "react-router-dom";
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
                {EachItem.type === "heading" ? (
                  EachItem.text
                ) : !EachItem.external ? (
                  <Link
                    style={{ color: "white" }}
                    to={{ pathname: EachItem.url }}
                  >
                    {EachItem.text}
                  </Link>
                ) : (
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href={EachItem.url}
                  >
                    {" "}
                    {EachItem.text}
                  </a>
                )}
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
