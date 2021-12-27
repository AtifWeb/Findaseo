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
        secondpara='Thank you for choosing to be part of our community at Pavelify Inc, doing business as Pavelify ("Pavelify," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at hello@pavelify.help.'
        thirdpara="By using our website, you consent to the data gathering practices used anywhere in the website."
      />

      <PrivacyPolicyNotes />
    </FrontPageLayout>
  );
};
