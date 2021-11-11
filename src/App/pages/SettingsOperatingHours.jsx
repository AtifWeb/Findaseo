import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function SettingsOperatingHours() {
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
                <li className="active">
                  <Link to="/dashhboard/SettingsOperatingHours">
                    Operation Hours
                  </Link>
                </li>
              </ul>
            </div>

            {/* right side */}
            <div className="right-side Operating-right-side">
              <h2 className="special-h2">Operating Hours</h2>
              <form action="">
                <div className="input-wrapper">
                  <p>Sunday</p>
                  <input type="checkbox" name="" id="sunday_checkbox" />
                  <label
                    className="checkbox-custom-op"
                    htmlFor="sunday_checkbox"
                  >
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>
                </div>
                <div className="input-wrapper">
                  <p>Monday</p>
                  <input type="checkbox" name="" id="monday_checkbox" />
                  <label
                    className="checkbox-custom-op"
                    htmlFor="monday_checkbox"
                  >
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>{" "}
                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>
                <div className="input-wrapper">
                  <p>Tuesday</p>
                  <input type="checkbox" name="" id="Tuesday" />
                  <label className="checkbox-custom-op" htmlFor="Tuesday">
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>

                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>{" "}
                <div className="input-wrapper">
                  <p>Wednesday</p>
                  <input type="checkbox" name="" id="Wednesday" />
                  <label className="checkbox-custom-op" htmlFor="Wednesday">
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>{" "}
                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>
                <div className="input-wrapper">
                  <p>Thursday</p>
                  <input type="checkbox" name="" id="Thursday" />
                  <label className="checkbox-custom-op" htmlFor="Thursday">
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>{" "}
                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>
                <div className="input-wrapper">
                  <p>Friday</p>
                  <input type="checkbox" name="" id="Friday" />
                  <label className="checkbox-custom-op" htmlFor="Friday">
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>{" "}
                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>
                <div className="input-wrapper">
                  <p>Saturday</p>
                  <input type="checkbox" name="" id="Saturday" />
                  <label className="checkbox-custom-op" htmlFor="Saturday">
                    <p className="Available">Available</p>
                    <p className="Unavailable">Unavailable</p>

                    <span className="ball"></span>
                  </label>{" "}
                  <input type="time" name="" id="" />
                  <input type="time" name="" id="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsOperatingHours;
