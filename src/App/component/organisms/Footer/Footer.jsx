import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

import styles from "./Footer.module.css";
import { FooterWrapperNav } from "./FooterWrapperNav";
export const Footer = ({ FooterOptions }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={styles.Footer}>
      <FooterWrapperNav FooterOptions={FooterOptions} />
    </div>
  );
};
