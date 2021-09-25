import React from "react";
import { HomeCard } from "../../../organisms/Home/HomeCard/HomeCard";
import styles from "./HomeWebsiteService.module.css";
export const HomeWebsiteService = () => {
  return (
    <div className={` ${styles.HomeWebsiteService}`}>
      <div className={`w-1200 ${styles.content}`}>
        <h1 className={styles.MainHeading}>
          Convert More Website Visitors into Paying Customers in Record Time
        </h1>
        <p className={styles.para}>
          Allow your customers to communicate with your business real time while
          browsing your website, on Messenger, Instagram, or email and chat with
          them from one platform. No need to switch between different tabs.
        </p>

        <div className={styles.CardsWrapper}>
          <HomeCard
            LargeText="B"
            bgcolor="#FFC961"
            title="Business Messenger"
            desc="Allow your customers to communicate with your business real time while browsing your website, on Messenger, Instagram, or email and chat with them from one platform. No need to switch between different tabs."
          />
          <HomeCard
            LargeText="S"
            bgcolor="#3C89FF"
            title="Stay Organized"
            desc="Manage your customers queries and solve their problems in real time while staying organized with Knowledge base help center. Give your team what they need to stay efficient. Automate your support workflow.

"
          />
          <HomeCard
            LargeText="C"
            bgcolor="#2F2959"
            title="Convert More Business"
            desc="Allow your customers the flexibility of scheduling phone call, zoom, Google meet or Microsoft live conversations with your business. Send appointment booking links, or embed on your website."
          />
          <HomeCard
            LargeText="R"
            bgcolor="#13225F"
            title="Real Time Analytics"
            desc="See real time visitors lists on your website. Know where they are coming from and their interaction history across your website. Personalize your messaging."
          />
        </div>
      </div>
    </div>
  );
};
