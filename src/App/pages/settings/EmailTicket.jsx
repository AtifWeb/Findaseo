import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";

const EmailTicket = () => {
  const [autoResponse, setAutoResponse] = useState(``);
  const [user] = useState(getUser());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getConfiguration();
  }, []);
  const getConfiguration = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setAutoResponse(result.data.configuration.emailAutoResponse);
            setLoading(false);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const submitConfiguration = () => {
    user &&
      autoResponse &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/save`,
        data: {
          cID: user?.cID,
          configuration: {
            emailAutoResponse: autoResponse,
          },
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            const alertID = StatusAlertService.showSuccess(
              "Settings saved successfully!"
            );
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  return (
    <div className="right-side">
      <StatusAlert />
      <h2>Email Tickets </h2>

      <div className="body mt-4">
        <div className="wrapper d-flex-align-center">
          <label className=" me-3 " htmlFor="auto-response">
            Auto Response:
          </label>
          <div className="right-side mt-1 ">
            <textarea
              style={{
                width: "100%",
                height: "90px",
                border: "1px solid #d7dae9",
                borderRadius: "4px",
                outline: "none",
                padding: "5px 1rem",
                fontFamily: '"DM Sans", sans-serif',
              }}
              type="text"
              placeholder=""
              value={autoResponse}
              id="auto-response"
              onChange={(e) => setAutoResponse(e.target.value)}
            ></textarea>
            <small className="text-muted">
              Use <b>__ticketID__</b> as the ID of the ticket
            </small>
          </div>
        </div>
        <button
          className="btn ms-5 mt-4  mx-auto"
          type="button"
          onClick={submitConfiguration}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmailTicket;
