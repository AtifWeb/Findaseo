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
import StatusAlert, { StatusAlertService } from "react-status-alert";
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
import copy from "clipboard-copy";
import styled from "styled-components";
import randomColor from "App/helpers/randomColor";
import SpainFlag from "../../Assets/img/flag-spain.png";
import Modal from "App/component/Modal";
import { Helmet } from "react-helmet";

window.currentDate = "";
window.currentWho = "";

const Status = styled.span`
  position: absolute;
  color: white;
  background-color: ${(props) => (props?.online ? "green" : "orange")};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  font-size: 12px;
  top: 10px;
  right: 15px;
`;

function LiveChat() {
  const history = useHistory();
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user] = useState(getUser());
  const [conversations, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatter, setChatter] = useState("");
  const [visitor, setVisitor] = useState(null);
  const params = useParams();
  const [prevLoaded, setPrevLoaded] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const { unreadChats } = useSelector((store) => store);
  const [showQuick, setShowQuick] = useState(false);
  const [quickResponses, setQuickResponses] = useState([]);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const [operators, setOperators] = useState([]);
  const [operator, setOperator] = useState(0);
  const [operatorID, setOperatorID] = useState("");
  const [pages, setPages] = useState([]);
  const [currentSideTab, setCurrentSideTab] = useState(0);

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
    fetchQuckResponse();
    fetchOperators();
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

  useEffect(() => {
    setPrevLoaded(false);
    socket.off("previousConversation");
    socket.off("message");
    setChats([]);
  }, [params?.user]);

  useEffect(() => {
    getChats();
  }, [history?.location]);

  const getChats = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/live-chat${
          params.user ? "/" + params.user : ""
        }`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setConversation(result.data.conversations);
            setOperatorID(result.data.operatorID);
            let p = result.data.pages;
            p.sort((a, b) => b.timestamp - a.timestamp);
            setPages(p);
            setChatter(result.data.user);
            setVisitor(result.data.visitor);

            setNotes(result.data.visitor.notes || "");
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

  useEffect(() => {
    if (chatter) {
      socket.emit("joinRoom", generateRoomID(user.cID, chatter));

      !prevLoaded &&
        socket.emit("loadPreviousConversation", {
          companyID: user.cID,
          uuid: chatter,
        });
      socket.emit("operatorJoined", {
        roomID: generateRoomID(user.cID, chatter),
        operatorName: user.name,
      });

      socket.on("previousConversation", (convs) => {
        if (!prevLoaded && convs.chats) {
          setPrevLoaded(true);
          // console.log(convs);
          convs.chats && addConversations(convs.chats);
        }
      });
      socket.on("message", (message) => {
        addConversations([message]);
      });
    }
  }, [chatter, socket]);

  useEffect(() => {
    scrollDown();
  }, [chats]);

  const addConversations = useCallback((convs) => {
    setChats((chats) => [...chats, ...convs]);
  }, []);

  const setCurrentdate = (date) => {
    window.currentDate = date;
  };

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateNotes = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/updateNotes`,
        data: {
          cID: user?.cID,
          notes,
          uuid: params.user,
        },
      })
        .then((result) => {
          if (result.data.success) {
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

  const loadMessages = (chat, index) => {
    let element;

    let nDate = format(new Date(chat.timestamp), "PP");
    if (chat.sender === "Visitor") {
      if (!window.currentDate || window.currentDate !== nDate) {
        element = (
          <React.Fragment key={String(index)}>
            <div
              className=""
              style={{
                textAlign: "center",
                padding: "6px 1px",
              }}
            >
              <small> {nDate}</small>
            </div>

            <div
              className={`message ${
                window.currentWho === "" || window.currentWho === "Visitor"
                  ? ""
                  : "queue"
              }`}
            >
              {/* <img src={Person1} className="person_img_user" alt="" /> */}
              <p>{chat.message}</p>
              <div className="date-area d-flex-align-center">
                <p className="name">{visitor.name}</p>
                <p>.</p>
                <img src={time} alt="" />

                <p>{format(new Date(chat.timestamp), "p")}</p>
              </div>
            </div>
          </React.Fragment>
        );

        setCurrentdate(String(nDate));
      } else {
        element = (
          <React.Fragment key={String(index)}>
            <div
              className={`message ${
                window.currentWho === "" || window.currentWho === "Visitor"
                  ? ""
                  : "queue"
              }`}
            >
              {/* <img src={Person1} className="person_user" alt="" /> */}
              <p>{chat.message}</p>
              <div className="date-area d-flex-align-center">
                <p className="name">{visitor.name}</p>
                <p>.</p>
                <img src={time} alt="" />

                <p>{format(new Date(chat.timestamp), "p")}</p>
              </div>
            </div>
          </React.Fragment>
        );
      }
      window.currentWho = "Visitor";
    } else if (chat.sender === "Server") {
      // its a server message
    } else {
      if (!window.currentDate || window.currentDate !== nDate) {
        element = (
          <React.Fragment key={String(new Date() + Math.random())}>
            <div
              className=""
              style={{
                textAlign: "center",
                padding: "6px 1px",
              }}
            >
              <small> {nDate}</small>
            </div>
            <div
              className={`message me ${
                window.currentWho === "" || window.currentWho === "Operator"
                  ? ""
                  : "queue"
              }`}
            >
              {/* <img src={Person1} className="person_img_user" alt="" /> */}
              <p>{chat?.message}</p>
              <div className="date-area d-flex-align-center">
                <p className="name">Jhon</p>
                <p>.</p>
                <img src={time} alt="" />

                <p>{format(new Date(chat.timestamp), "p")}</p>
              </div>
            </div>
          </React.Fragment>
        );
        setCurrentdate(String(nDate));
      } else {
        element = (
          <React.Fragment>
            <div
              className={`message me ${
                window.currentWho === "" || window.currentWho === "Operator"
                  ? ""
                  : "queue"
              }`}
            >
              {/* <img src={Person1} className="person_img_user" alt="" /> */}
              <p>{chat?.message}</p>
              <div className="date-area d-flex-align-center">
                <p className="name">{user?.name}</p>
                <p>.</p>
                <img src={time} alt="" />

                <p>{format(new Date(chat.timestamp), "p")}</p>
              </div>
            </div>
          </React.Fragment>
        );
      }
      window.currentWho = "Operator";
    }
    return element;
  };

  const messageSender = () => {
    if (message && message.trim()) {
      sendTheMessage(message);

      addConversations([
        {
          message,
          sender: "Operator",
          seend: false,
          timestamp: new Date(),
        },
      ]);

      setMessage("");
      scrollDown();
    } else {
      return false;
    }
  };
  const sendTheMessage = (message) => {
    socket.emit("message", {
      message,
      roomID: generateRoomID(user.cID, chatter),
    });
  };

  const copyLink = async (link) => {
    await copy(link);
    const alertID = StatusAlertService.showSuccess("Copied successfully");
  };

  const assignOperator = () => {
    let d = operators.filter(
      (o) => (user.isCompany && user.cID !== o.cID) || user.operatorID === o._id
    )[operator];
    let newOperatorID = d._id || d.cID;

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/assignOperatorToChat`,
      data: {
        cID: user?.cID,
        operatorID: newOperatorID,
        uuid: params.user,
      },
    })
      .then((result) => {
        if (result.data.success) {
          setLoading(false);
          setOperatorID(newOperatorID);
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

  return (
    <div className="LiveChat main-wrapper d-flex">
      <Helmet>
        <title>Live Chat - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="LiveChat" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="LiveChat" />
        <StatusAlert />

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
          <div className="messages-box-area">
            {/* left side */}
            <div className="left-side">
              <div className="top-area d-flex-align-center">
                <h3>Chats</h3>
                {/* <img src={PlusIcon} alt="" /> */}
              </div>

              <div>
                <div className="input-wrapper">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.22921 11.375C9.07117 11.375 11.375 9.07114 11.375 6.22918C11.375 3.38721 9.07117 1.08334 6.22921 1.08334C3.38724 1.08334 1.08337 3.38721 1.08337 6.22918C1.08337 9.07114 3.38724 11.375 6.22921 11.375Z"
                      stroke="#9CA2C9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9167 11.9166L10.8334 10.8333"
                      stroke="#9CA2C9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="text"
                    name={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search name..."
                  />
                </div>
              </div>

              <div className="users">
                {conversations.map(
                  (conversation, index) =>
                    // filter &&
                    conversation.name
                      .toLowerCase()
                      .indexOf(filter.toLowerCase()) !== -1 && (
                      // <NeutralButton
                      //   type="button"
                      //   className=""

                      // >
                      <div
                        onClick={() =>
                          history.push(`/LiveChat/${conversation?.uuid}`)
                        }
                        key={String(conversation?.uuid)}
                        className="user d-flex-align-center cursor-pointer"
                      >
                        <div className="images_wrapper">
                          {/* <img src={Person1} alt="" /> */}
                          <div
                            className="livechat-tag"
                            style={{
                              background: conversation?.color || "red",
                              marginRight: "5px",
                            }}
                          >
                            {conversation?.name?.slice(0, 1) || 0}
                          </div>
                          <img
                            style={{
                              display: "inline-block",
                            }}
                            src={
                              conversation?.countryCode?.toLowerCase()
                                ? `https://flagcdn.com/w20/${conversation?.countryCode?.toLowerCase()}.png`
                                : SpainFlag
                            }
                            alt=""
                            className="flag"
                          />
                        </div>
                        <div className="presentation d-flex-align-center">
                          <div className="left-side">
                            <h4>{conversation?.name}</h4>
                            <p>
                              {conversation?.latestChat?.sender ===
                              "Operator" ? (
                                <b style={{ color: "red" }}>Op:</b>
                              ) : (
                                ""
                              )}
                              {conversation?.latestChat?.message}
                            </p>
                          </div>
                          <div className="right-side">
                            <p>
                              {format(
                                new Date(conversation?.latestChat?.timestamp),
                                "p"
                              )}
                            </p>
                            {conversation?.hasNewMessage ? (
                              <span className="badge d-flex-align-center">
                                1
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      // </NeutralButton>
                    )
                )}
                {/* <div className="user d-flex-align-center">
                  <img src={Person2} alt="" />
                  <div className="presentation d-flex-align-center">
                    <div className="left-side">
                      <h4>Angel Mango</h4>
                      <p>How are you?</p>
                    </div>
                    <div className="right-side">
                      <p>10:26 AM</p>
                    </div>
                  </div>
                </div>
                <div className="user d-flex-align-center">
                  <div className="images_wrapper">
                    <img src={Person3} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>

                  <div className="presentation d-flex-align-center">
                    <div className="left-side">
                      <h4>Chance Gouse</h4>
                      <p>How are you?</p>
                    </div>
                    <div className="right-side">
                      <p>10:40 AM</p>
                      <span className="badge d-flex-align-center">1</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* middile side */}
            {visitor ? (
              <div className="middle-side">
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
                  <div className="message-container">
                    {chats &&
                      chats.map((chat, index) => loadMessages(chat, index))}
                    <div ref={messagesEndRef} />
                  </div>

                  {(user.isCompany && user.cID === operatorID) ||
                  user.operatorID === operatorID ? (
                    <div className="message-sender-form">
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
            {visitor ? (
              <div className="right-side">
                <div className="mb-2">
                  <span className="text-muted me-2">Operator:</span>
                  <b>
                    {
                      operators.filter(
                        (o) => o._id === operatorID || o.cID === operatorID
                      )[0]?.name
                    }
                  </b>
                </div>
                {(user.isCompany && user.cID === operatorID) ||
                user.operatorID === operatorID ? (
                  <div className="top-area d-flex-align-center">
                    <button onClick={() => setOpen((p) => !p)}>
                      Assign Chat
                    </button>
                    <button>Forward Chat</button>
                  </div>
                ) : null}
                <div className="profile-area">
                  <div style={{ position: "relative" }}>
                    {/* <img src={PersonBig} alt="" /> */}
                    <div
                      className="livechat-tag"
                      style={{
                        background: visitor?.color || "red",
                        height: "100px",
                        width: "100px",
                        fontSize: "45px",
                      }}
                    >
                      {visitor?.name?.slice(0, 1) || 0}
                    </div>
                    <img
                      style={{
                        display: "inline-block",
                      }}
                      src={
                        visitor?.info?.countryCode?.toLowerCase()
                          ? `https://flagcdn.com/w20/${visitor?.info?.countryCode?.toLowerCase()}.png`
                          : SpainFlag
                      }
                      alt=""
                      className="flag"
                    />
                    <Status online={visitor?.online}></Status>
                  </div>
                  <p className="name">{visitor?.name}</p>
                  <p className="email">{visitor?.email}</p>
                </div>
                <ul className="options-area d-flex-align-center">
                  <li
                    onClick={() => setCurrentSideTab(0)}
                    className={`cursor-pointer  ${
                      currentSideTab === 0 ? "active" : ""
                    }`}
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => setCurrentSideTab(1)}
                    className={`cursor-pointer  ${
                      currentSideTab === 1 ? "active" : ""
                    }`}
                  >
                    Viewed Pages
                  </li>
                  <li
                    onClick={() => setCurrentSideTab(2)}
                    className={`cursor-pointer  ${
                      currentSideTab === 2 ? "active" : ""
                    }`}
                  >
                    Notes
                  </li>
                </ul>
                {currentSideTab === 0 ? (
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
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="presentation">
                          <h4>Email Address</h4>
                          <p>{visitor?.email}</p>
                        </div>

                        <NeutralButton
                          className="icon-wrapper"
                          onClick={() => copyLink(visitor?.email)}
                        >
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
                        </NeutralButton>
                      </div>

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
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                        </svg>

                        <div className="presentation">
                          <h4>Phone Number</h4>
                          <p>{visitor?.phoneNumber}</p>
                        </div>

                        <NeutralButton
                          className="icon-wrapper"
                          onClick={() => copyLink(visitor?.phoneNumber)}
                        >
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
                        </NeutralButton>
                      </div>

                      <div className="info-box d-flex-align-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                          />
                        </svg>

                        <div className="presentation">
                          <h4>IP Address</h4>
                          <p>{visitor?.ip}</p>
                        </div>
                      </div>

                      <div className="info-box d-flex-align-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                            stroke="#9CA2C9"
                            strokeWidth="1.5"
                          />
                        </svg>

                        <div className="presentation">
                          <h4>Location</h4>
                          <p>
                            {visitor?.info?.city}, {visitor?.info?.countryName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tags-area">
                      <label htmlFor="add-tags">Add Tags</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        name=""
                        id="add-tags"
                        cols="30"
                        rows="10"
                      ></textarea>
                      <button
                        className="btn ms-5 mt-1 "
                        type="button"
                        onClick={updateNotes}
                      >
                        Save
                      </button>
                    </div>
                    <div className="last-view-page">
                      <p>Last Viewed Pages</p>
                      <p className="link">
                        {pages[0]
                          ? format(new Date(pages[0].timestamp), "PP") + " - "
                          : ""}{" "}
                        <a target="_blank" href={pages[0]?.url}>
                          {pages[0]?.url}
                        </a>{" "}
                        {pages[0] ? (
                          <span
                            style={{
                              backgroundColor: "#777",
                              borderRadius: "50%",
                              padding: "1px 5px",
                              color: "white",
                              marginLeft: "2px",
                            }}
                          >
                            {pages[0]?.count}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                ) : null}
                {currentSideTab === 1 ? (
                  <div className="info-area">
                    <div
                      className="last-view-page"
                      style={{ marginTop: "0px" }}
                    >
                      <h5>Viewed Pages</h5>
                      {pages?.map((page, index) => (
                        <p key={String(index)} className="link">
                          {format(new Date(page.timestamp), "PP")} -{" "}
                          <a target="_blank" href={page?.url}>
                            {page?.url}
                          </a>{" "}
                          <span
                            style={{
                              backgroundColor: "#777",
                              borderRadius: "50%",
                              padding: "1px 5px",
                              color: "white",
                              marginLeft: "2px",
                            }}
                          >
                            {page?.count}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
