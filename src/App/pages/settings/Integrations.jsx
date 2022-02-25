import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser, saveLogin } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { Link } from "react-router-dom";
import { data } from "App/Utils/DashboardChart";
import Messenger from "../../../Assets/img/Page-1-Image-1.jpg";
import Insta from "../../../Assets/img/Page-1-Image-2.jpg";
import Twitter from "../../../Assets/img/Page-1-Image-3.jpg";
import telegram from "../../../Assets/img/Page-1-Image-4.png";
import whatsapp from "../../../Assets/img/Page-1-Image-5.png";
import Twilio from "../../../Assets/img/Page-2-Image-6.jpg";
import Line from "../../../Assets/img/sPage-2-Image-7.jpg";
import slack from "../../../Assets/img/sPage-2-Image-8.jpg";
import Zapier from "../../../Assets/img/sPage-2-Image-9.jpg";
import pipe from "../../../Assets/img/Page-3-Image-10.jpg";
import zoho from "../../../Assets/img/Page-3-Image-11.jpg";

const Integrations = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [user] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <div className="right-side account-right-side integration">
      <StatusAlert />
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
            Reply to Facebook Messenger messages through Pavelify omnichannel
            live chat.{" "}
          </p>
        </div>{" "}
        <div className="box">
          <div className="head">
            <img src={Insta} alt="" />
            <p>Instagram</p>
          </div>
          <p>
            Reply to Instagram messages through Pavelify omnichannel live chat.
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
          <p>Get and reply to your Telegram messages through Pavelify</p>
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
  );
};

export default Integrations;
