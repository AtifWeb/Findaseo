import React from "react";
import styles from "./CardReview.module.css";
const CardReview = ({ review, img, name, belowName }) => {
  return (
    <div className={styles.CardReviewWrapper}>
      <div className={styles.CardReview}>
        <p>{review}</p>
        <div className={styles.profile_user}>
          <img src={img} className={styles.user_img} alt="" />
          <div className={styles.profile_name}>
            <h1>{name}</h1>
            <p>{belowName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardReview;
