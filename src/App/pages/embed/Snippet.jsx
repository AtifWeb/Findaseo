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

const Snippet = () => {
  //useScript("/js/snippet.js");
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user, setTheUser] = useState(getVisitor());
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
    getConfigurations();
  }, []);

  useEffect(() => {
    if (user) {
      greetTheUser();
      socket.emit("existingClient", { ...user, cID: params.company });
      updateInfo();
    } else {
      askForName();
    }

    socket.on("operatorJoined", (data) => {
      setWeOnline(false);
      setOperator(data);
    });

    socket.on("acceptance", (data) => {
      saveGlobalUser(data);

      socket.emit("joinRoom", generateRoomID(params.company, data.uuid));
      //Start the conversation
      setStartConversation(true);
      setAskName(false);
      greetTheUser();
      !prevLoaded && loadPreviousConversation();
    });

    socket.on("previousConversation", (convs) => {
      if (!prevLoaded) {
        setPrevLoaded(true);
        convs.chats && addConversations(convs.chats);
      }
    });

    socket.on("message", (message) => {
      addConversations([message]);
      console.log(message);
    });
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
    let currentUser = getVisitor();
    if (currentUser) {
      currentUser = { ...currentUser, ...user };
    } else {
      currentUser = { ...user };
    }
    saveVisitor(currentUser);
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
    // if (user) {
    //   saveGlobalUser({ name, email, phoneNumber });
    // } else {
    //   saveGlobalUser({ name, email, phoneNumber });
    // }
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
          setLoading(false);
          console.log({
            prechat: JSON.parse(
              result.data.configuration?.chatConfiguration?.preChat
            ),
          });
          console.log({
            appearance: JSON.parse(
              result.data.configuration?.chatConfiguration?.appearance
            ),
          });
          console.log({
            sidebar: JSON.parse(
              result.data.configuration?.chatConfiguration?.sidebar
            ),
          });
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        setLoading(false);
      });
  };
  let otherStyle = {
    background: "white",
    borderBottomRightRadius: "14px",
    borderBottomLeftRadius: "14px",
    height: "500px",
    width: "380px",
  };
  return (
    !!sidebar && (
      <div
        className={`w-full ${open ? "shadow-lg" : ""}`}
        style={
          open
            ? {
                ...{
                  position: "absolute",
                  bottom: "30px",
                  [appearance?.widgetPosition]: "30px",
                  display: "flex",
                  width: "380px",
                },
                ...otherStyle,
              }
            : {
                position: "absolute",
                bottom: "30px",
                [appearance?.widgetPosition]: "30px",
                display: "flex",
                background: "transparent",
              }
        }
      >
        {open ? (
          askName ? (
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
          ) : (
            <div className="w-100">
              <div
                className="shadow-lg"
                // style={{

                // }}
              >
                <div
                  style={{
                    borderTopRightRadius: "14px",
                    borderTopLeftRadius: "14px",
                    backgroundColor: appearance?.backgroundColor,
                  }}
                  className="bg-gradient py-4 px-2 d-flex justify-content-between text-light"
                >
                  {operator?.name ? (
                    <div>
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt="Support"
                        src="/images/logo.png"
                        className="rounded-circle float-start me-2"
                      />
                      <span>{operator?.name}</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <h4>{appearance?.gettingStartedStatus}</h4>
                  <div>
                    <button
                      className="btn"
                      type="button"
                      id="optionsDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="text-white fa fa-ellipsis-v"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="optionsDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                    </ul>
                    <button
                      onClick={() => setOpen((prev) => !prev)}
                      className="btn"
                    >
                      <i className="text-light fa fa-chevron-down"></i>
                    </button>
                  </div>
                </div>

                <div className="bg-sub-info py-2 text-white px-3">
                  <span>
                    <i
                      style={{ fontSize: "5px" }}
                      className="fa fa-circle text-success me-3 align-middle"
                    ></i>
                  </span>
                  <span className="">{appearance?.onlineStatus}</span>
                </div>

                <div
                  style={{ height: "280px" }}
                  className="bg-white messages px-2 my-2"
                >
                  {chats &&
                    chats.map((chat, index) => (
                      <p
                        style={
                          chat.sender === "Operator"
                            ? {
                                backgroundColor: appearance?.backgroundColor,
                                color: "white",
                              }
                            : null
                        }
                        key={String(index)}
                        className={`${
                          chat.sender === "Visitor" ? "right" : "left"
                        }`}
                      >
                        {chat.message.trim()}
                      </p>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="border-top">
                  <input
                    className="form-control border-0 py-3 px-4"
                    placeholder="Type your message to respond..."
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                      e.stopPropagation();
                      var event = e || window.event;
                      var charCode = event.which || event.keyCode;

                      if (charCode == "13") {
                        // Enter pressed
                        messageSender();
                      }
                    }}
                  />
                </div>

                <div
                  style={{
                    borderBottomRightRadius: "14px",
                    borderBottomLeftRadius: "14px",
                  }}
                  className="px-2 position-relative bg-white"
                >
                  <button title="Attach file" className="btn text-muted ">
                    <i className="fa fa-paperclip"></i>
                  </button>
                  <button title="Insert Emoji" className="btn text-muted  ">
                    <i className="fa fa-smile"></i>
                  </button>

                  <small className="text-secondary py-auto ms-5">
                    {" "}
                    Powered by <i className="fa fa-bolt text-primary"></i>{" "}
                    <b>Pavelify</b>
                  </small>

                  <div
                    className="text-end d-inline-block position-absolute"
                    style={{ left: "94%", bottom: "20px" }}
                  >
                    <button
                      onClick={() => messageSender()}
                      disabled={!message?.trim()}
                      id="sendBtn"
                      title="Send"
                      className={`btn text-white text-center ${
                        !message?.trim() ? "disabled" : ""
                      }`}
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: appearance?.backgroundColor,
                      }}
                    >
                      <i
                        style={{ fontSize: "20px" }}
                        className="fa fa-arrow-right"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <>
            {appearance?.widgetPosition === "right" && (
              <ButtonLabel
                show={appearance?.showButtonLabel}
                buttonLabelText={appearance?.buttonLabelText}
              />
            )}
            <button
              onClick={() => setOpen((prev) => !prev)}
              style={{
                backgroundColor: appearance?.backgroundColor,
                //   padding: "1.2rem 1rem",
                color: "white",
                borderRadius: "50%",
                border: "none",
                boxShadow: "1px 2px 4px 2px  #a0a9cf",
                cursor: "pointer",
                width: "55px",
                height: "55px",
              }}
              id="open-chat"
            >
              <i className="fa fa-comment-alt fa-lg"></i>
            </button>
            {appearance?.widgetPosition === "left" && (
              <ButtonLabel
                show={appearance?.showButtonLabel}
                buttonLabelText={appearance?.buttonLabelText}
              />
            )}
          </>
        )}
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
    <div className="d-flex  bg-white justify-content-center align-items-center w-100">
      <button
        onClick={close}
        className="position-absolute btn top-0 "
        style={{ right: "5px" }}
      >
        <i className="fa fa-times"></i>
      </button>
      <div id="name-entry" className={``}>
        <h3 className="mb-4">{preChat.introductionMessage}</h3>
        {preChat?.surveyFields?.name?.enabled && (
          <input
            id="user-name"
            type="text"
            placeholder={preChat?.surveyFields?.name?.placeholder}
            className="form-control mb-2"
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
            style={{ background: appearance?.backgroundColor }}
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
      className="bg-light px-4 py-2 my-auto me-3 ms-3"
      style={{
        borderRadius: "24px",
        boxShadow: "3px 3px 3px  #959697",
        fontWeight: "lighter",
      }}
    >
      {buttonLabelText}
    </h5>
  );

export default Snippet;
