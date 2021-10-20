import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import useGetSubdomain from "App/hooks/useGetSubdomain";

export const MAIN_URL = window.location.protocol + "//" + window.location.host;

const LiveChatSettings = () => {
  const params = useParams();

  const [preChat, setPreChat] = useState({});
  const [sidebar, setSidebar] = useState({});
  const [appearance, setAppearance] = useState({});
  const [loading, setLoading] = useState(false);
  const [user] = useState(getUser());
  const { domain } = useGetSubdomain();

  useEffect(() => {
    getConfiguration();
  }, []);
  const getConfiguration = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          console.log(result.data.configuration);
          if (result.data.success) {
            setPreChat(
              JSON.parse(result.data.configuration.chatConfiguration.preChat)
            );
            setSidebar(
              JSON.parse(result.data.configuration.chatConfiguration.sidebar)
            );
            setAppearance(
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
  const submitConfiguration = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/save`,
        data: {
          cID: user?.cID,
          configuration: {
            chatConfiguration: {
              preChat: JSON.stringify(preChat),
              sidebar: JSON.stringify(sidebar),
              appearance: JSON.stringify(appearance),
            },
          },
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            const alertID = StatusAlertService.showSuccess(
              "Settings saved successfully!"
            );
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
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, [params?.channel]);

  return (
    <div className="right-side">
      <StatusAlert />
      <h2>Live Chats</h2>
      <ul>
        <li>
          <div className="head d-flex-align-center">
            <p>Instalations</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 1.5L10 10.5L1 1.5"
                stroke="#282D4A"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div action="" className="body">
            <div className="container text-center">
              <h3>Paste this in the body of your website:</h3>
              <div className="form-group mb-3">
                <textarea
                  readOnly
                  name=""
                  id=""
                  cols="50"
                  rows="10"
                  value={`<script>
! function(e, t) {
	e.chatID = "${user.cID}";
	var a = t.createElement("script");
	a.type = "text/javascript", a.async = !0, a.src = "${window.location.protocol}//${domain}/embed.js";
	var c = t.getElementsByTagName("script")[0];
	c.parentNode.insertBefore(a, c)
}(window, document);
</script>`}
                ></textarea>
              </div>
              <h3>You can also use the direct link:</h3>
              <textarea
                readOnly
                name=""
                id=""
                cols="50"
                rows="10"
                value={`${window.location.protocol}//livechat.${domain}/${user.cID}`}
              ></textarea>
            </div>
          </div>
        </li>
        <li>
          <div className="head d-flex-align-center">
            <p>Pre Chat Survey</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 1.5L10 10.5L1 1.5"
                stroke="#282D4A"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="body">
            {/* first part */}
            <div className="wrapper">
              <h5>Display</h5>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="display-checkbox"
                    checked={preChat?.display || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        display: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="display-checkbox">
                    <span className="ball"></span>
                  </label>
                  <p>Message</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Please introduce yourself:"
                    value={preChat?.introductionMessage || ""}
                    id="message"
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        introductionMessage: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* second part */}

            <div className="wrapper">
              <h5>Survey Fields</h5>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-1"
                    checked={preChat?.surveyFields?.name?.enabled || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          name: {
                            ...pre.surveyFields.name,
                            enabled: e.target.checked,
                          },
                        },
                      }))
                    }
                  />
                  <label htmlFor="survey-1">
                    <span className="ball"></span>
                  </label>
                  <p>Name</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={preChat?.surveyFields?.name?.placeholder || ""}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          name: {
                            ...pre.surveyFields.name,
                            placeholder: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-2"
                    checked={preChat?.surveyFields?.email?.enabled || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          email: {
                            ...pre.surveyFields.email,
                            enabled: e.target.checked,
                          },
                        },
                      }))
                    }
                  />
                  <label htmlFor="survey-2">
                    <span className="ball"></span>
                  </label>
                  <p>Email</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your email..."
                    value={preChat?.surveyFields?.email?.placeholder || ""}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          email: {
                            ...pre.surveyFields.email,
                            placeholder: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-3"
                    checked={
                      preChat?.surveyFields?.phoneNumber?.enabled || false
                    }
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          phoneNumber: {
                            ...pre.surveyFields.phoneNumber,
                            enabled: e.target.checked,
                          },
                        },
                      }))
                    }
                  />
                  <label htmlFor="survey-3">
                    <span className="ball"></span>
                  </label>
                  <p>Phone Number</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your phone number..."
                    value={
                      preChat?.surveyFields?.phoneNumber?.placeholder || ""
                    }
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          phoneNumber: {
                            ...pre.surveyFields.phoneNumber,
                            placeholder: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="sm-btn"
              type="button"
              onClick={() => submitConfiguration()}
            >
              Save Settings
            </button>
          </div>
        </li>
        <li>
          <div className="head d-flex-align-center">
            <p>Appereance</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 1.5L10 10.5L1 1.5"
                stroke="#282D4A"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div action="" className="body">
            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="showButtonLabel"
                    checked={appearance?.showButtonLabel || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        showButtonLabel: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="showButtonLabel">
                    <span className="ball"></span>
                  </label>
                  <p>Button Label</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Button Label Text"
                    value={appearance?.buttonLabelText || ""}
                    placeholder="Label Text"
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        buttonLabelText: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="enableSound"
                    checked={appearance?.enableSound || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        enableSound: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="enableSound">
                    <span className="ball"></span>
                  </label>
                  <p>Enable Sound</p>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Widget Position</p>
                </div>
                <div className="right-side">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="radio"
                      style={{ width: "30px" }}
                      name="btnradio"
                      id="btnLeft"
                      autoComplete="off"
                      checked={appearance?.widgetPosition === "left"}
                      onChange={(e) =>
                        setAppearance((pre) => ({
                          ...pre,
                          widgetPosition: e.target.checked ? "left" : "right",
                        }))
                      }
                    />
                    <label className=" btn-outline-primary" htmlFor="btnLeft">
                      Left
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      style={{ width: "30px", marginRight: "20px" }}
                      id="btnRight"
                      autoComplete="off"
                      checked={appearance?.widgetPosition === "right"}
                      onChange={(e) =>
                        setAppearance((pre) => ({
                          ...pre,
                          widgetPosition: e.target.checked ? "right" : "left",
                        }))
                      }
                    />
                    <label className=" btn-outline-primary" htmlFor="btnRight">
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Background Color</p>
                </div>
                <div className="right-side">
                  <input
                    type="color"
                    className="form-control mt-2"
                    name="backgroundColor"
                    id=""
                    value={appearance?.backgroundColor || ""}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        backgroundColor: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Online Status</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    className="form-control mb-4"
                    id="onlineStatus"
                    value={appearance?.onlineStatus || ""}
                    placeholder="Online Status"
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        onlineStatus: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="offline-display"
                    checked={appearance?.displayWhenOffline || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        displayWhenOffline: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="offline-display">
                    <span className="ball"></span>
                  </label>
                  <p>Display Chat when you are Offline</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.offlineStatus || ""}
                    placeholder="Offline Status"
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        offlineStatus: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <h3 style={{ margin: "12px 1px" }}>Getting Started:</h3>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Status</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.gettingStartedStatus || ""}
                    placeholder=""
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        gettingStartedStatus: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Message</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.gettingStartedMessage || ""}
                    placeholder=""
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        gettingStartedMessage: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="sm-btn"
              type="button"
              onClick={() => submitConfiguration()}
            >
              Save Settings
            </button>
          </div>
        </li>

        {/* <li>
          <div className="head d-flex-align-center">
            <p>Side Bar</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 1.5L10 10.5L1 1.5"
                stroke="#282D4A"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div action="" className="body">
            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="enable-sidebar"
                    checked={sidebar?.enable || false}
                    onChange={(e) =>
                      setSidebar((pre) => ({
                        ...pre,
                        enable: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="enable-sidebar">
                    <span className="ball"></span>
                  </label>
                  <p>Enable</p>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Color</p>
                </div>
                <div className="right-side">
                  <input
                    type="color"
                    className="form-control mt-2"
                    name="backgroundColor"
                    id=""
                    value={sidebar?.color || ""}
                    onChange={(e) =>
                      setSidebar((pre) => ({
                        ...pre,
                        color: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Label</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    className="form-control mb-4"
                    id="onlineStatus"
                    value={sidebar?.label || ""}
                    placeholder=""
                    onChange={(e) =>
                      setSidebar((pre) => ({
                        ...pre,
                        label: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Position</p>
                </div>
                <div className="right-side">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="radio"
                      style={{ width: "30px" }}
                      name="btnradio"
                      id="btnLeft2"
                      autoComplete="off"
                      checked={sidebar?.position === "left"}
                      onChange={(e) =>
                        setSidebar((pre) => ({
                          ...pre,
                          position: e.target.checked ? "left" : "right",
                        }))
                      }
                    />
                    <label className=" btn-outline-primary" htmlFor="btnLeft2">
                      Left
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      style={{ width: "30px", marginRight: "20px" }}
                      id="btnRight2"
                      autoComplete="off"
                      checked={sidebar?.position === "right"}
                      onChange={(e) =>
                        setSidebar((pre) => ({
                          ...pre,
                          position: e.target.checked ? "right" : "left",
                        }))
                      }
                    />
                    <label className=" btn-outline-primary" htmlFor="btnRight2">
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="sm-btn"
              type="button"
              onClick={() => submitConfiguration()}
            >
              Save Settings
            </button>
          </div>
        </li> */}

        <li>
          <div className="head d-flex-align-center">
            <p>Chat Page</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 1.5L10 10.5L1 1.5"
                stroke="#282D4A"
                strokeWidth="2"
              />
            </svg>
          </div>
          <form action="" className="body"></form>
        </li>
      </ul>
    </div>
  );
};

export default LiveChatSettings;
