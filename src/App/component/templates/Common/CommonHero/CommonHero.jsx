import React from "react";
import { UsePavelifyLink } from "../../../Atoms/UsePavelifyLink/UsePavelifyLink";
import { HomeEmaiSender } from "../../../molecules/Home/HomeEmaiSender/HomeEmaiSender";
import styles from "./CommonHero.module.css";

export const CommonHero = ({
  mainheading,
  secondpara,
  form = null,
  thirdpara = null,
  fourthpara = null,
  imageSrc,
  style = null,
  width_full = null,
}) => {
  return (
    <div className={`${styles.hero} w-1200`} style={style}>
      <div className={styles.presentation}>
        <h1 className={styles.heading}>{mainheading}</h1>
        <p className={styles.para}>{secondpara}</p>

        {thirdpara != null && <p className={styles.para}>{thirdpara}</p>}

        {fourthpara != null && <p className={styles.para}>{fourthpara}</p>}

        {form !== null && (
          <UsePavelifyLink
            text="Use Pavelify for Free"
            style={{ width: "50%" }}
          />
        )}
      </div>

      <img
        src={imageSrc}
        alt=""
        className={`${styles.pureImage} ${
          width_full != null && styles.full_width
        }`}
      />
    </div>
  );
};
