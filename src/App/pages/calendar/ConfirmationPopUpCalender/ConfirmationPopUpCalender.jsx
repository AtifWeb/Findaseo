import { format } from "date-fns";
import React from "react";
import { useHistory } from "react-router";
import styles from "./ConfirmationPopUpCalender.module.css";
const ConfirmationPopUpCalender = ({ data }) => {
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
          <b>{data?.calendar?.name} </b> with{" "}
          <b>{data?.companyFullName || data?.companyName}</b>
        </p>
        <div>
          <div className={styles.Close} onClick={data.back}>
            <i className="fas fa-arrow-left"></i>
          </div>
        </div>
        <ul className={styles.Ul}>
          <li className={styles.Li}>
            {format(data.date, "PPPP")}, at {data?.time}{" "}
          </li>
          <li className={styles.Li}>
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </li>

          <li className={styles.Li}>{data?.which}</li>
        </ul>

        <form className={styles.form}>
          <div>
            <label htmlFor="Name" className={styles.label}>
              Your Name:
            </label>
            <input
              value={data?.name}
              onChange={(e) => data?.setName(e.target.value)}
              type="text"
              id="Name"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="Email" className={styles.label}>
              Your Email:
            </label>
            <input
              value={data?.email}
              onChange={(e) => data?.setEmail(e.target.value)}
              type="email"
              id="Email"
              className={styles.input}
            />
          </div>
          <div className={styles.textareawrapper}>
            {/* <label htmlFor="text_area" className={styles.label}>
              This is a test booking! Here's an example question: Have you told
              a friend about Pavelify yet?
            </label> */}
            {/* <textarea
              name=""
              id="text_area"
              cols="30"
              rows="10"
              className={styles.textarea}
            ></textarea> */}
            <div>
              <label htmlFor="Phone" className={styles.label}>
                Your Phone:
              </label>
              <input
                value={data?.phone}
                onChange={(e) => data?.setPhone(e.target.value)}
                type="tel"
                id="Phone"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <button
              type="button"
              onClick={data.continue}
              className={styles.button}
              disabled={!data.continue}
            >
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPopUpCalender;
