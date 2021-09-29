import React from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./PrivacyPolicy.module.css";

import { PricingCardWrapper } from "../../../../component/templates/Pricing/PricingCardWrapper/PricingCardWrapper";
import { PricingFaq } from "../../../../component/templates/Pricing/PricingFaq/PricingFaq";
import { PricingQuestion } from "../../../../../helpers/constants/PricingQuestions";
import { CommonHero } from "../../../../component/templates/Common/CommonHero/CommonHero";
import { HomeContactBanner } from "../../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
import { PrivacyPolicyNotes } from "../../../../component/templates/PrivacyPolicy/PrivacyPolicyNotes";
export const PrivacyPolicy = () => {
  return (
    <FrontPageLayout>
      <CommonHero
        imageSrc="../../images/privacy.svg"
        mainheading="Privacy Policy"
        secondpara=" We respect your private information hence we want you to fully understand and become aware about our information collection process. This policy and all its clauses are applicable to Pavelify.com"
        thirdpara="By using our website, you consent to the data gathering practices used anywhere in the website."
      />

      <PrivacyPolicyNotes />
    </FrontPageLayout>
  );
};
