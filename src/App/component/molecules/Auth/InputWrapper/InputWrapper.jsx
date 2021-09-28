import React from "react";
import { Input } from "../../../Atoms/Auth/Input/Input";
import styles from "./InputWrapper.module.css";
export const InputWrapper = ({
  id,
  labelText,
  inputType,
  inputPlaceholder,
  InputWidth,
  style,
  inputStyle = null,
}) => {
  return (
    <div className={styles.InputWrapper} style={style}>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <Input
        id={id}
        type={inputType}
        placeholder={inputPlaceholder}
        width={InputWidth}
      />
    </div>
  );
};
