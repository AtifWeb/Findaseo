import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
export const Button = ({
  text,
  type = null,
  outline = null,
  style,
  onClick = null,
  ext_class = null,
  loading = false,
  link = "",
}) => {
  return onClick === null ? (
    <button
      className={`${styles.button} ${outline === true && styles.outline} 
      }`}
      style={style}
    >
      {type !== null ? (
        <Link
          to={link}
          className={`${styles.link} ${outline === true && styles.outline}`}
        >
          {text}
        </Link>
      ) : (
        <p style={{ marginBottom: 0 }}>{text}</p>
      )}
    </button>
  ) : (
    <button
      disabled={loading}
      className={`${styles.button} ${outline === true && styles.outline}
      
      ${ext_class !== null && "next_button"}
      
      `}
      style={style}
      onClick={onClick}
    >
      {type !== null ? (
        <Link
          className={`${styles.link} ${outline === true && styles.outline}`}
        >
          {text}
        </Link>
      ) : (
        <p style={{ marginBottom: 0 }}>
          {loading ? <i className="fas fa-spin fa-spinner"></i> : text}
        </p>
      )}
    </button>
  );
};
