import { Link } from "@material-ui/core";
import { getUser } from "App/helpers/auth";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import Departments from "./settings/Departments";
import LiveChatSettings from "./settings/Livechat";
import EmailTicketSettings from "./settings/EmailTicket";
import OperatingHoursSettings from "./settings/OperatingHours";
import QuickReponseSettings from "./settings/QuickResponse";
import Notifications from "./settings/Notifications";
import Todolist from "./home/Todolist";
import Account from "./settings/Account";
import { Helmet } from "react-helmet-async";
import EmailSetup from "./settings/EmailSetup";
import Integrations from "./settings/Integrations";

function Settings() {
  const params = useParams();
  const history = useHistory();
  const [user] = useState(getUser());

  return (
    <div
      className={`Settings main-wrapper d-flex ${
        params?.channel === "Departments" ? "Contact" : ""
      }`}
    >
      <Helmet>
        <title>Settings - Pavelify</title>
      </Helmet>
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="settings" />

        <div className="body-main-area">
          {/* <h2>Settings</h2> */}
          <div className="body-box">
            <div className="left-side">
              <ul>
                <li className="heading">Channels</li>
                <li className={params?.channel === "LiveChat" ? "active" : ""}>
                  <Link onClick={() => history.push("/settings/LiveChat")}>
                    Live Chats
                  </Link>
                </li>
                <li
                  className={params?.channel === "EmailSetup" ? "active" : ""}
                >
                  <Link onClick={() => history.push("/settings/EmailSetup")}>
                    Email Setup
                  </Link>
                </li>
                <li
                  className={params?.channel === "EmailTickets" ? "active" : ""}
                >
                  <Link onClick={() => history.push("/settings/EmailTickets")}>
                    Email Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => history.push("/CalendarBooking/calendars")}
                  >
                    Calendars
                  </Link>
                </li>
                <li>
                  <Link>Messenger</Link>
                </li>
              </ul>

              {/* second list */}

              <ul>
                <li className="heading">General</li>
                <li
                  className={
                    params?.channel === "QuickResponse" ? "active" : ""
                  }
                >
                  <Link onClick={() => history.push("/settings/QuickResponse")}>
                    Quick Response
                  </Link>
                </li>
                <li>
                  <Link onClick={() => history.push("/Operators")}>
                    Operators
                  </Link>
                </li>
                <li
                  className={params?.channel === "Departments" ? "active" : ""}
                >
                  <Link onClick={() => history.push("/settings/Departments")}>
                    Departments
                  </Link>
                </li>
                <li
                  className={params?.channel === "Integrations" ? "active" : ""}
                >
                  <Link onClick={() => history.push("/settings/Integrations")}>
                    Integration
                  </Link>
                </li>

                {/* <li>
                  <Link to="/dashhboard/SettingsIntegration">Integration</Link>
                </li>{" "}
                <li>
                  <Link to="/dashhboard/SettingsEmailSetup">Email Setup</Link>
                </li> */}
              </ul>

              {/* third list */}
              <ul>
                <li className="heading">Personal</li>
                <li className={params?.channel === "Account" ? "active" : ""}>
                  <Link onClick={() => history.push("/settings/Account")}>
                    Account
                  </Link>
                </li>
                <li
                  className={
                    params?.channel === "Notifications" ? "active" : ""
                  }
                >
                  <Link onClick={() => history.push("/settings/Notifications")}>
                    Notifications
                  </Link>
                </li>
                <li
                  className={
                    params?.channel === "OperatingHours" ? "active" : ""
                  }
                >
                  <Link
                    onClick={() => history.push("/settings/OperatingHours")}
                  >
                    Operation Hours
                  </Link>
                </li>
              </ul>
            </div>

            {/* right side */}
            {params?.channel === "LiveChat" ? <LiveChatSettings /> : null}

            {params?.channel === "EmailTickets" ? (
              <EmailTicketSettings />
            ) : null}

            {params?.channel === "OperatingHours" ? (
              <OperatingHoursSettings />
            ) : null}

            {params?.channel === "QuickResponse" ? (
              <QuickReponseSettings />
            ) : null}

            {params?.channel === "Notifications" ? <Notifications /> : null}

            {params?.channel === "Departments" ? <Departments /> : null}

            {params?.channel === "Integrations" ? <Integrations /> : null}
            {params?.channel === "EmailSetup" ? <EmailSetup /> : null}
            {params?.channel === "Account" ? <Account /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
