import React from "react";
import { Helmet } from "react-helmet";
import { LoginForm } from "../../../../../component/organisms/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../../../component/organisms/Auth/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

export const Register = () => {
  return (
    <div className={`${styles.LoginWrapper} w-1200`}>
      <Helmet>
        <title>Get Started - Pavelify</title>
      </Helmet>
      <div className={styles.logo}>
        <h3>Logo</h3>
      </div>
      <RegisterForm />
    </div>
  );
};
