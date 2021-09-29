import React from "react";
import { HeaderButton } from "../../../Atoms/Header/HeaderButton/HeaderButton";
import { HeaderItem } from "../../../Atoms/Header/HeaderItem/HeaderItem";
import styles from "./HeaderNavItemWrapper.module.css";
import "./HeaderNavItemWrapper.css";
export const HeaderNavItemWrapper = ({ headerOptions, activeLink }) => {
  return (
    <div className={`${styles.HeaderNavItemWrapper} headerNav`}>
      {headerOptions.map((EachOption) =>
        EachOption.type == null ? (
          EachOption.name == activeLink ? (
            <HeaderItem
              text={EachOption.name}
              url={EachOption.url}
              className="active"
            />
          ) : (
            <HeaderItem text={EachOption.name} url={EachOption.url} />
          )
        ) : (
          <HeaderButton
            buttonType={EachOption.buttonType}
            text={EachOption.name}
            url={EachOption.url}
          />
        )
      )}
    </div>
  );
};
