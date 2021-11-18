import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser, saveLogin } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { Link } from "react-router-dom";
import { data } from "App/Utils/DashboardChart";

const Account = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [user] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");

  console.log({ user });

  useEffect(() => {
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, []);

  const updateProfile = () => {
    if (!name || name.lenght < 3) {
      const alertID = StatusAlertService.showError(
        "Name must be at least 3 chars long"
      );
      return;
    }
    const data = {
      name,
      id: user.isCompany ? user?.cID : user?.operatorID,
      isCompany: user.isCompany,
    };
    if (picture) {
      data.picture = picture;
    }

    setLoading(true);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/account/updateProfile`,
      data,
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          const alertID = StatusAlertService.showSuccess(
            "Profile updated successfully!"
          );

          saveLogin({
            ...user,
            ...result.data.user,
          });
          setName("");
        } else {
          //
        }
      })
      .catch((e) => {
        const alertID = StatusAlertService.showError(handleError(e));

        setLoading(false);
      });
  };

  const changePassword = () => {
    if (
      !password ||
      password.lenght < 6 ||
      !confirmPassword ||
      confirmPassword.lenght < 6 ||
      !newPassword ||
      newPassword.lenght < 6
    ) {
      const alertID = StatusAlertService.showError(
        "Password must be at least 6 chars long"
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      const alertID = StatusAlertService.showError("Password does not match");
      return;
    }
    const data = {
      id: user.isCompany ? user?.cID : user?.operatorID,
      isCompany: user.isCompany,
      currentPassword: password,
      newPassword,
    };

    setLoading(true);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/account/changePassword`,
      data,
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          const alertID = StatusAlertService.showSuccess(
            "Password changed successfully!"
          );
          window.location = "/logout";
        } else {
          //
        }
      })
      .catch((e) => {
        const alertID = StatusAlertService.showError(handleError(e));

        setLoading(false);
      });
  };

  const selectPhoto = (e) => {
    var file = e.target["files"][0];

    var reader = new FileReader();

    reader.onload = function () {
      const base64String = reader.result;
      // .replace("data:", "")
      // .replace(/^.+,/, "");

      setPicture(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="right-side account-right-side">
      <StatusAlert />
      <h2 className="special-h2">Account </h2>
      <form action="">
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
          />
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="name">Your Picture</label>
          <div className="file-wrapper">
            <div className="icon-wrapper">
              {user?.picture ? (
                <img
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    paddingRight: "4px",
                  }}
                  src={user?.picture}
                />
              ) : (
                <i class="fas fa-user-circle"></i>
              )}
            </div>

            <label htmlFor="choose_file">Choose your file</label>
            <input
              type="file"
              name=""
              id="choose_file"
              style={{ display: "none" }}
              onChange={selectPhoto}
            />
          </div>
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="Email">Email</label>
          <input value={user?.email} readOnly type="email" id="Email" />
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="Language">Language</label>
          <select name="" id="">
            <option value="default">default</option>
          </select>
        </div>{" "}
        <button
          className="btn ms-5 mt-4  mx-auto"
          type="button"
          onClick={updateProfile}
        >
          Save
        </button>
      </form>

      <h2 className="special-h2 mt-5">Change Password </h2>
      <form action="">
        <div className="input-wrapper">
          <label htmlFor="name">Current Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="cpassword"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="name">New Password</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            id="npassword"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="name">Confirm New Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            id="cnpassword"
          />
        </div>

        <button
          className="btn ms-5 mt-4  mx-auto"
          type="button"
          onClick={changePassword}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Account;
