import { saveLogin } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import Axios from "Lib/Axios/axios";
import React from "react";
import { useState } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { Input } from "../../../Atoms/Auth/Input/Input";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import styles from "./LoginForm.module.css";
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = () => {
    setLoading(true);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          let { user } = result.data;
          if (user.cID && user.name && user.token) {
            const alertID = StatusAlertService.showSuccess(
              "Signed in successfully"
            );
            // console.log(alertID);

            saveLogin({
              cID: user.cID,
              companyName: user.companyName,
              companyFullName: user.companyFullName,
              name: user.name,
              picture: user.picture,
              email: user.email,
              token: user.token,
              operatorID: user.operatorID || "",
              isCompany: user.isCompany || false,
              logged: true,
            });
            window.location = `${window.location.protocol}//${window.location.host}`;
          }
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        const alertID = StatusAlertService.showError(
          handleError(e) || "An error came up, please try again"
        );
        // console.log(alertID);
        setLoading(false);
      });
  };
  return (
    <div className={styles.LoginFormWrapper}>
      <StatusAlert />
      <h1 className={styles.heading}>Login here...</h1>
      <InputWrapper
        id="email"
        labelText="Email"
        inputType="email"
        inputPlaceholder="Enter Your Email"
        InputWidth="100%"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWrapper
        id="password"
        labelText="Password"
        inputType="password"
        inputPlaceholder="Enter Your Password"
        InputWidth="100%"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        loading={loading}
        onClick={signIn}
        text="Login"
        style={{ marginTop: 20 }}
      />

      <span className={styles.helpingMessage}>New here?</span>

      <Button
        link="/auth/register"
        text="Register"
        type="link"
        outline={true}
      />
    </div>
  );
};
