import React from "react";
import { Helmet } from "react-helmet";
import { LoginForm } from "../../../../../component/organisms/Auth/LoginForm/LoginForm";
import { FrontPageLayout } from "../../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <FrontPageLayout auth={true}>
      <Helmet>
        <title>Sign In - Pavelify</title>
      </Helmet>
      <div className={`${styles.LoginWrapper} w-1200`}>
        <LoginForm />

        {/* image */}
        <img src="../../images/login2.svg" alt="" className={styles.Image} />
      </div>
    </FrontPageLayout>
  );
};
