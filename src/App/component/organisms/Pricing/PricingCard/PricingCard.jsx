import React from "react";
import { Link } from "react-router-dom";
import styles from "./PricingCard.module.css";
import { PricingCardServices } from "./PricingCardServices";
export const PricingCard = ({
  title,
  price,
  duration,
  buy_now_link,
  free_trail_link,
  services,
  type = null,
}) => {
  return (
    <div className={styles.PricingCard}>
      <h1 className={styles.mainheading}>{title}</h1>
      {type == null && (
        <>
          {" "}
          <p className={styles.price}>{price}</p>
          <small className={styles.duration}>{duration}</small>
          <button className={styles.button}>Buy Now</button>
          <Link className={styles.freeTrailLink} to={free_trail_link}>
            Free Trail
          </Link>
        </>
      )}

      <PricingCardServices services={services} />
    </div>
  );
};
