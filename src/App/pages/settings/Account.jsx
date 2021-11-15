import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { Link } from "react-router-dom";

const Account = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [user] = useState(getUser());
  const [loading, setLoading] = useState(false);
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
    <div className="right-side account-right-side">
      <StatusAlert />
      <h2 className="special-h2">Account </h2>
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
  );
};

export default Account;
