import React from "react";
import { HomeEmaiSender } from "../../../molecules/Home/HomeEmaiSender/HomeEmaiSender";
import styles from "./HomeContactBanner.module.css";
export const HomeContactBanner = () => {
  return (
    <div className={styles.HomeContactBanner}>
      <div className={`w-1200 ${styles.HomeContactBannerContent}`}>
        <h1 className={styles.heading}>
          Start Converting Your Website Traffic Now
        </h1>
        <HomeEmaiSender widthInput="40%" />
      </div>
    </div>
  );
};
