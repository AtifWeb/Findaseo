import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

import DocumentText from "../../Assets/img/document-text.png";
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import Person1 from "../../Assets/img/Frame 1.png";
import Person2 from "../../Assets/img/Frame 2.png";
import Person3 from "../../Assets/img/Frame 3.png";
import User from "../../Assets/img/user.png";
import BlueLow from "../../Assets/img/blue-low.png";
import { useHistory, useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { format } from "date-fns";
import { Dropdown } from "App/component/BodyHeader";
import NeutralButton from "App/component/NeutralButton";
import { capitalize } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { fetchTickets } from "Lib/Axios/endpoints/queries";

function EmailTickets() {
  const params = useParams();
  const history = useHistory();
  const [user] = useState(getUser());
  const [department, setDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: { tickets, departments, counts },
    refetch,
  } = useQuery(["tickets", department], fetchTickets, {
    initialData: {},
  });

  const filterByDepartment = (department) => {
    refetch({ queryKey: ["tickets", department] });
  };

  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(
      ".table-body-area .row .checkbox-wrapper input"
    );

    //    click event on first checkbox i mean main checkbox
    Checkbox.addEventListener("click", (e) => {
      if (e.target.checked === true) {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = true;
        });
      } else {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = false;
        });
      }
    });
  }, []);
  return (
    <div className="EmailTickets main-wrapper d-flex">
      <Helmet>
        <title>Email Tickets - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="EmailTickets" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="EmailTickets" />

        <div className="body-main-area">
          {/* <h2>Email Tickets</h2> */}

          <ul className="navigation-bar d-flex-align-center">
            <li
              onClick={() => history.push("/EmailTickets/all")}
              className={`${
                !params?.type || params?.type === "all" ? "active" : ""
              } d-flex-align-center`}
            >
              <p>All Tickets</p>
              <span>{counts?.all || 0}</span>
            </li>
            <li
              onClick={() => history.push("/EmailTickets/open")}
              className={`${
                params?.type === "open" ? "active" : ""
              } d-flex-align-center`}
            >
              <p>Open</p>
              <span>{counts?.open || 0}</span>
            </li>
            <li
              onClick={() => history.push("/EmailTickets/due")}
              className={`${
                params?.type === "due" ? "active" : ""
              } d-flex-align-center`}
            >
              <p>Due Today</p>
              <span>{counts?.due || 0}</span>
            </li>
            <li
              onClick={() => history.push("/EmailTickets/onhold")}
              className={`${
                params?.type === "onhold" ? "active" : ""
              } d-flex-align-center`}
            >
              <p>On Hold</p>
              <span>{counts?.onhold || 0}</span>
            </li>
            <li
              onClick={() => history.push("/EmailTickets/unassigned")}
              className={`${
                params?.type === "unassigned" ? "active" : ""
              } d-flex-align-center`}
            >
              <p>Unassigned</p>
              <span>{counts?.unassigned || 0}</span>
            </li>
          </ul>
          <div className="body-box">
            <div className="top-area d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" id="all-check-checkbox" />
                </div>

                <div className="drop-down-wrapper d-flex-align-center">
                  <p>Sort by:</p>
                  <div className="drop-down d-flex-align-center">
                    <p>Date Created</p>
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 3L6.53109 0H0.468911L3.5 3Z"
                        fill="#282D4A"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  className="drop-down-wrapper d-flex-align-center"
                  style={{ position: "relative" }}
                >
                  <p>Filter by:</p>
                  <div
                    className="drop-down d-flex-align-center"
                    onClick={() => setShowModal((prev) => !prev)}
                  >
                    <p>{capitalize(department || "Department")}</p>
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 3L6.53109 0H0.468911L3.5 3Z"
                        fill="#282D4A"
                      />
                    </svg>
                  </div>

                  {showModal ? (
                    <Dropdown>
                      <ul>
                        <li>
                          <NeutralButton
                            onClick={(e) => {
                              setShowModal(false);
                              setDepartment(null);
                              filterByDepartment(null);
                            }}
                          >
                            {"All"}
                          </NeutralButton>
                        </li>
                        {departments &&
                          departments.map((department, index) => (
                            <li>
                              <NeutralButton
                                onClick={(e) => {
                                  setShowModal(false);
                                  setDepartment(department);
                                  filterByDepartment(department);
                                }}
                              >
                                {capitalize(department)}
                              </NeutralButton>
                            </li>
                          ))}
                      </ul>
                    </Dropdown>
                  ) : null}
                </div>
              </div>

              <div className="right-area d-flex-align-center">
                {/* <div className="export-area d-flex-align-center">
                  <img src={DocumentText} alt="" />
                  <p>Export</p>
                </div> */}

                <div className="slider-area  d-flex-align-center">
                  <p>
                    <span>1</span> -{" "}
                    <span>
                      {tickets && tickets[params?.type || "all"]?.length}
                    </span>{" "}
                    of
                    <span>
                      {" "}
                      {(tickets && tickets[params?.type || "all"]?.length) || 0}
                    </span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
            </div>

            {/*table body area */}

            <div className="table-body-area">
              {tickets &&
                tickets[params?.type || "all"] &&
                tickets[params?.type || "all"]?.map((ticket, index) => (
                  <div
                    key={String(index)}
                    className="row d-flex-align-center"
                    onClick={() =>
                      history.push(`/EmailTickets/conversation/${ticket?._id}`)
                    }
                  >
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div className="profile-area d-flex-align-center">
                      <div
                        className="livechat-tag"
                        style={{
                          background: "#2D96D7",
                        }}
                      >
                        {capitalize(
                          ticket?.emailData?.from?.value[0]?.name ||
                            ticket?.emailData?.from?.value[0]?.address
                        )?.slice(0, 1) || 0}
                      </div>
                      <div className="presentation">
                        <h4
                          style={{
                            fontWeight:
                              ticket?.status === "Pending" ? "bold" : "normal",
                          }}
                        >
                          {ticket?.emailData?.subject}
                        </h4>
                        <p>
                          <span>
                            {ticket?.emailData?.from?.value[0]?.name ||
                              ticket?.emailData?.from?.value[0]?.address}
                          </span>
                          &nbsp; -&nbsp;
                          <span>
                            &nbsp;
                            {format(new Date(ticket?.timestamp), "p") +
                              " " +
                              format(new Date(ticket?.timestamp), "PP")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="right-side d-flex-align-center">
                      <div className="icon-wrapper d-flex-align-center">
                        <img src={BlueLow} alt="" />
                        <p>Medium</p>
                      </div>
                      <div className="icon-wrapper d-flex-align-center">
                        <img src={User} alt="" />
                        <p>{capitalize(ticket?.department)}</p>
                      </div>

                      <button
                        className="open-btn"
                        style={
                          ticket?.status !== "Resolved"
                            ? { backgroundColor: "#efe4fc", color: "#7822e6" }
                            : null
                        }
                      >
                        {ticket?.status}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailTickets;
