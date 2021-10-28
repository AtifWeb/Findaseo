import React from "react";
import { PricingCardcontent } from "../../../../../helpers/constants/PricingCards";
import { PricingCard } from "../../../organisms/Pricing/PricingCard/PricingCard";

import styles from "./PricingCardWrapper.module.css";
export const PricingCardWrapper = () => {
  return (
    <div className={`${styles.PricingCardWrapper}`}>
      <div className={`${styles.Content} w-1200`}>
        {PricingCardcontent.map((EachCard, index) => (
          <PricingCard
            key={String(index)}
            title={EachCard.title}
            price={EachCard.price}
            type={EachCard.type != null ? EachCard.type : null}
            duration={EachCard.duration}
            buy_now_link={EachCard.buy_now_link}
            free_trail_link={EachCard.free_trail_link}
            services={EachCard.services}
          />
        ))}
      </div>
    </div>
  );
};
