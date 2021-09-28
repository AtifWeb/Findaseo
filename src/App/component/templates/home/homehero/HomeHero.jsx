import React from "react";
import { UsePavelifyLink } from "../../../Atoms/UsePavelifyLink/UsePavelifyLink";
import { HomeEmaiSender } from "../../../molecules/Home/HomeEmaiSender/HomeEmaiSender";
import styles from "./HomeHero.module.css";
export const HomeHero = () => {
  return (
    <div className={`${styles.hero} w-1200`}>
      <div className={styles.presentation}>
        <h1 className={styles.heading}>
          Customer Support and Conversion Platform For The Modern Business
        </h1>
        <p className={styles.para}>
          Pavelify gives your business sales and customer satisfaction edge over
          your competitors. Yes, Businesses love Pavelify, But Customers love it
          too.
        </p>
        <small className={styles.small}>
          Live chat, Email Ticketing, Appointment Scheduling, Help Center and
          lots more all at once.
        </small>

        <UsePavelifyLink
          text="Use Pavelify for Free"
          style={{ width: "50%" }}
        />

        {/* <HomeEmaiSender widthInput="70%" /> */}
      </div>

      <div className={styles.Image}>
        <img src="../images/homepage.jpg" alt="" className={styles.pureImage} />
      </div>
    </div>
  );
};
