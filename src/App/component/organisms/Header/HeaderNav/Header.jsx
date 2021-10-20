import React from "react";
import { Link } from "react-router-dom";
import { HeaderNavItemWrapper } from "../../../molecules/Header/HeaderNav/HeaderNavItemWrapper";
import { HandleSidebar } from "./event/HandleSideBar";
import styles from "./Header.module.css";
export const Header = ({ headerOptions, activeLink }) => {
  return (
    <div className={styles.Header}>
      <div className={`${styles.HeaderContent} w-1200`}>
        <h1>
          <Link to="/">
            <img style={{ width: "100px" }} src={"/images/logo.png"} />
          </Link>
        </h1>
        <HeaderNavItemWrapper
          headerOptions={headerOptions}
          activeLink={activeLink}
        />

        <div className={`${styles.burgerIcon}`} onClick={HandleSidebar}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </div>
  );
};
