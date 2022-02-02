import { getUser } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import Axios from "Lib/Axios/axios";
import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import DocumentText from "../../../Assets/img/document-text.png";
import LeftArrow from "../../../Assets/img/left-contact.png";
import RightArrow from "../../../Assets/img/right-contact.png";
import Edit from "../../../Assets/img/edit-2.png";
import Trash from "../../../Assets/img/trash.png";
import "react-status-alert/dist/status-alert.css";
import { capitalize } from "@material-ui/core";
import Modal from "App/component/Modal";
import NeutralButton from "App/component/NeutralButton";
import daysOfTheWeek from "App/helpers/days";
import Sidebar from "App/component/Sidebar";
import BodyHeader from "App/component/BodyHeader";
import copy from "clipboard-copy";
import { MAIN_URL } from "../settings/Livechat";
import useGetSubdomain from "App/hooks/useGetSubdomain";
import { fetchCalendars } from "Lib/Axios/endpoints/queries";
import { useQuery } from "react-query";

const Departments = (props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Zoom");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState([]);
  const [calendar, setCalendar] = useState(null);
  const [user] = useState(getUser());
  const [slug, setSlug] = useState("");
  const [duration, setDuration] = useState("15 mins");
  const [action, setAction] = useState("create");
  const [showModal, setShowModal] = useState(false);
  const { domain } = useGetSubdomain();
  const [livechatVisibility, setLivechatVisibility] = useState("No");

  const {
    data: { calendars },
  } = useQuery("calendars", fetchCalendars, {
    initialData: {},
  });

  const manageCalendar = () => {
    if (!name) return;
    setLoading(true);
    let cal;
    if (action === "create") {
      cal = {
        name,
        availableDays: days,
        availableTime: { from, to },
        location,
        duration,
        createdDate: new Date(),
        slug: name?.replaceAll(" ", "-").toLowerCase(),
        livechatVisibility,
      };
    } else {
      cal = {
        ...calendar,
        name,
        duration,
        availableDays: days,
        availableTime: { from, to },
        location,
        livechatVisibility,
      };
      if (action === "edit") {
        cal.slug = slug;
      }
    }
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/manage-calendars`,
      data: {
        cID: user?.cID,
        calendar: cal,
        action,
      },
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          fetchCalendars();
          setShowModal(false);
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        setLoading(false);
      });
  };

  const deleteCalendar = (index) => {
    setAction("delete");
    setCalendar(calendars[index]);
    let calend = calendars[index];
    setName(calend.name);
    setDays(calend.availableDays);
    setLocation(calend.location);
    setFrom(calend?.availableTime?.from);
    setTo(calend.availableTime?.to);
    setShowModal(true);
    setDuration(calend.duration);
    setLivechatVisibility(calend.livechatVisibility);
  };

  const editCalendar = (index) => {
    setAction("edit");
    setCalendar(calendars[index]);
    let calend = calendars[index];
    setName(calend.name);
    setDays(calend.availableDays);
    setLocation(calend.location);
    setFrom(calend?.availableTime?.from);
    setTo(calend.availableTime?.to);
    setSlug(calend?.slug);
    setDuration(calend.duration);
    setLivechatVisibility(calend.livechatVisibility);
    setShowModal(true);
  };

  const addCalendar = () => {
    setAction("create");
    setCalendar(null);

    setName("");
    setDays([]);
    // setLocation("");
    setLivechatVisibility("No");
    setFrom(null);
    setTo(null);
    setSlug("");
    setShowModal(true);
    setDuration("15 mins");
  };

  const toggleDays = (day, checked) => {
    setDays((days) =>
      checked
        ? [...days.filter((da) => da !== day), day]
        : days.filter((da) => da !== day)
    );
  };

  const copyLink = async (link) => {
    await copy(link);
    const alertID = StatusAlertService.showSuccess("Copied successfully");
  };

  return (
    <div className="EmailTickets CalendarBooking main-wrapper d-flex">
      <Sidebar active="calender" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="calendar" />
        <div className="body-main-area">
          <StatusAlert />
          <Modal open={showModal} setOpen={setShowModal} close>
            <div className="modal-content">
              <div className="modal-header text-center px-5">
                <h4 className="modal-title mb-4" id="departmentModalLabel">
                  {action === "create"
                    ? " Create New"
                    : action === "edit"
                    ? "Edit"
                    : "Delete"}{" "}
                  Meeting Event
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {action !== "delete" ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Event Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    {action === "edit" ? (
                      <div className="mt-3">
                        <label className="d-inline" htmlFor="">
                          Direct Link:
                        </label>
                        <input
                          type="text"
                          placeholder="Link"
                          className="form-control"
                          value={slug}
                          onChange={(e) =>
                            setSlug(e.target.value.replace(/\s/g, "-"))
                          }
                        />
                      </div>
                    ) : null}
                    <div className="mt-4">
                      <label htmlFor="" className="text-center">
                        Available Time
                      </label>
                      <div
                        className="row mt-1"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="col">
                          <input
                            type="time"
                            placeholder="From"
                            className="form-control me-2"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                          />
                        </div>
                        <div className="mx-2">-</div>
                        <div className="col">
                          <input
                            type="time"
                            placeholder="To"
                            className="form-control"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="" className="text-center">
                        Duration
                      </label>

                      <div className="">
                        <select
                          placeholder="Duration"
                          className="form-control"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        >
                          <option>15 mins</option>
                          <option>30 mins</option>
                          <option>1 hour</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="" className="text-center">
                        Available Days
                      </label>
                      <div className=" mt-2">
                        <div
                          className="text-center justify-content-center d-flex"
                          style={{
                            flexWrap: "wrap",
                          }}
                        >
                          {daysOfTheWeek.map((day, index) => (
                            <div
                              key={String(index)}
                              className="col-4 col-md-3 my-2"
                            >
                              <input
                                className="fodrm-control d-inline"
                                id={day}
                                checked={days.indexOf(day) >= 0}
                                type="checkbox"
                                value={day}
                                onChange={(e) =>
                                  toggleDays(e.target.value, e.target.checked)
                                }
                              />{" "}
                              <label className="d-inline ms-1" htmlFor={day}>
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="" className="text-center">
                        Meeting Location
                      </label>
                      <div
                        className="row mt-2"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div className="col form-group">
                          <label htmlFor="zoom">Zoom</label>
                          <input
                            type="radio"
                            className="dform-control ms-1"
                            name="location"
                            value="Zoom"
                            id="zoom"
                            checked={location === "Zoom"}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        <div className="col form-group">
                          <label htmlFor="googlem">Google Meet</label>
                          <input
                            type="radio"
                            disabled
                            className="dform-control ms-1"
                            name="location"
                            value="Google Meet"
                            id="googlem"
                            checked={location === "Google Meet"}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        <div className="col form-group">
                          <label htmlFor="googlem">Phone Call</label>
                          <input
                            type="radio"
                            className="dform-control ms-1"
                            name="location"
                            value="Phone Call"
                            id="phone-call"
                            checked={location === "Phone Call"}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 mb-1">
                      <label htmlFor="" className="text-center">
                        Visible on Livechat Widget?
                      </label>
                      <div
                        className="row mt-2"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div className="col form-group">
                          <label htmlFor="c-Yes">Yes</label>
                          <input
                            type="radio"
                            className="dform-control ms-1"
                            name="livechatVisibility"
                            value="Yes"
                            id="c-Yes"
                            checked={livechatVisibility === "Yes"}
                            onChange={(e) =>
                              setLivechatVisibility(e.target.value)
                            }
                          />
                        </div>

                        <div className="col form-group">
                          <label htmlFor="c-No">No</label>
                          <input
                            type="radio"
                            className="dform-control ms-1"
                            name="livechatVisibility"
                            value="No"
                            id="c-No"
                            checked={livechatVisibility === "No"}
                            onChange={(e) =>
                              setLivechatVisibility(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Are you sure you want to delete this event?</p>
                )}
              </div>
              <div className="modal-footer mt-4 text-center">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  data-bs-dismiss="modal"
                  onClick={manageCalendar}
                  loading={loading}
                >
                  {action === "create"
                    ? " Create"
                    : action === "edit"
                    ? "Edit"
                    : "Delete"}
                </button>
              </div>
            </div>
          </Modal>
          <div className="top-area d-flex-align-center">
            <h3>Events</h3>

            <div className="slider-area  d-flex-align-center">
              <div className="top-area d-flex-align-center">
                <button type="button" onClick={addCalendar}>
                  Add New Event
                </button>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <div className="table">
              <div className="table-head">
                <div className="col col2">
                  <h5>#</h5>
                </div>
                <div className="col col3">
                  <h5>Name</h5>
                </div>
                <div className="col col3">
                  <h5>Direct Link</h5>
                </div>
                <div className="col col3">
                  <h5>Time</h5>
                </div>
                <div className="col col3">
                  <h5>Duration</h5>
                </div>
                <div className="col col3">
                  <h5>Available Days</h5>
                </div>
                <div className="col col3">
                  <h5>Location</h5>
                </div>
                <div className="col col7">
                  <h5>Actions</h5>
                </div>
              </div>
              <div className="table-body">
                {calendars &&
                  calendars?.map((calendar, index) => (
                    <div className="row" key={String(index)}>
                      <div className="col col2">
                        <p>{String(index + 1)}</p>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <p>{capitalize(calendar?.name)}</p>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <NeutralButton
                          onClick={() =>
                            copyLink(
                              `${window.location.protocol}//meeting.${domain}/${user?.companyName}/${calendar.slug}`
                            )
                          }
                        >
                          <i className="fa fa-lg fa-copy"></i>
                        </NeutralButton>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <span>
                          {calendar.availableTime?.from} -{" "}
                          {calendar.availableTime?.to}
                        </span>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <span>{calendar.duration}</span>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <span>
                          {calendar.availableDays?.map((day, index) => (
                            <span key={String(index)}>{day}, </span>
                          ))}
                        </span>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <span>{calendar.location}</span>
                      </div>

                      <div className="col col7">
                        <div className="images-wrapper d-flex-align-center">
                          <NeutralButton onClick={() => editCalendar(index)}>
                            <img src={Edit} alt="" />
                          </NeutralButton>
                          <NeutralButton onClick={() => deleteCalendar(index)}>
                            <img src={Trash} alt="" />
                          </NeutralButton>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
