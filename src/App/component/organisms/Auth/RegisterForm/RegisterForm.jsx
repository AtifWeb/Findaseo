import handleError from "App/helpers/handleError";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { Fields } from "../../../../../helpers/constants/RegisterFormFeilds";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import { HandleNextStep } from "./events/HandleStep";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import useGetSubdomain from "App/hooks/useGetSubdomain";
export const RegisterForm = () => {
  const [Step, setStep] = useState([]);
  const [data, setData] = useState({
    cname: "",
    email: "",
    fname: "",
    lname: "",
    password: "",
    phone_number: "",
    radio: "",
    subdomain: "",
    cweb: "",
  });
  const [loading, setLoading] = useState(false);

  const { subdomain, domain } = useGetSubdomain();

  useEffect(() => {
    setStep(Fields[0]);
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.cname
        .replace(/[^-a-zA-Z0-9 ]+/g, "")
        .replace(/\s/g, "-")
        .toLowerCase(),
    }));
  }, [data?.cname]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.subdomain
        .replace(/[^-a-zA-Z0-9 ]+/g, "")
        .replace(/\s/g, "-")
        .toLowerCase(),
    }));
  }, [data?.subdomain]);

  const gotoNext = () => {
    let errorCount = 0;
    for (let step of Step) {
      if (!data[step.id]) {
        errorCount++;
        // @todo match pattern
        document.querySelector(`#${step.id}`).style.borderColor = "red";
        document.querySelector(`#${step.id}-error`).style.display =
          "inline-block";
      } else {
        document.querySelector(`#${step.id}`).style.borderColor = "#ddd";
        document.querySelector(`#${step.id}-error`).style.display = "none";
      }
    }

    if (!errorCount) {
      if (Step[0] && Step[0].id === "cname") {
        reg();
      } else {
        HandleNextStep(setStep, Fields);
      }
    }
  };

  const reg = () => {
    //  if (!email || !password || !companyName) return;
    // return console.log(data);
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/register`,
      data: {
        email: data.email,
        website: data.cweb,
        password: data.password,
        companyName: data.subdomain,
        companyFullName: data.cname,
        name: data.fname + " " + data.lname,
      },
    })
      .then((result) => {
        setLoading(false);
        if (result.data.success) {
          const alertID = StatusAlertService.showSuccess(
            "Registration successful"
          );
          // console.log(alertID);
          window.location = "/";
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
    <div className={styles.RegisterForm}>
      <StatusAlert />
      <div className={styles.progressWrapper}>
        <p>
          Step <span className="step2">1</span> of 3
        </p>
        <span className={styles.progress}>
          <span className={styles.progressInner} id="progress_inner"></span>
        </span>
      </div>
      <h2 className={`${styles.heading} heading-steps`}>
        {/* Use Pavelify 14 days free Trial */}
      </h2>
      <div className={styles.FeildsWrapper}>
        {Step.map((feild) => (
          <>
            {feild.object === "InputWrapper" && (
              <InputWrapper
                id={feild.id}
                labelText={feild.label}
                inputType={feild.inputType}
                inputPlaceholder={feild.inputPlaceholder}
                InputWidth="100%"
                style={{ gridColumn: "span 2", marginTop: 0 }}
                value={data[feild.id]}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, [feild.id]: e.target.value }))
                }
              />
            )}
            {feild.object === "GridInputWrapper" && (
              <InputWrapper
                id={feild.id}
                labelText={feild.label}
                inputType={feild.inputType}
                inputPlaceholder={feild.inputPlaceholder}
                InputWidth="100%"
                style={{ marginTop: 0 }}
                value={data[feild.id]}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, [feild.id]: e.target.value }))
                }
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
                    value={data[feild.id]}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [feild.id]: e.target.value,
                      }))
                    }
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
                <a
                  href={`${window.location.protocol}//${domain}/Terms`}
                  target={"_blank"}
                  style={{ color: "#13225f" }}
                >
                  {feild.linkterm}
                </a>{" "}
                and{" "}
                <a
                  href={`${window.location.protocol}//${domain}/PrivacyPolicy`}
                  target={"_blank"}
                  style={{ color: "#13225f" }}
                >
                  {feild.linkprivacy}
                </a>
              </p>
            )}

            {/* {feild.object === "radio" && (
              <div style={{ gridColumn: "span 2" }}>
                <h4 className={styles.radioheading}>{feild.heading}</h4>

                <ul id="radio">
                  {feild["checkboxes"].map((EachCheckbox, index) => (
                    <li key={String(index)} className={styles.radiolist}>
                      <label htmlFor={EachCheckbox}>
                        <input
                          type="radio"
                          id={EachCheckbox}
                          style={{ marginRight: 10 }}
                          name="solving"
                          value={data[feild.id]}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              [feild.id]: EachCheckbox,
                            }))
                          }
                        />
                        {EachCheckbox}
                      </label>
                    </li>
                  ))}
                </ul>
                <small
                  id={`${feild.id}-error`}
                  style={{ color: "red", display: "none" }}
                >
                  Please select one option
                </small>
              </div>
            )} */}

            {/* {feild.object === "button" && (
              <Button text={feild.text} style={{ gridColumn: "span 2" }} />
            )} */}
          </>
        ))}
      </div>

      <Button
        loading={loading}
        ext_class="next_button"
        text={Step[0] && Step[0].id === "cname" ? "Complete" : "Next"}
        style={{ marginTop: 20 }}
        onClick={gotoNext}
      />
    </div>
  );
};
