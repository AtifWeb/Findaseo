import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
// import PlusIcon from "../../Assets/img/purple-plus.png";
import Person1 from "../../Assets/img/Frame 1.png";
// import Person2 from "../../Assets/img/Frame 2.png";
// import Person3 from "../../Assets/img/Frame 3.png";
import PersonBig from "../../Assets/img/PersonBig.png";
import time from "../../Assets/img/svg/time.svg";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { useHistory, useParams } from "react-router";
import NeutralButton from "App/component/NeutralButton";
import { useSelector } from "react-redux";
import { SocketContext } from "App/context/socket";
import { generateRoomID } from "App/helpers/generateRoomID";
import { format } from "date-fns";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import Modal from "App/component/Modal";
import linkify from "helpers/linkify";
window.currentDate = "";
window.currentPerson = false;

const Status = styled.span`
  position: absolute;
  color: white;
  background-color: ${(props) => (props?.online ? "green" : "orange")};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  font-size: 12px;
  bottom: 8px;
  right: 10px;
`;

function EmailTicketConversation() {
  const history = useHistory();
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user, setTheUser] = useState(getUser());
  const [conversations, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatter, setChatter] = useState("");
  const [visitor, setVisitor] = useState(null);
  const params = useParams();
  const [prevLoaded, setPrevLoaded] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState();
  const [handler, setHandler] = useState({});
  const [showQuick, setShowQuick] = useState(false);
  const [quickResponses, setQuickResponses] = useState([]);
  const [open, setOpen] = useState(false);
  const [operators, setOperators] = useState([]);
  const [operator, setOperator] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 1201) {
      let Users = document.querySelectorAll(
        ".LiveChat .messages-box-area > .left-side .users"
      );
      let ChatArea = document.querySelector(
        ".LiveChat .messages-box-area > .middle-side"
      );
      let LeftArea = document.querySelector(
        ".LiveChat .messages-box-area > .left-side"
      );
      Users.forEach((EachUser) => {
        EachUser.addEventListener("click", () => {
          if (LeftArea && LeftArea?.style) {
            LeftArea.style.display = "none";
          }
          if (ChatArea && ChatArea?.style) {
            ChatArea.style.display = "block";
          }
        });
      });
    }
  }, []);

  const fetchOperators = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/operators/fetch`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setOperators([{ ...user }, ...result.data.operators]);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  useEffect(() => {
    fetchTickets();
    fetchQuckResponse();
    fetchOperators();
  }, []);

  useEffect(() => {
    window.currentDate = "";
    scrollDown();
  }, [ticket]);

  const fetchTickets = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/email-ticket/get`,
        data: {
          cID: user?.cID,
          ticketID: params?.id,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setTicket(result.data.ticket);

            setHandler(result.data.handler);
            setLoading(false);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const fetchQuckResponse = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setQuickResponses(result.data.configuration.quickResponse);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const resolve = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/email-ticket/updateStatus`,
        data: {
          cID: user?.cID,
          ticketID: params?.id,
          status: "Resolved",
        },
      })
        .then((result) => {
          if (result.data.success) {
            setTicket(result.data.ticket);

            setLoading(false);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const messageSender = () => {
    user &&
      message &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/email-ticket/send`,
        data: {
          cID: user?.cID,
          ticketID: params?.id,
          message,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setMessage("");
            setTicket(result.data.ticket);
            setLoading(false);
            scrollDown();
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const assignOperator = () => {
    let d = operators.filter(
      (o) => (user.isCompany && user.cID !== o.cID) || user.operatorID === o._id
    )[operator];
    let newOperatorID = d._id || d.cID;

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/assignOperatorToTicket`,
      data: {
        cID: user?.cID,
        operatorID: newOperatorID,
        ticketID: ticket._id,
      },
    })
      .then((result) => {
        if (result.data.success) {
          setLoading(false);
          setHandler(d);
          setOperator(0);
          setOpen(false);
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        setLoading(false);
      });
  };

  const renderMessage = (ticket, reply = false) => {
    let element;
    if (ticket.byOperator) {
      if (window.currentPerson !== 1) {
        window.currentPerson = false;
      }
    } else {
    }
    let showDate = false;
    let nDate = format(
      new Date(
        reply
          ? ticket.byOperator
            ? ticket.timestamp
            : ticket.date
          : ticket.timestamp
      ),
      "PP"
    );

    if (!window.currentDate || window.currentDate !== nDate || !reply) {
      showDate = true;
      window.currentDate = nDate;
      // console.log({ wind: window.currentDate, nDate });
    }
    element = (
      <React.Fragment>
        {!reply && (
          <h3 className="text-center mb-5" style={{ color: "grey" }}>
            {ticket?.emailData?.subject}
          </h3>
        )}
        {showDate && (
          <div
            className=""
            style={{
              textAlign: "center",
              padding: "6px 1px",
            }}
          >
            <small> {nDate}</small>
          </div>
        )}

        <div
          className={`message ${!window.currentPerson ? "" : "queue"} ${
            ticket.byOperator ? "me" : ""
          }`}
        >
          <p>
            {reply
              ? ticket.byOperator
                ? ReactHtmlParser(linkify(ticket.message))
                : ReactHtmlParser(linkify(ticket?.textAsHtml))
                ? ReactHtmlParser(ticket?.textAsHtml)
                : ReactHtmlParser(ticket?.html)
              : ReactHtmlParser(linkify(ticket?.emailData?.text)) ||
                ReactHtmlParser(ticket?.emailData?.html)}
          </p>
          <div className="date-area d-flex-align-center">
            <p className="name">
              {" "}
              {reply ? (
                ticket.byOperator ? (
                  <span>{user?.name}</span>
                ) : (
                  ticket?.from?.value[0]?.name ||
                  ticket?.from?.value[0]?.address
                )
              ) : (
                ticket?.emailData?.from?.value[0]?.name ||
                ticket?.emailData?.from?.value[0]?.address
              )}
            </p>
            <p>.</p>
            <img src={time} alt="" />

            <p>
              {format(
                new Date(
                  reply
                    ? ticket.byOperator
                      ? ticket.timestamp
                      : ticket.date
                    : ticket.timestamp
                ),
                "p"
              )}
            </p>
          </div>
        </div>
      </React.Fragment>
    );

    return element;
  };

  return (
    <div className="LiveChat main-wrapper d-flex email">
      {/* sidebar */}
      <Sidebar active="EmailTickets" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="EmailTickets" />
        <Modal open={open} setOpen={setOpen} close>
          <div className="modal-body mx-auto text-center">
            <h3 className="modal-title mb-4" id="operatorModalLabel">
              Assign Operator
            </h3>
            <div>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                style={{ minWidth: "300px" }}
                name="operators"
                id=""
                className="form-control"
              >
                {operators &&
                  operators
                    .filter(
                      (o) =>
                        (user.isCompany && user.cID !== o.cID) ||
                        user.operatorID === o._id
                    )
                    .map((operator, index) => (
                      <option value={index} key={String(index)}>
                        {operator.name} {!operator._id ? " (Admin)" : ""}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <div className="modal-footer mt-2">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button
              className="btn"
              data-bs-dismiss="modal"
              onClick={assignOperator}
              loading={loading}
            >
              Assign
            </button>
          </div>
        </Modal>
        <div
          className="body-main-area"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          {/* <h2>Email Ticket</h2> */}
          <div className="messages-box-area">
            {/* <div className="left-side"></div> */}
            {/* middile side */}
            {ticket ? (
              <div
                className="middle-side email"
                style={{ maxHeight: "85vh", padding: "0px" }}
              >
                {/* <div className="contact-area">
                <div className="top-area d-flex-align-center">
                  <h3>Your Contacts</h3>
                  <div className="icon-wrapper">
                    <svg
                      width="22"
                      height="5"
                      viewBox="0 0 22 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2.0625"
                        cy="2.0625"
                        r="2.0625"
                        fill="#282D4A"
                      />
                      <circle cx="11" cy="2.0625" r="2.0625" fill="#282D4A" />
                      <circle
                        cx="19.9375"
                        cy="2.0625"
                        r="2.0625"
                        fill="#282D4A"
                      />
                    </svg>
                  </div>
                </div>

                <div className="contact-images d-flex-align-center">
                  <img src={Person1} alt="" />
                  <img src={Person2} alt="" />
                  <img src={Person3} alt="" />
                  <img src={Person2} alt="" />
                  <img src={Person1} alt="" />
                  <img src={Person3} alt="" />
                  <div className="add-contact">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="17.5"
                        stroke="#7822E6"
                        stroke-opacity="0.12"
                      />
                      <path
                        d="M17.75 11V24.5"
                        stroke="#7822E6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 17.75H24.5"
                        stroke="#7822E6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}

                <div className="messages-container-wrapper  position-relative">
                  <div
                    className="message-container "
                    style={{ maxHeight: "85vh" }}
                  >
                    {ticket && renderMessage(ticket)}
                    {ticket && ticket?.replies?.length
                      ? ticket.replies.map((reply) =>
                          renderMessage(reply, true)
                        )
                      : null}
                    <div ref={messagesEndRef} />
                  </div>

                  {ticket?.status === "Resolved" ? (
                    <h3 className="text-center mb-3 py-2">Resolved</h3>
                  ) : (user.isCompany && user.cID === handler._id) ||
                    user.operatorID === handler._id ? (
                    <div className="message-sender-form mb-1">
                      {showQuick ? (
                        <div
                          style={{
                            position: "absolute",
                            boxShadow: "2px 3px 3px lightgrey",
                            background: "white",
                            width: "90%",
                            height: "200px",
                            bottom: "100px",
                            // left: "20%",
                            borderRadius: "4px",
                          }}
                          className="py-2"
                        >
                          <ul
                            className="px-2"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            {quickResponses?.map((q) => (
                              <li
                                key={q}
                                className="py-2 px-3 mb-2"
                                style={{
                                  boxShadow: "1px 1px 1px 1px lightgrey",
                                  width: "100%",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setMessage(q)}
                              >
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <ul
                        className="message_sender_list px-3"
                        style={{ marginBottom: 0 }}
                      >
                        <li onClick={() => setShowQuick((p) => !p)}>
                          Quick Response
                        </li>
                      </ul>
                      <div className="input-wrapper d-flex-align-center py-2">
                        <input
                          value={message}
                          type="text"
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write a message"
                          onKeyUp={(e) => {
                            e.stopPropagation();
                            var event = e || window.event;
                            var charCode = event.which || event.keyCode;

                            if (charCode === "13") {
                              // Enter pressed
                              messageSender();
                            }
                          }}
                        />
                        <button
                          type="button"
                          value=""
                          onClick={() => messageSender()}
                          id="message-submit"
                          disabled={!message?.trim()}
                        ></button>

                        <i className="fas fa-paperclip"></i>
                        <i className="far fa-smile-beam"></i>
                        <label
                          disabled={!message?.trim()}
                          htmlFor="message-submit"
                          className="icon-wrapper"
                        >
                          <svg
                            width="31"
                            height="31"
                            viewBox="0 0 31 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="31"
                              height="31"
                              rx="4"
                              fill={!message?.trim() ? "lightgrey" : "#2D96D6"}
                            />
                            <path
                              d="M18.4151 10.7267L13.1476 12.4767C9.60674 13.6609 9.60674 15.5917 13.1476 16.77L14.7109 17.2892L15.2301 18.8525C16.4084 22.3934 18.3451 22.3934 19.5234 18.8525L21.2792 13.5909C22.0609 11.2284 20.7776 9.93919 18.4151 10.7267ZM18.6017 13.865L16.3851 16.0934C16.2976 16.1809 16.1867 16.2217 16.0759 16.2217C15.9651 16.2217 15.8542 16.1809 15.7667 16.0934C15.5976 15.9242 15.5976 15.6442 15.7667 15.475L17.9834 13.2467C18.1526 13.0775 18.4326 13.0775 18.6017 13.2467C18.7709 13.4159 18.7709 13.6959 18.6017 13.865Z"
                              fill="white"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* right side */}
            {ticket ? (
              <div className="right-side" style={{ maxHeight: "85vh" }}>
                <div className="mb-2">
                  <span className="text-muted me-2">Operator:</span>
                  <b>{handler?.name}</b>
                </div>
                {(user.isCompany && user.cID === handler._id) ||
                user.operatorID === handler._id ? (
                  ticket?.status === "Resolved" ? null : (
                    <div className="top-area d-flex-align-center">
                      <NeutralButton
                        onClick={() => resolve()}
                        className="open-btn"
                      >
                        Mark as Resolved
                      </NeutralButton>

                      <button onClick={() => setOpen((p) => !p)}>
                        Assign Ticket
                      </button>
                    </div>
                  )
                ) : null}
                <div className="profile-area">
                  <div style={{ position: "relative" }}>
                    <div
                      className="livechat-tag"
                      style={{
                        background: visitor?.color || "red",
                        height: "100px",
                        width: "100px",
                        fontWeight: "bold",
                        fontSize: "45px",
                      }}
                    >
                      {ticket?.emailData?.from?.value[0]?.name?.slice(0, 1) ||
                        0}
                    </div>
                  </div>
                  <p className="name">
                    {" "}
                    {ticket?.emailData?.from?.value[0]?.name}
                  </p>
                  <p className="email">
                    {" "}
                    {ticket?.emailData?.from?.value[0]?.address}
                  </p>
                </div>
                <ul className="options-area d-flex-align-center">
                  <li className="active">Info</li>
                </ul>
                <div className="info-area">
                  <div className="personal-info">
                    <div className="info-box d-flex-align-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                          stroke="#2D96D6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                          stroke="#2D96D6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Email Address</h4>
                        <p> {ticket?.emailData?.from?.value[0]?.address}</p>
                      </div>

                      <div className="icon-wrapper">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.75 3.5H5.25C5.05109 3.5 4.86032 3.57902 4.71967 3.71967C4.57902 3.86032 4.5 4.05109 4.5 4.25V16.25C4.5 16.4489 4.57902 16.6397 4.71967 16.7803C4.86032 16.921 5.05109 17 5.25 17H14.75C14.9489 17 15.1397 16.921 15.2803 16.7803C15.421 16.6397 15.5 16.4489 15.5 16.25V4.25C15.5 4.05109 15.421 3.86032 15.2803 3.71967C15.1397 3.57902 14.9489 3.5 14.75 3.5ZM14.5 16H5.5V4.5H14.5V16Z"
                            fill="#9CA2C9"
                          />
                          <path
                            d="M13 1.75C13 1.55109 12.921 1.36032 12.7803 1.21967C12.6397 1.07902 12.4489 1 12.25 1H2.75C2.55109 1 2.36032 1.07902 2.21967 1.21967C2.07902 1.36032 2 1.55109 2 1.75V13.75C2 13.9489 2.07902 14.1397 2.21967 14.2803C2.36032 14.421 2.55109 14.5 2.75 14.5H3V2H13V1.75Z"
                            fill="#9CA2C9"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* 
                    <div className="info-box d-flex-align-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                          stroke="#2D96D6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Handled By</h4>
                        <p>{handler?.name}</p>
                      </div>
                    </div> */}
                  </div>
                  <div className="tags-area">
                    <label htmlFor="add-tags">Add Tags</label>
                    <textarea
                      name=""
                      id="add-tags"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailTicketConversation;
