import React from "react";
import { useHistory } from "react-router";
import styles from "./ConfirmationPopUpCalender.module.css";
export const ConfirmationPopUpCalender = () => {
  const history = useHistory();
  const RemovePopUp = (e) => {
    e.preventDefault();
    history.push("/plus/Calender");
  };
  return (
    <div
      className={`${styles.ConfirmationPopUpCalenderWrapper} popup-calender`}
    >
      <div className={`${styles.ConfirmationPopUpCalender} `}>
        <h2 className={styles.heading}>Confirm booking:</h2>

        <p>
          <b>15 Minute Meeting</b> with <b>David Kelly</b>
        </p>
        <div>
          <div className={styles.Close} onClick={RemovePopUp}>
            <i class="fas fa-arrow-left"></i>
          </div>
        </div>
        <ul className={styles.Ul}>
          <li className={styles.Li}>Friday, October 15th, at 9:15 am </li>
          <li className={styles.Li}> America/Los_Angeles</li>

          <li className={styles.Li}>15 minutes</li>
        </ul>

        <form action="" className={styles.form}>
          <div>
            <label htmlFor="Name" className={styles.label}>
              Your Name:
            </label>
            <input type="text" id="Name" className={styles.input} />
          </div>
          <div>
            <label htmlFor="Email" className={styles.label}>
              Your Email:
            </label>
            <input type="email" id="Email" className={styles.input} />
          </div>
          <div className={styles.textareawrapper}>
            <label htmlFor="text_area" className={styles.label}>
              This is a test booking! Here's an example question: Have you told
              a friend about Pavelify yet?
            </label>
            <textarea
              name=""
              id="text_area"
              cols="30"
              rows="10"
              className={styles.textarea}
            ></textarea>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Schedule Meeting</button>
          </div>
        </form>
      </div>
    </div>
  );
};
