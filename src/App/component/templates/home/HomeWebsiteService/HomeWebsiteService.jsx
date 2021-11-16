import React from "react";
import { HomeCard } from "../../../organisms/Home/Card/HomeCard";
import styles from "./HomeWebsiteService.module.css";
export const HomeWebsiteService = () => {
  return (
    <div className={` ${styles.HomeWebsiteService}`}>
      <div className={`w-1200 ${styles.content}`}>
        <div className={styles.Grid}>
          <div>
            <h1 className={styles.MainHeading}>
              Convert More Website Visitors into Paying Customers in Record Time
            </h1>
            <p className={styles.para}>
              Hit your Sales and revenue goals faster with the all in one
              conversational and conversion platform. Built for customer
              service, Sales and Marketing
            </p>
          </div>
          <img
            src="./images/person.png"
            alt=""
            className={styles.personImage}
          />
        </div>

        <div className={styles.CardsWrapper}>
          <HomeCard
            bgcolor="#fff"
            title="Business Messenger"
            desc="Allow your customers to communicate with your business real time while browsing your website, on Messenger, Instagram, or email and chat with them from one platform. No need to switch between different tabs."
            img="./images/Business Messenger.jpg"
          />
          <HomeCard
            bgcolor="#fff"
            title="Stay Organized"
            desc="Manage your customers queries and solve their problems in real time while staying organized with Knowledge base help center. Give your team what they need to stay efficient. Automate your support workflow."
            img="./images/Stay Organized.png"
          />
          <HomeCard
            bgcolor="#fff"
            title="Convert More Business"
            desc="Allow your customers the flexibility of scheduling phone call, zoom, Google meet or Microsoft live conversations with your business. Send appointment booking links, or embed on your website."
            img="./images/convert_business.jpg"
          />
          {/* <HomeCard
            LargeText="R"
            bgcolor="#13225F"
            title="Real Time Analytics"
            desc="See real time visitors lists on your website. Know where they are coming from and their interaction history across your website. Personalize your messaging."
          /> */}
        </div>
      </div>
    </div>
  );
};
