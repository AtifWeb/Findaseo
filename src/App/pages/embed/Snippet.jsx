import { SocketContext } from "App/context/socket";
import { generateRoomID } from "App/helpers/generateRoomID";
import handleError from "App/helpers/handleError";
import { getVisitor, saveVisitor } from "App/helpers/visitor";
import Axios from "Lib/Axios/axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import "Assets/styles/css/widget.css";
import Person1 from "Assets/img/Frame 1.png";
import NeutralButton from "App/component/NeutralButton";
import {
  HandleBotDisplay,
  HandleCovertingScreen,
  HandleCovertingScreenReverse,
  ShowMessageContainer,
  ToggleBurgerBtn,
} from "./toggleShow";
import styles from "./snippet.module.css";
import { BookMeeting } from "App/component/organisms/LiveChat/BookMeeting/BookMeeting";
import { LiveChatConversation } from "App/component/organisms/LiveChat/LiveChatConversation/LiveChatConversation";
import { LiveChatSearch } from "App/component/organisms/LiveChat/LiveChatSearch/LiveChatSearch";

import { TextMessage } from "App/component/Atoms/LiveChat/TextMessage";
import { Message } from "App/component/organisms/LiveChat/helper/Messages";
import SenderIcon from "../../../Assets/img/sender.svg";
import styles2 from "./LiveChatMessageArea.module.css";
import capitalize from "helpers/capitalize";
import { useLayoutEffect } from "react";

let checkDesktop = null;

