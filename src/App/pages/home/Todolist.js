import React, { useEffect, useState } from "react";
import BodyHeader from "App/component/BodyHeader";
import Sidebar from "App/component/Sidebar";
import LiveChat from "../../../Assets/img/live-chat.png";
import { useHistory, useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import NeutralButton from "App/component/NeutralButton";
import ChatGreen from "../../../Assets/img/chat-green.png";
import OrangeCalender from "../../../Assets/img/orangecalender.svg";
import GreenMessage from "../../../Assets/img/green-message.png";

function Todolist() {
  const params = useParams();
  const history = useHistory();
  const [user] = useState(getUser());
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="Home main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="home" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="home" />

        <div className="body-main-area">
          <div
            className="body-box px-3 pt-2 pb-4"
            style={{
              gridTemplateColumns: "unset",
              minHeight: "80vh",
              display: "block",
            }}
          >
            <h2>Todolist</h2>

            <div className="mt-4 todo-list">
              <ul className="bottom">
                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgrey",
                  }}
                  className="pb-2 w-50 mb-3"
                  onClick={() => history.push(`/settings/LiveChat`)}
                >
                  <div className="d-flex-align-center">
                    <img src={LiveChat} alt="" />
                    <p className="ms-2 " style={{ fontSize: "18px" }}>
                      Configure Live chat{" "}
                    </p>
                  </div>
                  <small className="text-muted ms-5">
                    Implement your chat now
                  </small>
                </li>

                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgrey",
                  }}
                  className="pb-2 w-50 mb-3"
                  onClick={() => history.push(`/settings/EmailTickets`)}
                >
                  <div className="d-flex-align-center">
                    <img src={GreenMessage} alt="" />
                    <p className="ms-2 " style={{ fontSize: "18px" }}>
                      Configure Email Ticketing
                    </p>
                  </div>
                  <small className="text-muted ms-5">
                    Implement your chat now
                  </small>
                </li>

                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgrey",
                  }}
                  className="pb-2 w-50 mb-3"
                  onClick={() => history.push(`/CalendarBooking`)}
                >
                  <div className="d-flex-align-center">
                    <div className="icon-wrapper orange">
                      <img src={OrangeCalender} alt="" />
                    </div>
                    <p className="ms-2 " style={{ fontSize: "18px" }}>
                      Configure Calendar Meeting
                    </p>
                  </div>
                  <small className="text-muted ms-5">
                    Implement your chat now
                  </small>
                </li>

                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgrey",
                  }}
                  className="pb-2 w-50 mb-3"
                  onClick={() => history.push(`/settings/Messenger`)}
                >
                  <div className="d-flex-align-center">
                    <div className="icon-wrapper messenger">
                      <i className="fab fa-facebook-messenger"></i>
                    </div>
                    <p className="ms-2 " style={{ fontSize: "18px" }}>
                      Integrate Messenger
                    </p>
                  </div>
                  <small className="text-muted ms-5">
                    Implement your chat now
                  </small>
                </li>

                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgrey",
                  }}
                  className="pb-2 w-50 mb-3"
                  onClick={() => history.push(`/Contact`)}
                >
                  <div className="d-flex-align-center">
                    <div className="icon-wrapper contacts">
                      <i className="far fa-address-book"></i>
                    </div>
                    <p className="ms-2 " style={{ fontSize: "18px" }}>
                      Import Contact
                    </p>
                  </div>
                  <small className="text-muted ms-5">
                    Implement your chat now
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
