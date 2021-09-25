import React from "react";
import { FrontPageLayout } from "../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./HomePage.module.css";
import { ComingSoon } from "../../../component/templates/ComingSoon/ComingSoon";
import { HomeHero } from "../../../component/templates/home/homehero/HomeHero";
import { HomeWebsiteService } from "../../../component/templates/home/HomeWebsiteService/HomeWebsiteService";
import { HomeContactBanner } from "../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";

export const HomePage = () => {
  return (
    <FrontPageLayout>
      {/* home */}
      <HomeHero />

      {/* website service */}
      <HomeWebsiteService />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
