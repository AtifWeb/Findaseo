import React from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Careers.module.css";
import { ComingSoon } from "../../../../component/templates/ComingSoon/ComingSoon";
import { CommonHero } from "../../../../component/templates/Common/CommonHero/CommonHero";
import { HomeContactBanner } from "../../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
import { CareersForm } from "../../../../component/templates/Careers/CareersForm/CareersForm";
export const Careers = () => {
  return (
    <FrontPageLayout activeLink="Careers">
      <CommonHero
        imageSrc="../../images/careers.svg"
        mainheading="Careers"
        secondpara=" At pavelify, we have built a working atmosphere that not only allow you to explore your talents but also gives you an opportunity to advance and improve your skills. 

"
        thirdpara="
We are a team that believe in always improving and serving our community exceedingly. In essence, we are always on the look out for talented and motivated professionals to be part of our amazing team.

"
        fourthpara="Send us a message with your areas of expertise by filling the form below. We will get back to you if there is an opening."
      />

      <CareersForm />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
