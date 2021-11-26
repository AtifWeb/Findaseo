import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import Messenger from "../../Assets/img/Page-1-Image-1.jpg";
import Insta from "../../Assets/img/Page-1-Image-2.jpg";
import Twitter from "../../Assets/img/Page-1-Image-3.jpg";
import telegram from "../../Assets/img/Page-1-Image-4.png";
import whatsapp from "../../Assets/img/Page-1-Image-5.png";
import Twilio from "../../Assets/img/Page-2-Image-6.jpg";
import Line from "../../Assets/img/sPage-2-Image-7.jpg";
import slack from "../../Assets/img/sPage-2-Image-8.jpg";
import Zapier from "../../Assets/img/sPage-2-Image-9.jpg";
import pipe from "../../Assets/img/Page-3-Image-10.jpg";
import zoho from "../../Assets/img/Page-3-Image-11.jpg";

function SettingsIntegrations() {
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
    <div className="Settings main-wrapper integration d-flex">
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
                <li className="active">
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
            <div
              className="right-side account-right-side"
              style={{ paddingRight: "2rem" }}
            >
              <h2 className="special-h2">Integration</h2>

              <h3 className="channel_name">Communication Channels</h3>
              <div className="boxesWrapper">
                <div className="box">
                  <div className="head">
                    <img src={Messenger} alt="" />
                    <p>
                      Facebook <span>Messenger</span>
                    </p>
                  </div>
                  <p>
                    Reply to Facebook Messenger messages through Pavelify
                    omnichannel live chat.{" "}
                  </p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={Insta} alt="" />
                    <p>Instagram</p>
                  </div>
                  <p>
                    Reply to Instagram messages through Pavelify omnichannel
                    live chat.
                  </p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={Twitter} alt="" />
                    <p>Twitter</p>
                  </div>
                  <p>Reply to your Twitter DM through Pavelify</p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={telegram} alt="" />
                    <p>Telegram</p>
                  </div>
                  <p>
                    Get and reply to your Telegram messages through Pavelify
                  </p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={whatsapp} alt="" />
                    <p>WhatsApp</p>
                  </div>
                  <p>Reply to your WhatsApp messages through Pavelify</p>
                </div>
                <div className="box">
                  <div className="head">
                    <img src={Twilio} alt="" />
                    <p>Twilio SMS</p>
                  </div>
                  <p>Get your Twilio SMS on Pavelify</p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={Line} alt="" />
                    <p>LINE</p>
                  </div>
                  <p>Reply to your Line app messages through Pavelify</p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    <img src={slack} alt="" />
                    <p>Slack</p>
                  </div>
                  <p>Reply to your Slack messages through Pavelify</p>
                </div>
              </div>

              <h3 className="channel_name">Other Channels</h3>

              <div className="boxesWrapper">
                <div className="box">
                  <div className="head">
                    <img src={Zapier} alt="" style={{ width: "80%" }} />
                  </div>
                  <p>Easy connect your favorite apps</p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    {" "}
                    <img src={pipe} alt="" style={{ width: "90%" }} />
                  </div>
                  <p>Sync your Pipedrive contacts with Pavelify.</p>
                </div>{" "}
                <div className="box">
                  <div className="head">
                    {" "}
                    <img src={zoho} alt="" style={{ width: "80%" }} />
                  </div>
                  <p>Sync your Zoho contacts with Pavelify</p>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsIntegrations;
