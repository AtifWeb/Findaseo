import React from "react";
import { UsePavelifyLink } from "../../../Atoms/UsePavelifyLink/UsePavelifyLink";
import { HomeEmaiSender } from "../../../molecules/Home/HomeEmaiSender/HomeEmaiSender";
import styles from "./HomeContactBanner.module.css";
export const HomeContactBanner = () => {
  return (
    <div className={styles.HomeContactBanner}>
      <div className={`w-1200 ${styles.HomeContactBannerContent}`}>
        <h1 className={styles.heading}>
          Start Converting Your Website Traffic Now
        </h1>
        <p>No Credit Card Required. Pavelify is Completely Free.</p>
        <UsePavelifyLink
          text="Use Pavelify for Free"
          style={{ width: "30%", backgroundColor: "#0F295C", color: "#fff" }}
        />
      </div>
    </div>
  );
};
