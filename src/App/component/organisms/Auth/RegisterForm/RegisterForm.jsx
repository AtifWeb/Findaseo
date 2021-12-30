import React, { useEffect, useState } from "react";
import { Fields } from "../../../../../helpers/constants/RegisterFormFeilds";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import { HandleNextStep } from "./events/HandleStep";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
export const RegisterForm = () => {
  const [Step, setStep] = useState([]);
  useEffect(() => {
    setStep(Fields[0]);
  }, []);

  return (
    <div className={styles.RegisterForm}>
      <div className={styles.progressWrapper}>
        <p>
          Step <span className="step2">1</span> of 3
        </p>
        <span className={styles.progress}>
          <span className={styles.progressInner} id="progress_inner"></span>
        </span>
      </div>
      <h2 className={`${styles.heading} heading-steps`}>
        Try Pavelify 14 days free Trial
      </h2>
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
                style={{ gridColumn: "span 2", marginTop: 0 }}
              />
            )}
            {feild.object == "GridInputWrapper" && (
              <InputWrapper
                id={feild.id}
                labelText={feild.label}
                inputType={feild.inputType}
                inputPlaceholder={feild.inputPlaceholder}
                InputWidth="100%"
                style={{ marginTop: 0 }}
              />
            )}

            {feild.object == "subdomain" && (
              <div
                className={styles.DomainInput}
                style={{ gridColumn: "span 2", marginTop: 0, marginBottom: 20 }}
              >
                <label htmlFor={feild.id}>{feild.label}</label>
                <div className={styles.domainInputWrapper}>
                  <input
                    type="text"
                    placeholder={feild.inputPlaceholder}
                    id={feild.id}
                  />
                  <p>.Pavelify.com</p>
                </div>
              </div>
            )}

            {feild.object == "text" && (
              <p
                style={{
                  gridColumn: "span 2",
                  marginBottom: "0px",
                  textAlign: "center",
                }}
              >
                {feild.text}{" "}
                <Link
                  to="https://pavelify.com/Terms"
                  style={{ color: "#13225f" }}
                >
                  {feild.linkterm}
                </Link>{" "}
                and{" "}
                <Link
                  to="https://pavelify.com/PrivacyPolicy"
                  style={{ color: "#13225f" }}
                >
                  {feild.linkprivacy}
                </Link>
              </p>
            )}

            {/* {feild.object == "radio" && (
              <div style={{ gridColumn: "span 2" }}>
                <h4 className={styles.radioheading}>{feild.heading}</h4>
                <ul>
                  {feild["checkboxes"].map((EachCheckbox) => (
                    <li className={styles.radiolist}>
                      <input
                        type="radio"
                        style={{ marginRight: 10 }}
                        name="solving"
                      />
                      <label htmlFor="">{EachCheckbox}</label>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {feild.object == "button" && (
              <Button
                text={feild.text}
                style={{ gridColumn: "span 2", marginBottom: 0 }}
              />
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
