import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import PersonBig from "../../Assets/img/PersonBig.png";
import time from "../../Assets/img/svg/time.svg";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { useHistory, useParams } from "react-router";
import NeutralButton from "App/component/NeutralButton";
import { SocketContext } from "App/context/socket";
import { generateRoomID } from "App/helpers/generateRoomID";
import { format } from "date-fns";
import copy from "clipboard-copy";
import styled from "styled-components";
import SpainFlag from "../../Assets/img/flag-spain.png";
<<<<<<< HEAD
import SideBarLogo from "../../Assets/img/Pavelify.png";
import Image1 from "../../Assets/chatbot/Image1.png";
import Image2 from "../../Assets/chatbot/Image2.png";
import Image3 from "../../Assets/chatbot/Image3.png";
import Image4 from "../../Assets/chatbot/Image4.png";
import Image5 from "../../Assets/chatbot/Image5.png";
import Image6 from "../../Assets/chatbot/Image6.png";
import { useState } from "react";
function LiveChat() {
  const [start, setstart] = useState(true);
=======
import Modal from "App/component/Modal";
import { Helmet } from "react-helmet-async";
import Picker from "emoji-picker-react";
import ReactHtmlParser from "react-html-parser";
import linkify from "helpers/linkify";
import {
  changeFileName,
  loadAttachment,
  onFilePicked,
  toBase64,
} from "helpers/fileUpload";
import { useQuery } from "react-query";
import {
  fetchOperatorsAndDepartments,
  fetchSettings,
  getChats,
} from "Lib/Axios/endpoints/queries";

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

let audio = new Audio("/sound/newMessage.wav");

window.prevLoaded = false;
function LiveChat() {
  const inputFile = useRef(null);
  const history = useHistory();
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [showQuick, setShowQuick] = useState(false);
  const [notesS, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const [operator, setOperator] = useState(0);
  const [currentSideTab, setCurrentSideTab] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  const {
    data: { operators, departments },
  } = useQuery("operatorsAndDepartments", fetchOperatorsAndDepartments, {
    initialData: {},
  });

  const {
    data: { conversations, operatorID, pages, chatter, visitor, notes },
    refetch,
    isFetched,
  } = useQuery(["chats", params.user], getChats, {
    initialData: {},
    keepPreviousData: true,
  });

  if (isFetched && !params.user && conversations.length) {
    history.push(`/LiveChat/${conversations[0]?.uuid}`);
  }

  const {
    data: { quickResponse: quickResponses },
  } = useQuery("settings", fetchSettings, {
    initialData: {},
  });

  const onEmojiClick = (event, emojiObject) => {
    setMessage((m) => m + emojiObject.emoji);
  };

>>>>>>> 3ad231ae94166de0ebc784db6cabad6e611a57b9
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

  const closeQuickResponse = () => {
    if (showQuick) {
      setShowQuick(false);
    }
  };

  const uploadAttachment = async (e) => {
    const file = onFilePicked(e);
    if (!file) return;
    try {
      const fileBase64 = await toBase64(file);

      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/chat/uploadAttachment`,
        data: {
          file: fileBase64,
          type: file.type,
        },
      })
        .then((result) => {
          if (result.data.success) {
            sendTheMessage(result.data.message, true);
            addConversations([
              {
                message: result.data.message,
                attachment: true,
                sender: "Operator",
                seen: false,
                timestamp: new Date(),
              },
            ]);
          } else {
            //
            const alertID = StatusAlertService.showError("File not uploaded");
          }
        })
        .catch((e) => {
          StatusAlertService.showError(handleError(e));
        });
    } catch (e) {
      return console.log(e);
    }
  };

  useEffect(() => {
    if (chatter && chatter === params?.user) {
      socket.emit("joinRoom", generateRoomID(user.cID, chatter));

      !window.prevLoaded &&
        socket.emit("loadPreviousConversation", {
          companyID: user.cID,
          uuid: chatter,
        });
      socket.emit("operatorJoined", {
        roomID: generateRoomID(user.cID, chatter),
        operatorName: user.name,
        picture: user?.picture,
      });

      socket.on("previousConversation", (convs) => {
        if (!window.prevLoaded && convs.chats) {
          window.prevLoaded = true;

          convs.chats && addConversations(convs.chats);
        }
      });
      socket.on("message", (message) => {
        addConversations([message], true);
      });
    }
    return () => {
      window.prevLoaded = false;
      socket.off("previousConversation");
      socket.off("message");
      setChats([]);
    };
  }, [chatter, socket]);

  useEffect(() => {
    scrollDown();
  }, [chats]);

  const addConversations = useCallback((convs, newMessage = false) => {
    newMessage && audio.play();
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

    let message = chat.attachment
      ? loadAttachment(chat.message) || linkify(chat.message)
      : linkify(chat.message);

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
              <p style={{ wordWrap: "break-word" }}>
                {ReactHtmlParser(message)}
              </p>
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
              <p style={{ wordWrap: "break-word" }}>
                {ReactHtmlParser(message)}
              </p>
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
              <p style={{ wordWrap: "break-word" }}>
                {ReactHtmlParser(message)}
              </p>
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
              <p style={{ wordWrap: "break-word" }}>
                {ReactHtmlParser(message)}
              </p>
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
          seen: false,
          timestamp: new Date(),
        },
      ]);

      setMessage("");
      scrollDown();
    } else {
      return false;
    }
  };
  const sendTheMessage = (message, attachment = false) => {
    socket.emit("message", {
      message,
      roomID: generateRoomID(user.cID, chatter),
      attachment,
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
          // setOperatorID(newOperatorID);
          // setOperator(0);
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
    <div className="LiveChat main-wrapper d-flex" onClick={closeQuickResponse}>
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
<<<<<<< HEAD
                <div
                  className="user d-flex-align-center"
                  onClick={(e) => setstart(true)}
                >
                  <div className="images_wrapper">
                    <img src={SideBarLogo} alt="" />
                  </div>
                  <div className="presentation d-flex-align-center">
                    <div className="left-side">
                      <h4>Pavelify Team</h4>
                      <p>Hey! Simple Bot here...</p>
                    </div>
                    <div className="right-side">
                      <p>10:00 AM</p>
                    </div>
                  </div>
                </div>
                <div
                  className="user d-flex-align-center"
                  onClick={(e) => setstart(false)}
                >
                  <div className="images_wrapper">
                    <img src={Person1} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>
                  <div className="presentation d-flex-align-center">
                    <div className="left-side">
                      <h4>Jhon Smith</h4>
                      <p>Hello sir...</p>
                    </div>
                    <div className="right-side">
                      <p>10:00 AM</p>
                      <span className="badge d-flex-align-center">2</span>
                    </div>
                  </div>
                </div>
                <div
                  className="user d-flex-align-center"
                  onClick={(e) => setstart(false)}
                >
                  <div className="images_wrapper">
                    <img src={Person2} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>
=======
                {conversations?.map(
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
                        style={
                          conversation?.uuid === params.user
                            ? { background: "#ddd" }
                            : null
                        }
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
                              {(conversation?.latestChat?.message).includes(
                                '"file":'
                              ) ? (
                                <span>
                                  <i className="ms-2 me-1 fas fa-paperclip"></i>
                                  attachment
                                </span>
                              ) : (
                                conversation?.latestChat?.message
                              )}
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
>>>>>>> 3ad231ae94166de0ebc784db6cabad6e611a57b9
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
                <div
                  className="user d-flex-align-center"
                  onClick={(e) => setstart(false)}
                >
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
<<<<<<< HEAD
              </div>
              <div className={`messages-container-wrapper ${start && "white"}`}>
                {!start ? (
                  <div className="message-container">
                    <div className="message">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sem amet, metus fermentum fermentum, sed. Nec eu
                        elementum, non lacinia.
                      </p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />
                        <p>12:00</p>
                      </div>
                    </div>

                    <div className="message me">
                      <p>Hi Jhon</p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>

                    <div className="message queue">
                      <p>Lorem ipsum dolor sit amet</p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>
                    <div className="message queue">
                      <p>Yes of course</p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>

                    <div className="message">
                      {" "}
                      <img src={Person1} className="person_img_user" alt="" />
                      <p>Hello, How are you?, are you available?</p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>

                    <div className="message me queue">
                      <p>Yes of course</p>

                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>

                    <div className="message me">
                      <img src={Person1} className="person_img" alt="" />
                      <p>Hello, How are you?, are you available?</p>
                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="message-container"
                    style={{ background: "#fff" }}
                  >
                    <div className="profile_area">
                      <div className="images_wrapper">
                        <img src={SideBarLogo} alt="" />
                      </div>
                      <div className="presentation">
                        <h1>Pavelify Team</h1>
                        <small>3:59 AM</small>
                      </div>
                    </div>
                    <div className="content_area">
                      <p>Hey there, welcome to Pavelify.</p>
                      <p>
                        Here are a few things to get you started. We hope you
                        enjoy Pavelify and we look forward to supporting you
                        should you have any questions or need any assistance.{" "}
                      </p>
                    </div>

                    <ul className="ListChatBotDefault">
                      <li>
                        <a
                          href="https://app.pavelify.com/settings/LiveChat"
                          target="_blank"
                        >
                          <img src={Image1} alt="" />
                          <p>
                            Install the live chat widget to chat with your site
                            visitors
                          </p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://app.pavelify.com/settings/Account"
                          target="_blank"
                        >
                          <img src={Image2} alt="" />
                          <p>Upload a profile photo and update your profile</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://app.pavelify.com/settings/EmailSetup"
                          target="_blank"
                        >
                          <img src={Image3} alt="" />
                          <p>
                            Connect your support email to reply to customers
                          </p>
                        </a>
                      </li>{" "}
                      <li>
                        <a
                          href="https://app.pavelify.com/CalendarBooking/calendars"
                          target="_blank"
                        >
                          <img src={Image4} alt="" />
                          <p>Setup appointment scheduling</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://app.pavelify.com/operators"
                          target="_blank"
                        >
                          <img src={Image5} alt="" />
                          <p>Add team members /operators</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://app.pavelify.com/settings/Integrations"
                          target="_blank"
                        >
                          <img src={Image6} alt="" />
                          <p>Integrate your apps</p>
                        </a>
                      </li>
                    </ul>
                    <div className="message me queue defaultmessage">
                      <p>Thank you</p>

                      <div className="date-area d-flex-align-center">
                        <p className="name">Jhon</p>
                        <p>.</p>
                        <img src={time} alt="" />

                        <p>12:00</p>
                      </div>
                    </div>
                  </div>
                )}
                <form action="" className="message-sender-form">
                  <ul
                    className="message_sender_list"
                    style={{ marginBottom: 0 }}
                  >
                    <li>Quick Response</li>
                  </ul>
                  <div className="input-wrapper d-flex-align-center">
                    <input type="text" placeholder="Write a message" />
                    <input type="submit" value="" id="message-submit" />
                    <i class="fas fa-paperclip"></i>
                    <i class="far fa-smile-beam"></i>
                    <label
                      htmlFor="message-submit"
                      className="icon-wrapper"
                      id="message_sender_label"
                    >
                      Quick Response
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* right side */}
            {!start ? (
              <div className="right-side">
                <div className="top-area d-flex-align-center">
                  <button>Assign Chat</button>
                  <button>Forward Chat</button>
                </div>
                <div className="profile-area">
                  <div className="images_wrapper">
                    <img src={PersonBig} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>

                  <p className="name">Jhon Smith</p>
                  <p className="email">jhonsmith@gmail.com</p>
                </div>
                <ul className="options-area d-flex-align-center">
                  <li className="active">Profile</li>
                  <li>Viewed Pages</li>
                  <li>Notes</li>
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
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Email Address</h4>
                      </div>

                      <div className="icon-wrapper">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
=======
              </div> */}

                <div className="messages-container-wrapper position-relative">
                  <div className="message-container">
                    {chats &&
                      chats.map((chat, index) => loadMessages(chat, index))}
                    <div ref={messagesEndRef} />
                  </div>
                  {showEmoji ? (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "50px",
                        background: "white",
                        width: "80%",
                      }}
                    >
                      <div
                        className="pe-3 py-1"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          onClick={() => setShowEmoji((b) => !b)}
                          type="button"
                          style={{
                            border: "none",
                            textAlign: "right",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                      <Picker
                        pickerStyle={{ width: "100%" }}
                        onEmojiClick={onEmojiClick}
                      />
                    </div>
                  ) : null}
                  {/* {(user.isCompany && user.cID === operatorID) ||
                  user.operatorID === operatorID ? ( */}
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
                    <div className="input-wrapper py-2">
                      <div className=" d-flex-align-center mb-2">
                        <input
                          value={message}
                          type="text"
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write a message"
                          onKeyUp={(e) => {
                            e.stopPropagation();
                            var event = e || window.event;
                            var charCode = event.which || event.keyCode;

                            if (charCode === 13) {
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

                        <label
                          disabled={!message?.trim()}
                          htmlFor="message-submit"
                          className="icon-wrapper"
                        >
                          <svg
                            width="40"
                            height="40"
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
                      <div>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={() => inputFile.current.click()}
                        >
                          <i className="fas fa-paperclip"></i>
                        </button>
                        <input
                          type="file"
                          id="file"
                          onChange={uploadAttachment}
                          accept=".png,.jpeg,.jpg,.gif,.doc,.docx,.pdf,.xls,.xlsx,.mp4,.3gp,.txt,.csv,"
                          ref={inputFile}
                          style={{ display: "none" }}
                        />
                        <button
                          onClick={() => setShowEmoji((b) => !b)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          type="button"
                        >
                          <i className="far fa-smile-beam"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ) : null} */}
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
>>>>>>> 3ad231ae94166de0ebc784db6cabad6e611a57b9
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
<<<<<<< HEAD
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
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Phone Number</h4>
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
                          stroke="#9FABBE"
                          stroke-width="1.5"
                        />
                        <path
                          d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                          stroke="#9FABBE"
                          stroke-width="1.5"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Location</h4>
                      </div>
                    </div>
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
                  <div className="last-view-page">
                    <p>Last Viewed Pages</p>
                    <p className="link">Mar 12, 21 - https://websote.com...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="right-side">
                <div className="top-area d-flex-align-center">
                  <button>Email Us</button>
                  <button>Report Bug</button>
                </div>
                <div className="profile-area">
                  <div className="images_wrapper">
                    <img src={PersonBig} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>

                  <p className="name">Pavelify Team</p>
                  <p className="email">Pavelify@gmail.com</p>
                </div>
                <ul className="options-area d-flex-align-center">
                  <li className="active">Company</li>
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
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Email Address</h4>
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
                          stroke="#9FABBE"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                      </svg>

                      <div className="presentation">
                        <h4>Phone Number</h4>
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
                  </div>
                </div>
              </div>
            )}
=======
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
                        value={notesS}
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
>>>>>>> 3ad231ae94166de0ebc784db6cabad6e611a57b9
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
