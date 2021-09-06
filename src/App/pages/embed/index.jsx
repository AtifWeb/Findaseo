import { SocketContext } from "App/context/socket";
import { generateRoomID } from "App/helpers/generateRoomID";
import handleError from "App/helpers/handleError";
import { getVisitor, saveVisitor } from "App/helpers/visitor";
import Axios from "Lib/Axios/axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import "Assets/styles/css/embed.css";
import Person1 from "Assets/img/Frame 1.png";

function Embed() {
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const [user, setTheUser] = useState(getVisitor());
  const params = useParams();
  const [prevLoaded, setPrevLoaded] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
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
    setTimeout(() => {
      socket.emit("refreshChats", params.company);
    }, 1000);
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
      url: `${process.env.REACT_APP_BASE_URL}/embed/${params.company}`,
      //   data: {
      //     cID: params.company,
      //   },
    })
      .then((result) => {
        // console.log(JSON.parse(result.data.configuration.appearance));
        if (result.data.success) {
          setPreChat(
            JSON.parse(result.data.configuration.chatConfiguration.preChat)
          );
          console.log(
            JSON.parse(result.data.configuration.chatConfiguration.preChat)
          );
          // setSidebar(
          //   JSON.parse(result.data.configuration.chatConfiguration.sidebar)
          // );
          setAppearance(
            JSON.parse(result.data.configuration.chatConfiguration.appearance)
          );
          console.log(
            JSON.parse(result.data.configuration.chatConfiguration.appearance)
          );
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
  return !loading && !!preChat ? (
    <section className="text-white" style={{ overflowX: "hidden" }}>
      <div
        className={`container-fluid`}
        style={{
          background: appearance?.backgroundColor,
          color: "white",
        }}
        id="greeting-container"
      >
        <h2
          id="we-are-online"
          className={`h5 py-0 mb-1 mt-0 ${weOnline ? "" : "d-none"}`}
        >
          We are online now
        </h2>
        <div
          id="operatorContainer"
          className={operator?.name ? "mb-1 pt-2" : "mb-1 d-none"}
        >
          <h4>
            <img
              style={{ height: "35px", width: "35px" }}
              src={Person1}
              alt="Operator Image"
              className="me-2 align-middle"
            />
            <span className="align-middle">{operator?.name}</span>
          </h4>
        </div>
        <p className="text-center pb-2" id="greeting">
          {user && user?.name
            ? `Howdy ${user?.name}`
            : preChat.introductionMessage}
        </p>
      </div>

      <div id="messages-container" className="container my-2">
        {chats &&
          chats.map((chat, index) => (
            <p
              key={String(index)}
              className={`${chat.sender === "Visitor" ? "right" : "left"}-chat`}
              style={{
                background:
                  chat.sender === "Visitor"
                    ? appearance?.backgroundColor
                    : null,
              }}
            >
              {chat.message.trim()}
            </p>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="container position-absolute w-100 bottom-0 mb-3">
        <div id="name-entry" className={`card ${askName ? "" : "d-none"}`}>
          <div className="card-body">
            <div className="form-group">
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
                  id="cancel-name"
                  className="btn btn-light me-4 py-2"
                  style={{ width: "40%" }}
                  type="button"
                  onClick={() => sendNewAcceptance()}
                >
                  Cancel
                </button>
                <button
                  id="submit-name"
                  type="submit"
                  className="btn btn-primary py-2"
                  style={{ width: "40%" }}
                  onClick={sendName}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <p className="text-center text-dark my-1">
              
            </p> */}

        <div
          id="conversation-container"
          className={`border-top border-2 ${startConversation ? "" : "d-none"}`}
        >
          <textarea
            id="chat-box"
            type="text"
            placeholder="Enter your message..."
            className="form-control border-0 d-inline-block py-2 "
            value={message}
            onKeyUp={(e) => {
              e.stopPropagation();
              var event = e || window.event;
              var charCode = event.which || event.keyCode;

              if (charCode == "13") {
                // Enter pressed
                messageSender();
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
            rows="1"
          ></textarea>
          <div>
            <button
              title="Attach file"
              className="btn text-muted"
              style={{ width: "40px" }}
            >
              <i className="fa fa-paperclip"></i>
            </button>
            <button
              title="Insert Emoji"
              className="btn text-muted"
              style={{ width: "40px" }}
            >
              <i className="fa fa-smile"></i>
            </button>

            <small className="text-secondary ms-4">
              Powered by <i className="fa fa-bolt text-primary"></i>{" "}
              <b>Pavelify</b>
            </small>

            <div className="text-end d-inline-block float-end me-2">
              <button
                onClick={() => messageSender()}
                disabled={!message?.trim()}
                id="sendBtn"
                title="Send"
                className={`btn ${!message?.trim() ? " d-none" : ""}`}
              >
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div />
  );
}

export default Embed;
