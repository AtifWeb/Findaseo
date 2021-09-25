import React from "react";
import { Features } from "../../../../helpers/constants/Features";
import { HomeCard } from "../../organisms/Home/HomeCard/HomeCard";
import styles from "./Features.module.css";

export const FeaturesCompany = () => {
  return (
    <div className={styles.Features}>
      <div className={`${styles.Content} w-1200`}>
        <h1 className={styles.FeaturesHeading}>Our Features</h1>

        <div className={styles.featuresWrapper}>
          {Features.map((Each) => (
            <HomeCard
              LargeText={Each.LargeText}
              bgcolor={Each.bgColor}
              title={Each.value}
              desc={Each.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
