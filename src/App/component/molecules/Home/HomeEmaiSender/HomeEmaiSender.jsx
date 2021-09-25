import React from "react";
import styles from "./HomeEmaiSender.module.css";
export const HomeEmaiSender = ({ widthInput }) => {
  return (
    <>
      <form action="" style={{ width: widthInput }} className={styles.Form}>
        <div className={styles.InputWrapper}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Enter Email Address"
          />
          <button className={styles.SubmitButton}>Submit</button>
        </div>
      </form>
      <small className={styles.small}>
        No Credit Card Required, Easy Setup
      </small>
    </>
  );
};
