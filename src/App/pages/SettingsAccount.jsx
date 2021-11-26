import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function SettingsAccount() {
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
                <li className="active">
                  <Link to="/dashhboard/SettingsAccount">Account</Link>
                </li>
                <li>
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
            <div className="right-side account-right-side">
              <h2 className="special-h2">Account</h2>
              <form action="">
                <div className="input-wrapper">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" />
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="name">Your Picture</label>
                  <div className="file-wrapper">
                    <div className="icon-wrapper">
                      <i class="fas fa-user-circle"></i>
                    </div>

                    <label htmlFor="choose_file">Choose your file</label>
                    <input
                      type="file"
                      name=""
                      id="choose_file"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="Email">Email</label>
                  <input type="email" id="Email" />
                </div>{" "}
                <div className="input-wrapper change-password-link">
                  <label htmlFor="password">Password</label>
                  <Link to="/">Change Password</Link>
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="Region">Region</label>
                  <select name="" id="">
                    <option value="default">default</option>
                  </select>
                </div>{" "}
                <div className="input-wrapper">
                  <label htmlFor="Language">Language</label>
                  <select name="" id="">
                    <option value="default">default</option>
                  </select>
                </div>{" "}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAccount;
