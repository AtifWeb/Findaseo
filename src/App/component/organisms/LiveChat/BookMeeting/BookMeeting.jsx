import React from "react";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import styles from "./BookMeeting.module.css";
import BookMeetingImage from "../../../../../Assets/img/BookMeeting.svg";
export const BookMeeting = () => {
  return (
    <div className={styles.BookMeeting}>
      <h2 className={styles.heading}>Schedule a demo</h2>
      <SenderButton
        to="/plus/Calender"
        text="Book a meeting"
        img={<i class="fas fa-calendar-week"></i>}
      />
    </div>
  );
};