const Snippet = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user, setTheUser] = useState(getVisitor(params.company));
  const [prevLoaded, setPrevLoaded] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState(" Do you need any assistance?");
  const [askName, setAskName] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [weOnline, setWeOnline] = useState(true);
  const [operator, setOperator] = useState({});
  const [startConversation, setStartConversation] = useState(false);
  const [preChat, setPreChat] = useState();
  const [loading, setLoading] = useState(true);
  const [appearance, setAppearance] = useState();
  const [sidebar, setSidebar] = useState();
  const [menus, setMenus] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [pageView, setPageView] = useState({});
  const [innerSize, setInnerSize] = useState({
    width: 1000,
    height: 1000,
  });

  const URL = window.location.protocol + "//" + window.location.host;
  //hostname

  const openStandalone = () => {
    window.open(
      `${URL}/embed/${params.company}`,
      "_blank",
      "width=500,height=500,left=50,top=50"
    );
  };

  useEffect(() => {
    startConversation && sendPageView();
  }, [startConversation]);

  const handlePreviousConversation = (convs) => {
    if (!prevLoaded && !chats.length) {
      setPrevLoaded(true);
      convs.chats && addConversations(convs.chats);
    }
  };

  const handleOnMessage = (message) => {
    addConversations([message]);
  };

  const handleOperatorJoined = (data) => {
    setWeOnline(false);
    setOperator(data);
  };

  const sendPageView = () => {
    const v = getVisitor(params.company);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/conversation/addPageView`,
      data: {
        cID: params.company,
        page: pageView.href,
        uuid: v.uuid,
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

  const handleAcceptance = (data) => {
    saveGlobalUser(data);

    socket.emit("joinRoom", generateRoomID(params.company, data.uuid));
    //Start the conversationn
    setStartConversation(true);
    setAskName(false);
    ShowMessageContainer();
    greetTheUser();
    !prevLoaded && loadPreviousConversation();
  };

  const handleIframeMessages = (message) => {
    const data = JSON.parse(message.data);
    if (data?.type === "SCREEN_SIZE") {
      setInnerSize(data?.value);
      ToggleBurgerBtn(data?.value);
    } else if (data?.type === "PAGE_VIEW") {
      setPageView(data?.value);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleIframeMessages, false);
    // window.addEventListener("resize", ToggleBurgerBtn);
    getConfigurations();
    return () => {
      // window.removeEventListener("resize", ToggleBurgerBtn);
      window.removeEventListener("message", handleIframeMessages, false);
    };
  }, []);

  useEffect(() => {
    if (user) {
      greetTheUser();
      socket.emit("existingClient", { ...user, cID: params.company });
      updateInfo();
    } else {
      askForName();
    }

    socket.on("operatorJoined", handleOperatorJoined);

    socket.on("acceptance", handleAcceptance);

    socket.on("previousConversation", handlePreviousConversation);

    socket.on("message", handleOnMessage);
    return () => {
      socket.off("operatorJoined", handleOperatorJoined);
      socket.off("previousConversation", handlePreviousConversation);
      socket.off("message", handleOnMessage);
      socket.on("acceptance", handleAcceptance);
    };
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [chats]);

  const loadPreviousConversation = () => {
    socket.emit("loadPreviousConversation", {
      companyID: params.company,
      uuid: user.uuid,
    });
  };

  const askForName = () => {
    setAskName(true);
  };

  const greetTheUser = () => {};

  const updateInfo = () => {
    if (!user.uuid) return;
    let dat = {
      name: user?.name ? user?.name : "",
      uuid: user.uuid,
    };

    socket.emit("updateInfo", dat);
  };

  const saveGlobalUser = (user) => {
    let currentUser = getVisitor(params.company);
    if (currentUser) {
      currentUser = { ...currentUser, ...user };
    } else {
      currentUser = { ...user };
    }
    saveVisitor(currentUser, params.company);
    setTheUser(currentUser);
  };

  const addConversations = useCallback((convs) => {
    setChats((chats) => [...chats, ...convs]);
  }, []);

  const sendName = () => {
    if (preChat?.surveyFields?.name?.enabled && !name?.trim()) return;
    if (preChat?.surveyFields?.email?.enabled && !email?.trim()) return;
    if (preChat?.surveyFields?.phoneNumber?.enabled && !phoneNumber?.trim())
      return;
    sendNewAcceptance({ name, email, phoneNumber });
  };

  const sendTheMessage = (message) => {
    socket.emit("message", {
      message,
      roomID: generateRoomID(params.company, user.uuid),
      name: user.name,
      visitor: true,
    });
  };

  const messageSender = () => {
    if (message && message.trim()) {
      sendTheMessage(message);

      addConversations([
        {
          message,
          sender: "Visitor",
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

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendNewAcceptance = (dat = {}) => {
    socket.emit("newClient", { ...user, ...dat, cID: params.company });
  };

  const getConfigurations = () => {
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/embed${
        params.company ? "/" + params.company : ""
      }`,
      data: {},
    })
      .then((result) => {
        if (result.data.success) {
          setPreChat(
            JSON.parse(result.data.configuration?.chatConfiguration?.preChat)
          );
          setAppearance(
            JSON.parse(result.data.configuration?.chatConfiguration?.appearance)
          );
          setSidebar(
            JSON.parse(result.data.configuration?.chatConfiguration?.sidebar)
          );

          setCompanyName(result.data?.companyName);

          setLoading(false);
          // console.log({
          //   prechat: JSON.parse(
          //     result.data.configuration?.chatConfiguration?.preChat
          //   ),
          // });
          // console.log({
          //   appearance: JSON.parse(
          //     result.data.configuration?.chatConfiguration?.appearance
          //   ),
          // });
          // console.log({
          //   sidebar: JSON.parse(
          //     result.data.configuration?.chatConfiguration?.sidebar
          //   ),
          // });
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
    !!sidebar && (
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          [appearance?.widgetPosition]: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={`text-white ${styles.CollapseAbleLiveChat} ${
            innerSize?.width <= 600 ? styles.CollapseAbleLiveChat_600 : ""
          } ${
            innerSize?.width <= 400 ? styles.CollapseAbleLiveChat_400 : ""
          } collapse-bot `}
          id="collpase-area"
          style={{ background: appearance?.backgroundColor }}
        >
          {askName ? (
            <>
              <div
                id="introductionWidget"
                className={styles.introductionWidget}
              >
                <div className={styles.top}>
                  <div
                    className={styles.CloseIcon}
                    onClick={(e) => HandleBotDisplay(e, innerSize)}
                    onTouchStart={(e) => HandleBotDisplay(e, innerSize)}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <h1
                    className={`${styles.heading} ${
                      innerSize?.width <= 400 ? styles.heading_400 : ""
                    }`}
                  >
                    Hello from {capitalize(companyName)} 👋🏻
                  </h1>
                  <p className={styles.para}>
                    {/* Our mission is to help and inspire 1 Billion people 🚀 How
                    can we help you today? */}
                    {appearance?.gettingStartedMessage}
                  </p>
                </div>
                <LiveChatConversation
                  text={
                    user?.name
                      ? "Continue Conversation"
                      : "Start New Conversation"
                  }
                  companyName={companyName}
                  HandleCovertingScreen={
                    user?.name
                      ? () => setAskName((pr) => !pr)
                      : HandleCovertingScreen
                  }
                />
                {/* <LiveChatSearch /> */}
                <BookMeeting
                  company={params.company}
                  companyName={companyName}
                />
              </div>
              <PrechatSurvey
                close={() => setOpen((prev) => !prev)}
                preChat={preChat}
                appearance={appearance}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                sendName={sendName}
              />
            </>
          ) : (
            <>
              <div
                className={`${styles2.LiveChatMessageArea} ${
                  innerSize?.width <= 600 ? styles2.LiveChatMessageArea_600 : ""
                }`}
                id="MessageArea"
              >
                <div
                  className={`${styles2.top} ${
                    innerSize?.width <= 600 ? styles2.top_600 : ""
                  }`}
                  style={{ background: appearance?.backgroundColor }}
                >
                  <div
                    className={styles2.CloseIcon}
                    onClick={() => setAskName((prev) => !prev)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </div>
                  {operator?.name ? (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "1rem",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt="Support"
                        src={Person1}
                        className="rounded-circle float-start me-2 "
                      />
                      <span className="d-inline-block pt-1">
                        {operator?.name}
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className={styles2.presentation}>
                    <h3 className={styles2.heading_top}>
                      {" "}
                      {capitalize(companyName)}
                    </h3>
                    <p className={styles2.para_top}>
                      {/* Our mission is to help and i... */}
                      {appearance?.gettingStartedStatus}
                    </p>
                  </div>
                  <div
                    className=""
                    style={{ position: "absolute", right: ".5rem" }}
                  >
                    <NeutralButton
                      className="d-flex"
                      type="button"
                      id="optionsDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => setMenus((prev) => !prev)}
                    >
                      <i className="text-white fa fa-ellipsis-v"></i>
                    </NeutralButton>
                  </div>
                  {menus && (
                    <ul
                      className="dropdown-menu boxChat"
                      aria-labelledby="optionsDropdown"
                      style={{
                        position: "absolute",
                        background: "white",
                        right: "20px",
                        top: "60px",
                        borderRadius: "12px",
                        padding: "20px 12px",
                        boxShadow: "2px 2px 2px lightgrey",
                      }}
                    >
                      <li className="mb-2">
                        <a className="dropdown-item" href="#">
                          Turn off notifications
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Turn on sound
                        </a>
                      </li>
                    </ul>
                  )}
                </div>

                <div className={styles2.body}>
                  <div
                    className={`${styles2.bodyContent} ${
                      innerSize?.width <= 600 ? styles2.bodyContent_600 : ""
                    }`}
                  >
                    {chats.map((Message, index) => (
                      <TextMessage
                        primaryColor={appearance?.backgroundColor}
                        key={String(index)}
                        text={Message?.message?.trim()}
                        my_message={Message.sender === "Visitor"}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <div style={{ background: "white", textAlign: "center" }}>
                    <small className="text-muted py-auto">
                      {" "}
                      Powered by{" "}
                      <i
                        style={{ color: appearance?.backgroundColor }}
                        className="fa fa-bolt "
                      ></i>{" "}
                      <b>Pavelify</b>
                    </small>
                  </div>
                  <div className={styles2.form}>
                    <div className={styles2.inputWrapper}>
                      <input
                        type="text"
                        placeholder="Send a message"
                        className={styles2.input}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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

                      <div
                        title="Insert an Emoji"
                        className={`${styles2.IconWrapper} ${styles2.Smile}`}
                      >
                        <i className="far fa-smile-wink"></i>
                      </div>
                      <div
                        title="Attach a file"
                        className={styles2.IconWrapper}
                      >
                        <i className="fas fa-paperclip"></i>
                      </div>
                      {message?.trim() ? (
                        <div className="me-3">
                          <button
                            onClick={() => messageSender()}
                            disabled={!message?.trim()}
                            title="Send"
                            className={` text-white text-center  ${styles2.sendBtn}`}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              border: "none",
                              cursor: "pointer",
                              boxShadow: `grey 0px 22px 70px 4px`,
                            }}
                          >
                            <img src={SenderIcon} />
                            {/* <i
                              style={{ fontSize: "13px" }}
                              className="fa fa-arrow-right"
                            ></i> */}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
            // <div className="w-100 boxChat">
            //   {/* <LiveChatMessageArea /> */}
            //   <div>
            //     <div
            //       style={{
            //         borderTopRightRadius: "14px",
            //         borderTopLeftRadius: "14px",
            //         backgroundColor: appearance?.backgroundColor,
            //       }}
            //       className="bg-gradient py-4 px-2 d-flex justify-content-between align-items-center text-light"
            //     >
            //       {operator?.name ? (
            //         <div>
            //           <img
            //             style={{ width: "30px", height: "30px" }}
            //             alt="Support"
            //             src={Person1}
            //             className="rounded-circle float-start me-2 "
            //           />
            //           <span className="d-inline-block pt-1">
            //             {operator?.name}
            //           </span>
            //         </div>
            //       ) : (
            //         <div></div>
            //       )}
            //       <h4>{appearance?.gettingStartedStatus}</h4>
            //       <div className="d-flex justify-content-center">
            //         <NeutralButton
            //           className="d-flex"
            //           type="button"
            //           id="optionsDropdown"
            //           data-bs-toggle="dropdown"
            //           aria-expanded="false"
            //           onClick={() => setMenus((prev) => !prev)}
            //         >
            //           <i className="text-white fa fa-ellipsis-v"></i>
            //         </NeutralButton>
            //         <NeutralButton
            //           onClick={() => setOpen((prev) => !prev)}
            //           className="d-flex text-white"
            //         >
            //           <i className="text-light fa fa-chevron-down"></i>
            //         </NeutralButton>
            //       </div>
            //       {menus && (
            //         <ul
            //           className="dropdown-menu boxChat"
            //           aria-labelledby="optionsDropdown"
            //           style={{
            //             position: "absolute",
            //             background: "white",
            //             right: "20px",
            //             top: "60px",
            //             borderRadius: "12px",
            //             padding: "20px 12px",
            //             boxShadow: "2px 2px 2px lightgrey",
            //           }}
            //         >
            //           <li className="mb-2">
            //             <a className="dropdown-item" href="#">
            //               Turn off notifications
            //             </a>
            //           </li>
            //           <li>
            //             <a className="dropdown-item" href="#">
            //               Turn on sound
            //             </a>
            //           </li>
            //         </ul>
            //       )}
            //     </div>

            //     <div className="bg-sub-info py-2 text-white px-3 boxChat">
            //       <span>
            //         <i
            //           style={{ fontSize: "5px" }}
            //           className="fa fa-circle text-success me-3 align-middle"
            //         ></i>
            //       </span>
            //       <span className="">{appearance?.onlineStatus}</span>
            //     </div>

            //     <div
            //       style={{ height: "350px" }}
            //       className=" messages px-2 my-2"
            //     >
            //       {chats &&
            //         chats.map((chat, index) => (
            //           <p
            //             style={
            //               chat.sender === "Operator"
            //                 ? {
            //                     backgroundColor: appearance?.backgroundColor,
            //                     color: "white",
            //                   }
            //                 : null
            //             }
            //             key={String(index)}
            //             className={`mb-1 ${
            //               chat.sender === "Visitor" ? "right" : "left"
            //             }`}
            //           >
            //             {chat.message.trim()}
            //           </p>
            //         ))}
            //       <div ref={messagesEndRef} />
            //     </div>
            //     <div className="border-top">
            //       <div className="d-flex justify-content-center">
            //         <div
            //           style={{
            //             width: "90%",
            //             height: "0.05rem",
            //             background: "lightgrey",
            //           }}
            //         >
            //           {" "}
            //         </div>
            //       </div>
            //       <div className="d-flex justify-content-center">
            //         <input
            //           className="form-control border-0 py-3 px-4 "
            //           style={{ border: "none", width: "96%" }}
            //           placeholder="Type your message to respond..."
            //           type="text"
            //           value={message}
            //           onChange={(e) => setMessage(e.target.value)}
            //           onKeyUp={(e) => {
            //             e.stopPropagation();
            //             var event = e || window.event;
            //             var charCode = event.which || event.keyCode;

            //             if (charCode === "13") {
            //               // Enter pressed
            //               messageSender();
            //             }
            //           }}
            //         />
            //       </div>
            //     </div>

            //     <div
            //       style={{
            //         borderBottomRightRadius: "14px",
            //         borderBottomLeftRadius: "14px",
            //       }}
            //       className="px-2 position-relative bg-white pt-3"
            //     >
            //       <button
            //         title="Attach file"
            //         type="button"
            //         className=" text-muted me-4 ms-3"
            //         style={{
            //           display: "inline",
            //           border: "none",
            //           background: "white",
            //           fontSize: "17px",
            //           cursor: "pointer",
            //         }}
            //       >
            //         <i className="fa fa-paperclip"></i>
            //       </button>
            //       <button
            //         type="button"
            //         className=" text-muted "
            //         style={{
            //           display: "inline",
            //           border: "none",
            //           background: "white",
            //           fontSize: "17px",
            //           cursor: "pointer",
            //         }}
            //         title="Insert Emoji"
            //       >
            //         <i className="fa fa-smile"></i>
            //       </button>

            //       <small className="text-muted py-auto ms-5">
            //         {" "}
            //         Powered by{" "}
            //         <i
            //           style={{ color: appearance?.backgroundColor }}
            //           className="fa fa-bolt "
            //         ></i>{" "}
            //         <b>Pavelify</b>
            //       </small>

            //       <div
            //         className="text-end d-inline-block position-absolute "
            //         style={{ left: "92%", bottom: "0px" }}
            //       >
            //         <button
            //           onClick={() => messageSender()}
            //           disabled={!message?.trim()}
            //           title="Send"
            //           className={` text-white text-center  ${
            //             !message?.trim() ? "disabled" : ""
            //           }`}
            //           style={{
            //             width: "57px",
            //             height: "57px",
            //             backgroundColor: appearance?.backgroundColor,
            //             borderRadius: "50%",
            //             border: "none",
            //             cursor: "pointer",
            //             boxShadow: `grey 0px 22px 70px 4px`,
            //           }}
            //         >
            //           <i
            //             style={{ fontSize: "20px" }}
            //             className="fa fa-arrow-right"
            //           ></i>
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
        <div
          style={{
            // alignSelf:
            //   appearance?.widgetPosition === "right"
            //     ? "flex-end"
            //     : "flex-start",
            marginTop: "10px",
            display: "flex",
            alignSelf: "flex-end",
          }}
        >
          {appearance?.widgetPosition === "right" && (
            <ButtonLabel
              show={appearance?.showButtonLabel}
              buttonLabelText={appearance?.buttonLabelText}
            />
          )}
          <button
            onClick={(e) => HandleBotDisplay(e, innerSize)}
            // onTouchStart={HandleBotDisplay}
            id="burgerButton"
            // onClick={() => setOpen((prev) => !prev)}
            className="boxs"
            style={{
              backgroundColor: appearance?.backgroundColor,
              color: "white",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              width: "50px",
              height: "50px",
              boxShadow: `${appearance?.backgroundColor} 0px 22px 70px 4px`,
              zIndex: `${Number.MAX_SAFE_INTEGER}`,
            }}
            // id="open-chat"
          >
            <i id="closeIconButton" className="fa  fa-comment-alt  fa-lg"></i>
          </button>
          {/* {appearance?.widgetPosition === "left" && (
            <ButtonLabel
              show={appearance?.showButtonLabel}
              buttonLabelText={appearance?.buttonLabelText}
            />
          )} */}
        </div>
      </div>
    )
  );
};

const PrechatSurvey = ({
  preChat,
  appearance,
  close,
  phoneNumber,
  setPhoneNumber,
  name,
  setName,
  email,
  setEmail,
  sendName,
}) => {
  return (
    <div
      id="prechat"
      className="bg-white justify-content-center align-items-center w-100"
      style={{ display: "none", padding: "1.5rem" }}
    >
      <div
        className={styles.CloseIcon}
        onClick={HandleCovertingScreenReverse}
        onTouchStart={HandleCovertingScreenReverse}
      >
        <i className="fas fa-times"></i>
      </div>

      <div id="name-entry" className={``}>
        <h3 className="mb-5 mt-3 ">{preChat.introductionMessage}</h3>
        {preChat?.surveyFields?.name?.enabled && (
          <input
            id="user-name"
            type="text"
            placeholder={preChat?.surveyFields?.name?.placeholder}
            className="form-control mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {preChat?.surveyFields?.email?.enabled && (
          <input
            id="user-email"
            type="email"
            placeholder={preChat?.surveyFields?.email?.placeholder}
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {preChat?.surveyFields?.phoneNumber?.enabled && (
          <input
            id="user-phone"
            type="tel"
            placeholder={preChat?.surveyFields?.phoneNumber?.placeholder}
            className="form-control mb-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        )}
        <div className="text-center mt-3">
          <button
            id="submit-name"
            type="submit"
            className="btn btn-primary btn-block"
            // style={{ background: appearance?.backgroundColor }}
            onClick={sendName}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const ButtonLabel = ({ show, buttonLabelText }) =>
  show && (
    <h5
      className=" px-4 py-2 my-auto me-3 ms-3"
      style={{
        borderRadius: "24px",
        boxShadow: "3px 3px 3px  #959697",
        fontWeight: "300",
        background: "white",
        color: "#333",
        fontSize: "17px",
      }}
    >
      {buttonLabelText}
    </h5>
  );

export default Snippet;
