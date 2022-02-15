import React from "react";
import { FrontPageLayout } from "../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./HomePage.module.css";
import { ComingSoon } from "../../../component/templates/ComingSoon/ComingSoon";
import { HomeHero } from "../../../component/templates/home/homehero/HomeHero";
import { HomeWebsiteService } from "../../../component/templates/home/HomeWebsiteService/HomeWebsiteService";
import CustomerReviews from "../../../component/templates/CustomerReviews/CustomerReviews";
import { HomeContactBanner } from "../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
import { CommonHero } from "../../../component/templates/Common/CommonHero/CommonHero";
import { Helmet } from "react-helmet-async";

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
        imageSrc="./images/real_time_analytics.webp"
        mainheading="
Real Time Analytics 
"
        secondpara="See real time visitors lists on your website. Know where they are coming from and their interaction history across your website. Personalize your messaging."
      />

      {/* Reviews Area */}

      <CustomerReviews />

      {/* banner */}
      <HomeContactBanner />
      <Helmet>
        <script>
      {`! function(e, t) {
          e.chatID = "61a68cd2276b4e17ff166ca9";
          var a = t.createElement("script");
          a.type = "text/javascript", a.async = !0, a.src = "http://vcap.me:3000/embed.js";
          var c = t.getElementsByTagName("script")[0];
          c.parentNode.insertBefore(a, c)
          }(window, document)
          `}
        </script>
      </Helmet>
    </FrontPageLayout>
  );
};
