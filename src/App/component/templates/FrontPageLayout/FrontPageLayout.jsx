import React from "react";
import { FooterOptions } from "../../../../helpers/constants/FooterOptions";
import { HeaderOptions } from "../../../../helpers/constants/headerOptions";
import { Footer } from "../../organisms/Footer/Footer";
import { Header } from "../../organisms/Header/HeaderNav/Header";
import styles from "./FrontPageLayout.module.css";
import "../../../../Assets/styles/FrontPages/Global.css";
export const FrontPageLayout = ({ children, activeLink, auth = null }) => {
  return (
    <div className={styles.FrontPageLayout}>
      {/* header */}

      <Header headerOptions={HeaderOptions} activeLink={activeLink} />

      <div className={`${styles.MainBody} ${auth != null && styles.Auth}`}>
        {children}
      </div>

      {/* footer */}

      <Footer FooterOptions={FooterOptions} />
    </div>
  );
};
