import React, { useEffect, useState } from "react";
import { Fields } from "../../../../../helpers/constants/RegisterFormFeilds";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import { HandleNextStep } from "./events/HandleStep";
import styles from "./Register.module.css";
export const RegisterForm = () => {
  const [Step, setStep] = useState([]);
  useEffect(() => {
    setStep(Fields[0]);
  }, []);

  return (
    <div className={styles.RegisterForm}>
      <h2 className={styles.heading}>Start Your Registration</h2>
      <div className={styles.FeildsWrapper}>
        {Step.map((feild) => (
          <>
            {feild.object == "InputWrapper" && (
              <InputWrapper
                id={feild.id}
                labelText={feild.label}
                inputType={feild.inputType}
                inputPlaceholder={feild.inputPlaceholder}
                InputWidth="100%"
              />
            )}

            {feild.object == "button" && (
              <Button text={feild.text} style={{ marginTop: 20 }} />
            )}
          </>
        ))}
      </div>

      <Button
        ext_class="next_button"
        text="Next"
        style={{ marginTop: 20 }}
        onClick={(e) => HandleNextStep(setStep, Fields)}
      />
    </div>
  );
};
