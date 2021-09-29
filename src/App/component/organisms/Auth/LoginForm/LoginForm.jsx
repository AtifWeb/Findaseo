import React from "react";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { Input } from "../../../Atoms/Auth/Input/Input";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import styles from "./LoginForm.module.css";
export const LoginForm = () => {
  return (
    <div className={styles.LoginFormWrapper}>
      <h1 className={styles.heading}>Login here...</h1>
      <InputWrapper
        id="email"
        labelText="Email"
        inputType="email"
        inputPlaceholder="Enter Your Email"
        InputWidth="100%"
      />
      <InputWrapper
        id="password"
        labelText="Password"
        inputType="password"
        inputPlaceholder="Enter Your Password"
        InputWidth="100%"
      />

      <Button text="Login" style={{ marginTop: 20 }} />

      <span className={styles.helpingMessage}>New here?</span>

      <Button text="Register" type="link" outline={true} />
    </div>
  );
};
