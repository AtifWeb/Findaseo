import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import PlusIcon from "../../Assets/img/purple-plus.png";
import Person1 from "../../Assets/img/Frame 1.png";
import Person2 from "../../Assets/img/Frame 2.png";
import Person3 from "../../Assets/img/Frame 3.png";
import PersonBig from "../../Assets/img/PersonBig.png";
import time from "../../Assets/img/svg/time.svg";
import SpainFlag from "../../Assets/img/flag-spain.png";
function LiveChat() {
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
          LeftArea.style.display = "none";
          ChatArea.style.display = "block";
        });
      });
    }
  }, []);
  return (
    <div className="LiveChat main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="LiveChat" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="LiveChat" />

        <div
          className="body-main-area"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <div className="messages-box-area">
            {/* left side */}
            <div className="left-side">
              <div className="top-area d-flex-align-center">
                <h3>Chats</h3>
                <img src={PlusIcon} alt="" />
              </div>

              <form action="">
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
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.9167 11.9166L10.8334 10.8333"
                      stroke="#9CA2C9"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <input type="text" placeholder="Search name..." />
                </div>
              </form>

              <div className="users">
                <div className="user d-flex-align-center">
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
                <div className="user d-flex-align-center">
                  <div className="images_wrapper">
                    <img src={Person2} alt="" />
                    <img src={SpainFlag} alt="" className="flag" />
                  </div>
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
                </div>
              </div>
            </div>

            {/* middile side */}
            <div className="middle-side">
              <div className="contact-area">
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11 17.75H24.5"
                        stroke="#7822E6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="messages-container-wrapper">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
