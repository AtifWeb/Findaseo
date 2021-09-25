import React from "react";
import { LoginForm } from "../../../../../component/organisms/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../../../component/organisms/Auth/RegisterForm/RegisterForm";
import { FrontPageLayout } from "../../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Register.module.css";

export const Register = () => {
  return (
    <FrontPageLayout auth={true}>
      <div className={`${styles.LoginWrapper} w-1200`}>
        <RegisterForm />
      </div>
    </FrontPageLayout>
  );
};
