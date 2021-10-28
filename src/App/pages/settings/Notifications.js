import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";

const Notifications = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
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
            setFrom(result.data.configuration.operatingHours[0]);
            setTo(result.data.configuration.operatingHours[1]);
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
      from &&
      to &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/save`,
        data: {
          cID: user?.cID,
          configuration: {
            operatingHours: [from, to],
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
      <h2>Notifications </h2>

      <div className="body mt-4">
        <div className="wrapper d-flex-align-center">
          <div
            className=" d-flex"
            style={{
              width: "200px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <input
              style={{
                width: "20px",
                height: "20px",
              }}
              type="checkbox"
              placeholder=""
              value={from}
              id="from"
              onChange={(e) => setFrom(e.target.value)}
            />
            <label className="ms-3" htmlFor="from">
              Notify on new visit
            </label>
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

export default Notifications;
