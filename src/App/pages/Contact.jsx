import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import PlusIcon from "../../Assets/img/purple-plus.png";
import Message from "../../Assets/img/message.png";
import Tickets from "../../Assets/img/sms-tracking.png";
import Calenders from "../../Assets/img/calendar.png";
import DocumentText from "../../Assets/img/document-text.png";
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import { useHistory, useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import NeutralButton from "App/component/NeutralButton";
import { Helmet } from "react-helmet-async";
import { CSVLink, CSVDownload } from "react-csv";
import { getUserEmailFromEmailTicket } from "helpers";
import { useQuery } from "react-query";
import { fetchContacts } from "Lib/Axios/endpoints/queries";

function Contact() {
  const params = useParams();
  const history = useHistory();
  const [user] = useState(getUser());

  const { data: contacts, refetch } = useQuery(
    ["contacts", params?.channel],
    fetchContacts,
    {
      initialData: [],
    }
  );

  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    resetChecks();
  }, [params?.channel]);

  const resetChecks = () => {
    if (!user) return;
    if (document.querySelector("#all-check-checkbox"))
      document.querySelector("#all-check-checkbox").checked = false;
  };
  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(
      ".table-body .row .col1 input"
    );

    //    click event on first checkbox i mean main checkbox
    Checkbox?.addEventListener("click", (e) => {
      if (e.target.checked === true) {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = true;
        });
      } else {
        CheckboxTbody?.forEach((EachInput) => {
          EachInput.checked = false;
        });
      }
    });
  }, []);

  const selectItem = (index, checked) => {
    if (checked) {
      let c = selectedContacts.filter((a) => a.id !== index);
      let item = contacts[index];
      setSelectedContacts([
        ...c,
        {
          Name:
            params?.channel !== "EmailTickets"
              ? item?.name
              : getUserEmailFromEmailTicket(item).name,
          Email:
            params?.channel !== "EmailTickets"
              ? item?.email
              : getUserEmailFromEmailTicket(item).email,
          "Country/Location": item?.info?.countryName || item?.location,
          id: index,
        },
      ]);
      let allChecks = document.querySelectorAll(".checks:checked");
      if (allChecks.length === contacts.length) {
        document.querySelector("#all-check-checkbox").checked = true;
      }
    } else {
      setSelectedContacts((s) => s.filter((a) => a.id !== index));
      document.querySelector("#all-check-checkbox").checked = false;
    }
  };

  const checkAll = (checked) => {
    let allChecks = document.querySelectorAll(".checks");
    if (checked) {
      let all = [];
      contacts.forEach((c, i) =>
        all.push({
          Name:
            params?.channel !== "EmailTickets"
              ? c?.name
              : getUserEmailFromEmailTicket(c).name,
          Email:
            params?.channel !== "EmailTickets"
              ? c?.email
              : getUserEmailFromEmailTicket(c).email,
          "Country/Location": c?.info?.countryName || c?.location,
          id: i,
        })
      );
      allChecks.forEach((i) => (i.checked = true));
      setSelectedContacts(all);
    } else {
      setSelectedContacts([]);
      allChecks.forEach((i) => (i.checked = false));
    }
  };

  return (
    <div className="Contact main-wrapper d-flex">
      <Helmet>
        <title>Contact - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="contact" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="contact" />

        <div className="body-main-area">
          <div className="body-box">
            <div className="left-side">
              <div className="top-area d-flex-align-center">
                <h3>Channels</h3>
                {/* <img src={PlusIcon} alt="" /> */}
              </div>
              <ul>
                <li
                  className={`d-flex-align-center ${
                    params?.channel === "LiveChat" ? "active" : ""
                  }`}
                  onClick={() => history.push("/contact/LiveChat")}
                >
                  <div className="icon-wrapper">
                    <img src={Message} alt="" />
                  </div>
                  <p>Live Chats</p>
                </li>
                <li
                  className={`d-flex-align-center ${
                    params?.channel === "EmailTickets" ? "active" : ""
                  }`}
                  onClick={() => history.push("/contact/EmailTickets")}
                >
                  <div className="icon-wrapper">
                    <img src={Tickets} alt="" />
                  </div>
                  <p>Email Tickets</p>
                </li>
                <li
                  className={`d-flex-align-center ${
                    params?.channel === "Calendars" ? "active" : ""
                  }`}
                  onClick={() => history.push("/contact/Calendars")}
                >
                  <div className="icon-wrapper">
                    <img src={Calenders} alt="" />
                  </div>
                  <p>Calendars</p>
                </li>
              </ul>
            </div>

            {/* right area */}
            {params?.channel ? (
              <div className="right-area">
                <div className="top-area d-flex-align-center">
                  <h3>
                    {params?.channel === "LiveChat"
                      ? "Live Chat"
                      : params?.channel === "Calendars"
                      ? "Calendars"
                      : "Email Tickets"}
                  </h3>
                  <CSVLink
                    data={selectedContacts}
                    onClick={(e) => {
                      return !selectedContacts?.length ? false : true;
                    }}
                    target="_blank"
                    filename={`${params?.channel}.csv`}
                    style={{ display: "flex" }}
                    className="export-area d-flex-align-center"
                  >
                    <img src={DocumentText} alt="" />
                    <p>Export</p>
                  </CSVLink>

                  <div className="slider-area  d-flex-align-center">
                    <p>
                      <span>1</span> - <span>{contacts?.length}</span> of{" "}
                      <span>{contacts?.length}</span>
                    </p>
                    <div className="slider-images d-flex-align-center">
                      <img src={LeftArrow} alt="" />
                      <img src={RightArrow} alt="" />
                    </div>
                  </div>
                </div>
                <div className="table-wrapper">
                  <div className="table">
                    <div className="table-head">
                      <div className="col col1">
                        <input
                          type="checkbox"
                          name=""
                          id="all-check-checkbox"
                          onChange={(e) => checkAll(e.target.checked)}
                        />
                      </div>
                      <div className="col col2">
                        <h5>Profile</h5>
                      </div>
                      <div className="col col3">
                        <h5>Email</h5>
                      </div>
                      <div className="col col4">
                        <h5>Email Consent</h5>
                      </div>
                      <div className="col col5">
                        <h5>Country</h5>
                      </div>
                      <div className="col col6">
                        <h5>Tags</h5>
                      </div>
                      <div className="col col7">
                        <h5>Actions</h5>
                      </div>
                    </div>
                    <div className="table-body">
                      {contacts &&
                        contacts?.map((contact, index) => (
                          <div className="row" key={String(index)}>
                            <div className="col col1">
                              <input
                                type="checkbox"
                                className="checks"
                                onChange={(e) =>
                                  selectItem(index, e.target.checked)
                                }
                              />
                            </div>
                            <div className="col col2 d-flex-align-center">
                              <NeutralButton
                                onClick={
                                  params?.channel === "LiveChat"
                                    ? () =>
                                        history.push(
                                          `/LiveChat/${contact?.uuid}`
                                        )
                                    : null
                                }
                              >
                                {/* <img src={Person1} alt="" /> */}
                                <div
                                  className="livechat-tag"
                                  style={{
                                    background: contact?.color || "red",
                                    marginRight: "5px",
                                  }}
                                >
                                  {params?.channel !== "EmailTickets"
                                    ? contact?.name?.slice(0, 1) || 0
                                    : getUserEmailFromEmailTicket(
                                        contact
                                      ).name?.slice(0, 1) || 0}
                                </div>
                              </NeutralButton>
                              <NeutralButton
                                onClick={
                                  params?.channel === "LiveChat"
                                    ? () =>
                                        history.push(
                                          `/LiveChat/${contact?.uuid}`
                                        )
                                    : null
                                }
                              >
                                <p>
                                  {params?.channel !== "EmailTickets"
                                    ? contact?.name
                                    : getUserEmailFromEmailTicket(contact).name}
                                </p>
                              </NeutralButton>
                            </div>
                            <div className="col col3">
                              <p>
                                {params?.channel !== "EmailTickets"
                                  ? contact?.email
                                  : getUserEmailFromEmailTicket(contact).email}
                              </p>
                            </div>
                            <div className="col col4">
                              <select name="" id="">
                                <option value="">Subscribed</option>
                              </select>
                            </div>
                            <div className="col col5">
                              <p>
                                {contact?.info?.countryName ||
                                  contact?.location}
                              </p>
                            </div>
                            <div className="col col6">
                              <h5>-</h5>
                            </div>
                            <div className="col col7">
                              <div className="images-wrapper d-flex-align-center">
                                {/* <img src={Edit} alt="" />
                                <img src={Trash} alt="" /> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
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

export default Contact;
