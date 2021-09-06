import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import handleError from "App/helpers/handleError";
// import { saveLogin } from "App/helpers/auth/index";
// import { useHistory } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
// import useGetSubdomain from "App/hooks/useGetSubdomain";

function Register(props) {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  // const subdomain = useGetSubdomain();
  const reg = () => {
    if (!email || !password || !companyName) return;
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/register`,
      data: {
        email,
        password,
        companyName,
      },
    })
      .then((result) => {
        setLoading(false);
        if (result.data.success) {
          const alertID = StatusAlertService.showSuccess(
            "Registration successful"
          );
          console.log(alertID);
          window.location = "/login";
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        const alertID = StatusAlertService.showError(
          handleError(e) || "An error came up, please try again"
        );
        console.log(alertID);
        setLoading(false);
      });
  };
  useEffect(() => {});
  return (
    <section className="container">
      <StatusAlert />
      <div className="row">
        <div className="col-md-6 offset-md-3 auth-container">
          <div className="card rounded-0 shadow text-white mb-3">
            <div className="card-header bg-primary text-center ">
              {" "}
              Company Registration
            </div>
            {props.error ? (
              <p className="alert alert-danger">{props.error}</p>
            ) : null}

            {props.errors &&
              props.errors.map((error, index) => (
                <p key={String(index)} className="alert alert-danger">
                  {error?.msg}
                </p>
              ))}

            <div className="card-body">
              <form action="">
                <div className="">
                  <label htmlFor="email" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    id="companyName"
                    placeholder="e.g Pavelify"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button onClick={reg} loading={loading}>
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="mt-2">
            Already have an account?
            <a className="btn btn-link text-decoration-none" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
