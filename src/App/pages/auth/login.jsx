import React from "react";
import { useEffect, useState } from "react";
import handleError from "App/helpers/handleError";
import { saveLogin } from "App/helpers/auth/index";
// import { useHistory } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import useGetSubdomain from "App/hooks/useGetSubdomain";
import Axios from "Lib/Axios/axios";

function Login(props) {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const subdomain = useGetSubdomain();
  const signIn = () => {
    setLoading(true);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
      data: {
        email,
        password,
        companyName: subdomain,
      },
    })
      .then((result) => {
        setLoading(false);
        console.log(result.data);
        if (result.data.success) {
          let { user } = result.data;
          if (user.cID && user.name && user.token) {
            const alertID = StatusAlertService.showSuccess(
              "Signed in successfully"
            );
            console.log(alertID);
            saveLogin({
              cID: user.cID,
              name: user.name,
              token: user.token,
              logged: true,
            });
            window.location = "/";
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
        console.log(alertID);
        setLoading(false);
      });
  };
  useEffect(() => {});
  return (
    subdomain && (
      <section className="container">
        <StatusAlert />
        <div className="row">
          <div className="col-md-6 offset-md-3 auth-container">
            <div className="card rounded-0 shadow text-white mb-3">
              <div className="card-header bg-primary text-center ">
                {" "}
                Sign In as Operator
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
                    <button
                      type="button"
                      onClick={signIn}
                      text={"Submit"}
                      // loading={loading}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="mt-2">
              Don't have an account?
              <a className="btn btn-link text-decoration-none" href="/register">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  );
}

export default Login;
