import React from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Pricing.module.css";
import { ComingSoon } from "../../../../component/templates/ComingSoon/ComingSoon";

import { PricingCardWrapper } from "../../../../component/templates/Pricing/PricingCardWrapper/PricingCardWrapper";
import { PricingFaq } from "../../../../component/templates/Pricing/PricingFaq/PricingFaq";
import { PricingQuestion } from "../../../../../helpers/constants/PricingQuestions";
import { CommonHero } from "../../../../component/templates/Common/CommonHero/CommonHero";
import { HomeContactBanner } from "../../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
export const Pricing = () => {
  return (
    <FrontPageLayout>
      <CommonHero
        imageSrc="../../images/pricing.svg"
        mainheading="Get Started With Our Simplified and unbeatable Pricing Plans"
        secondpara="          Take your customer support to the next level and accelerate your
          business sales and revenue with Paveliy."
        form={true}
      />

      <PricingCardWrapper />

      <PricingFaq PricingQuestion={PricingQuestion} />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
