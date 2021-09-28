import React from "react";
import { LoginForm } from "../../../../../component/organisms/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../../../component/organisms/Auth/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

export const Register = () => {
  return (
    <div className={`${styles.LoginWrapper} w-1200`}>
      <div className={styles.logo}>
        <h3>Logo</h3>
      </div>
      <RegisterForm />
    </div>
  );
};
