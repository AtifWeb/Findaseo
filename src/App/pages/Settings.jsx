import { Link } from "@material-ui/core";
import { getUser } from "App/helpers/auth";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import Departments from "./settings/Departments";
import LiveChatSettings from "./settings/Livechat";

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
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="settings" />

        <div className="body-main-area">
          <h2>Settings</h2>
          <div className="body-box">
            <div className="left-side">
              <ul>
                <li className="heading">Channels</li>
                <li className={params?.channel === "LiveChat" ? "active" : ""}>
                  <Link onClick={() => history.push("/settings/LiveChat")}>
                    Live Chats
                  </Link>
                </li>
                <li>
                  <Link>Email Tickets</Link>
                </li>
                <li>
                  <Link>Calendars</Link>
                </li>
                <li>
                  <Link>Messengers</Link>
                </li>
              </ul>

              {/* second list */}

              <ul>
                <li className="heading">General</li>
                <li>
                  <Link>Quick Response</Link>
                </li>
                <li>
                  <Link>Operators</Link>
                </li>
                <li
                  className={params?.channel === "Departments" ? "active" : ""}
                >
                  <Link onClick={() => history.push("/settings/Departments")}>
                    Departments
                  </Link>
                </li>
              </ul>

              {/* third list */}
              <ul>
                <li className="heading">Personal</li>
                <li>
                  <Link>Account</Link>
                </li>
                <li>
                  <Link>Notifications</Link>
                </li>
                <li>
                  <Link>Operation Hours</Link>
                </li>
              </ul>
            </div>

            {/* right side */}
            {params?.channel === "LiveChat" ? <LiveChatSettings /> : null}

            {params?.channel === "Departments" ? <Departments /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
