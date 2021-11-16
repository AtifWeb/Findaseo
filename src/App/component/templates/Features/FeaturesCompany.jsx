import React from "react";
import { Features } from "../../../../helpers/constants/Features";
import { FeatureCard } from "../../organisms/Home/Card/FeatureCard";
import styles from "./Features.module.css";

export const FeaturesCompany = () => {
  return (
    <div className={styles.Features}>
      <div className={`${styles.Content} w-1200`}>
        <div className={styles.featuresWrapper}>
          {Features.map((Each) => (
            <FeatureCard
              img={Each.img}
              title={Each.value}
              largeImg={Each.largeImg}
              desc={Each.desc}
            />
          ))}
        </div>

        {/* <div className={styles.banner}>
          <div className={styles.presentation}>
            <h1 className={styles.heading}>
              Make sure your sales team succeeds.
            </h1>
            <p className={styles.para}>
              Only Salescamp gives you a customizable sales suite to drive
              growth at every stage of the sales cycle.
            </p>
          </div>
          <button className={styles.button}>Get Started for Free</button>
        </div>

        <div className={styles.sales}>
          <h1 className={styles.sales_heading}>
            Unlock your sales productivity
          </h1>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h1 className={styles.heading_card}>6%</h1>
              <h4 className={styles.sub_heading}>INCREASE PRODUCTIVITY</h4>
              <p className={styles.card_para}>Save more hours a week</p>
            </div>{" "}
            <div className={styles.card}>
              <h1 className={styles.heading_card}>38%</h1>
              <h4 className={styles.sub_heading}>INCREASE PRODUCTIVITY</h4>
              <p className={styles.card_para}>Save more hours a week</p>
            </div>{" "}
            <div className={styles.card}>
              <h1 className={styles.heading_card}>25%</h1>
              <h4 className={styles.sub_heading}>INCREASE PRODUCTIVITY</h4>
              <p className={styles.card_para}>Save more hours a week</p>
            </div>{" "}
          </div>
        </div> */}
      </div>
    </div>
  );
};
