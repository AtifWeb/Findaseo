import React from "react";
import { FrontPageLayout } from "../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./HomePage.module.css";
import { ComingSoon } from "../../../component/templates/ComingSoon/ComingSoon";
import { HomeHero } from "../../../component/templates/home/homehero/HomeHero";
import { HomeWebsiteService } from "../../../component/templates/home/HomeWebsiteService/HomeWebsiteService";
import CustomerReviews from "../../../component/templates/CustomerReviews/CustomerReviews";
import { HomeContactBanner } from "../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
import { CommonHero } from "../../../component/templates/Common/CommonHero/CommonHero";

export const HomePage = () => {
  return (
    <FrontPageLayout>
      {/* home */}
      <HomeHero />

      {/* website service */}
      <HomeWebsiteService />

      <CommonHero
        width_full={true}
        style={{ margin: "6rem auto" }}
        imageSrc="./images/real_time_analytics.jpg"
        mainheading="
Real Time Analytics 
"
        secondpara="See real time visitors lists on your website. Know where they are coming from and their interaction history across your website. Personalize your messaging."
      />

      {/* Reviews Area */}

      <CustomerReviews />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
