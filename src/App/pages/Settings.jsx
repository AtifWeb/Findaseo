import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function Settings() {
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
            <div className="left-side">
              <ul>
                <li className="heading">Channels</li>
                <li className="active">
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
            <div className="right-side">
              <h2>Live Chats</h2>
              <ul>
                <li>
                  <div className="head d-flex-align-center">
                    <p>Pre Chat Survey</p>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.5L10 10.5L1 1.5"
                        stroke="#282D4A"
                        stroke-width="2"
                      />
                    </svg>
                  </div>

                  <form className="body">
                    {/* first part */}
                    <div className="wrapper">
                      <h5>Display</h5>
                      <div className="selection-wrapper d-flex-align-center">
                        <div className="left-side d-flex-align-center">
                          <input
                            type="checkbox"
                            name=""
                            id="display-checkbox"
                          />
                          <label htmlFor="display-checkbox">
                            <span className="ball"></span>
                          </label>
                          <p>Message</p>
                        </div>
                        <div className="right-side">
                          <input
                            type="text"
                            placeholder="Please introduce yourself:"
                          />
                        </div>
                      </div>
                    </div>

                    {/* second part */}

                    <div className="wrapper">
                      <h5>Survey Fields</h5>
                      <div className="selection-wrapper d-flex-align-center">
                        <div className="left-side d-flex-align-center">
                          <input type="checkbox" name="" id="survey-1" />
                          <label htmlFor="survey-1">
                            <span className="ball"></span>
                          </label>
                          <p>Name</p>
                        </div>
                        <div className="right-side">
                          <input type="text" placeholder="Enter your name..." />
                        </div>
                      </div>

                      <div className="selection-wrapper d-flex-align-center">
                        <div className="left-side d-flex-align-center">
                          <input type="checkbox" name="" id="survey-2" />
                          <label htmlFor="survey-2">
                            <span className="ball"></span>
                          </label>
                          <p>Email</p>
                        </div>
                        <div className="right-side">
                          <input
                            type="text"
                            placeholder="Enter your email..."
                          />
                        </div>
                      </div>

                      <div className="selection-wrapper d-flex-align-center">
                        <div className="left-side d-flex-align-center">
                          <input type="checkbox" name="" id="survey-3" />
                          <label htmlFor="survey-3">
                            <span className="ball"></span>
                          </label>
                          <p>Phone Number</p>
                        </div>
                        <div className="right-side">
                          <input
                            type="text"
                            placeholder="Enter your phone number..."
                          />
                        </div>
                      </div>
                    </div>

                    <button className="sm-btn">Save Settings</button>
                  </form>
                </li>
                <li>
                  <div className="head d-flex-align-center">
                    <p>Appereance</p>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.5L10 10.5L1 1.5"
                        stroke="#282D4A"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <form action="" className="body"></form>
                </li>

                <li>
                  <div className="head d-flex-align-center">
                    <p>Side Bar</p>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.5L10 10.5L1 1.5"
                        stroke="#282D4A"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <form action="" className="body"></form>
                </li>

                <li>
                  <div className="head d-flex-align-center">
                    <p>Chat Page</p>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.5L10 10.5L1 1.5"
                        stroke="#282D4A"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <form action="" className="body"></form>
                </li>

                <li>
                  <div className="head d-flex-align-center">
                    <p>Instalations</p>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.5L10 10.5L1 1.5"
                        stroke="#282D4A"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <form action="" className="body"></form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
