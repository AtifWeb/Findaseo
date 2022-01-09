import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";

const Notifications = () => {
  const [notifications, setNotifications] = useState({});
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
            setNotifications(result.data.configuration?.notifications);
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
      notifications &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/save`,
        data: {
          cID: user?.cID,
          configuration: {
            notifications,
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

  const onChange = (e) => {
    const { checked, id } = e.target;
    setNotifications((n) => ({ ...n, [id]: checked }));
  };

  return (
    <div className="right-side account-right-side notification-right-side">
      <StatusAlert />
      <h2 className="special-h2">
        <i className="fas fa-bell"></i>Notifications
      </h2>

      <form action="">
        <div className="input-wrapper">
          <label htmlFor="incomingVisitor">Incoming Visitor</label>{" "}
          <input
            className="me-2"
            id="incomingVisitor"
            checked={notifications?.incomingVisitor}
            type="checkbox"
            style={{ width: "20px" }}
            onChange={onChange}
          />
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="newMessage">New Message</label>{" "}
          <input
            className="me-2"
            id="newMessage"
            checked={notifications?.newMessage}
            type="checkbox"
            style={{ width: "20px" }}
            onChange={onChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="newTicket">New Ticket</label>{" "}
          <input
            className="me-2"
            id="newTicket"
            checked={notifications?.newTicket}
            type="checkbox"
            style={{ width: "20px" }}
            onChange={onChange}
          />
        </div>
        <h2>
          <i className="fas fa-envelope"></i> Send Email Notifications
        </h2>
        <div className="input-wrapper">
          <label htmlFor="assignChat">Assign Chat</label>
          <input
            className="me-2"
            id="assignChat"
            checked={notifications?.assignChat}
            type="checkbox"
            style={{ width: "20px" }}
            onChange={onChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="newEventSchedule">New Event Schedule</label>
          <input
            className="me-2"
            id="newEventSchedule"
            type="checkbox"
            checked={notifications?.newEventSchedule}
            style={{ width: "20px" }}
            onChange={onChange}
          />
        </div>
        <button
          type="button"
          onClick={submitConfiguration}
          className="save-button cursor-pointer ms-4 mt-5"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Notifications;
