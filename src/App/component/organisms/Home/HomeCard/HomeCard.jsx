import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeCard.module.css";
export const HomeCard = ({ title, desc, largeImg, img = null }) => {
  return (
    <div className={styles.HomeCard}>
      <div className={styles.top}>
        <img src={largeImg} alt="" className={styles.topImg} />
      </div>
      <div className={styles.body}>
        <img src={img} alt="" className={styles.frontImg} />
        <div className={styles.presentation}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.para}>{desc}</p>

          <Link to="/" className={styles.learn_more}>
            LEARN MORE
          </Link>
        </div>
      </div>
    </div>
  );
};
