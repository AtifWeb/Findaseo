import React from "react";
import { FooterList } from "../../molecules/Footer/FooterList/FooterList";
import styles from "./FooterWrapperNav.module.css";
export const FooterWrapperNav = ({ FooterOptions }) => {
  return (
    <div className={`${styles.FooterWrapperNav} w-1200`}>
      {FooterOptions.map((EachList, index) => (
        <FooterList key={String(index)} EachList={EachList} />
      ))}
    </div>
  );
};
