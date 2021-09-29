import React from "react";
import { Link } from "react-router-dom";
import styles from "./UsePavelifyLink.module.css";
export const UsePavelifyLink = ({ text, style, link }) => {
  return (
    <Link className={styles.UsePavelifyLink} style={style}>
      {text}
    </Link>
  );
};
