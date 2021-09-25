import React from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Features.module.css";
import { ComingSoon } from "../../../../component/templates/ComingSoon/ComingSoon";
import { FeaturesCompany } from "../../../../component/templates/Features/FeaturesCompany";
import { CommonHero } from "../../../../component/templates/Common/CommonHero/CommonHero";
import { HomeContactBanner } from "../../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
export const Features = () => {
  return (
    <FrontPageLayout>
      <CommonHero
        imageSrc="../../images/features.svg"
        mainheading="
The Right Tools to Help Your Business Grow and Succeed. 
"
        secondpara="The complete suite for your customer service solution, higher sales and revenue for your business. "
      />

      <FeaturesCompany />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
