import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import pic1 from "../../Assets/img/Page-1-Image-1s.jpg";
import pic2 from "../../Assets/img/Page-1-Image-2s.jpg";
import pic3 from "../../Assets/img/Page-1-Image-3s.jpg";
import pic4 from "../../Assets/img/Page-1-Image-4.jpg";
import pic5 from "../../Assets/img/Page-1-Image-5.jpg";
import pic6 from "../../Assets/img/Page-1-Image-6.jpg";
import pic7 from "../../Assets/img/Page-2-Image-7.jpg";
import pic8 from "../../Assets/img/Page-2-Image-8.jpg";
import pic9 from "../../Assets/img/Page-2-Image-9.jpg";
import pic10 from "../../Assets/img/Page-2-Image-10.jpg";
import pic11 from "../../Assets/img/Page-2-Image-11.jpg";
import pic12 from "../../Assets/img/Page-2-Image-12.jpg";
import pic13 from "../../Assets/img/Page-2-Image-13.jpg";
import pic14 from "../../Assets/img/Page-2-Image-14.jpg";
import pic15 from "../../Assets/img/Page-2-Image-15.jpg";
import pic16 from "../../Assets/img/Page-3-Image-16.jpg";
import { OperatingHoursCheckbox } from "../component/organisms/settings/OperatingHours/OperatingHoursCheckbox/OperatingHoursCheckbox";

function SettingsEmailSetup() {
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
    <div className="Settings main-wrapper d-flex email_provider">
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
                <li className="active">
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
            <div className="right-side Operating-right-side">
              <h2 className="special-h2">Setup Email Ticketing </h2>
              <p>
                Receive all emails from your business support email on Pavelify.
                No need to switch between different tabs/websites just to answer
                customer queries.{" "}
              </p>
              <div className="step step1">
                <h3>1. Copy the following email</h3>
                <p>Example@pavelify.com</p>
              </div>
              <div className="step">
                <h3>2. Setup email Forwarding</h3>
                <p>
                  Setup email forwarding from your email provider dashboard to
                  the provider Pavelify email above. Find instructions to your
                  email provider below.{" "}
                </p>{" "}
                <p>
                  If you don’t find your email provider below, simple search for
                  the instructions on Google by typing your email provider name
                  alongside “email forwarding setup instructions” or contact
                  your email provider.
                </p>
              </div>
              <div className="email_provider_pure">
                <img src={pic1} alt="" />
                <a
                  href="https://support.google.com/mail/answer/10957?hl=en#zippy=%2Cturn-automatic-fowarding-on-or-off"
                  target="_blank"
                >
                  Microsoft 365 Business Instructions{" "}
                </a>
              </div>
              <div className="email_provider_pure">
                <img src={pic2} alt="" />
                <a
                  href="Instructions https://docs.microsoft.com/en-us/microsoft-365/admin/email/configure-email-forwarding?view=o365-worldwide"
                  target="_blank"
                >
                  Microsoft 365 Business Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic3} alt="" />
                <a
                  href="https://docs.microsoft.com/en-us/exchange/recipients/user-mailboxes/email-forwarding?view=exchserver-2019"
                  target="_blank"
                >
                  Microsoft Exchange Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic4} alt="" />
                <a
                  href="https://support.microsoft.com/en-us/office/turn-on-automatic-forwarding-in-outlook-on-the-web-7f2670a1-7fff-4475-8a3c-5822d63b0c8e"
                  target="_blank"
                >
                  Outlook Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic5} alt="" />
                <a
                  href="https://www.zoho.com/mail/help/email-forwarding.html"
                  target="_blank"
                >
                  Zoho Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic6} alt="" />
                <a
                  href="https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding/"
                  target="_blank"
                >
                  Namecheap Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic7} alt="" />
                <a
                  href="https://help.yahoo.com/kb/SLN29133.html"
                  target="_blank"
                >
                  Yahoo Mail Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic8} alt="" />
                <a
                  href="https://www.a2hosting.com/kb/cpanel/cpanel-mail-features/e-mail-forwarders"
                  target="_blank"
                >
                  A2 Hosting Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic9} alt="" />
                <a
                  href="https://uk.godaddy.com/help/set-up-my-forwarding-email-address-7598"
                  target="_blank"
                >
                  GoDaddy Instructions
                </a>
              </div>
              <div className="email_provider_pure">
                <img src={pic10} alt="" />
                <a
                  href="https://www.qqmail.info/how-to-set-up-mail-forwarding-in-qq-mail.html"
                  target="_blank"
                >
                  QQ Mail Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic11} alt="" />
                <a
                  href=" https://docs.rackspace.com/support/how-to/set-up-rackspace-email-forwarding/"
                  target="_blank"
                >
                  RackSpace Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic12} alt="" />
                <a
                  href="https://documentation.cpanel.net/display/78Docs/Forwarders"
                  target="_blank"
                >
                  Cpanel Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic13} alt="" />
                <a
                  href="https://my.bluehost.com/cgi/help/email-forwarders"
                  target="_blank"
                >
                  BlueHost Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic14} alt="" />
                <a
                  href="https://www.hostinger.com/tutorials/email/how-to-forward-your-emails"
                  target="_blank"
                >
                  Hostinger Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic15} alt="" />
                <a
                  href="https://help.dreamhost.com/hc/en-us/articles/215724207-How-do-I-add-a-forward-only-email-address-"
                  target="_blank"
                >
                  DreamHost Instructions
                </a>
              </div>{" "}
              <div className="email_provider_pure">
                <img src={pic16} alt="" />
                <a
                  href=" https://www.ionos.com/help/email/setting-up-mail-basic/setting-up-forwarding-for-email-addresses/"
                  target="_blank"
                >
                  1 & 1 IONOS Instructions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsEmailSetup;
