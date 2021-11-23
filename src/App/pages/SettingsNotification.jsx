import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function SettingsNotification() {
  useEffect(() => {
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, []);
  return (
    <div className="Settings main-wrapper d-flex">
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="settings" />

        <div className="body-main-area">
          <h2>Settings</h2>
          <div className="body-box">
            <div className="left-side account-left-side">
              <ul>
                <li className="heading">Channels</li>
                <li>
                  <Link>Live Chats</Link>
                </li>
                <li>
                  <Link>Email Tickets</Link>
                </li>
                <li>
                  <Link>Calendars</Link>
                </li>
                <li>
                  <Link>Mesenggers</Link>
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
                <li>
                  <Link>Departements</Link>
                </li>{" "}
                <li>
                  <Link to="/dashhboard/SettingsIntegration">Integration</Link>
                </li>{" "}
                <li>
                  <Link to="/dashhboard/SettingsEmailSetup">Email Setup</Link>
                </li>
              </ul>

              {/* third list */}
              <ul>
                <li className="heading">Personal</li>
                <li>
                  <Link to="/dashhboard/SettingsAccount">Account</Link>
                </li>
                <li className="active">
                  <Link to="/dashhboard/SettingsNotifications">
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/dashhboard/SettingsOperatingHours">
                    Operation Hours
                  </Link>
                </li>
              </ul>
            </div>

            {/* right side */}
            <div className="right-side account-right-side notification-right-side">
              <h2 className="special-h2">
                {" "}
                <i class="fas fa-bell"></i>Notifications
              </h2>
              <form action="">
                <div className="input-wrapper">
                  <label htmlFor="">Incoming Visitor</label>{" "}
                  <select name="" id="">
                    <option value="default">default</option>
                  </select>
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="">New Chat Request</label>{" "}
                  <select name="" id="">
                    <option value="default">default</option>
                  </select>
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="">New Message</label>{" "}
                  <select name="" id="">
                    <option value="default">default</option>
                  </select>
                </div>
                <h2>
                  <i class="fas fa-envelope"></i> Send Email Notifications
                </h2>
                <div className="input-wrapper">
                  <label htmlFor="Email">Send For</label>
                  <input type="email" id="Email" />
                </div>
                <button className="add_email_address_button">
                  Add new email address
                </button>{" "}
                <button className="save-button">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsNotification;
