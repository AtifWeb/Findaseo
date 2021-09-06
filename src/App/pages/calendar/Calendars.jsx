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

const Departments = (props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [calendar, setCalendar] = useState();
  const [user] = useState(getUser());
  const [slug, setSlug] = useState("");
  const [action, setAction] = useState("create");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCalendars();
  }, []);
  const fetchCalendars = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/calendars`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            console.log(result.data);
            setLoading(false);
            setCalendars(result.data.calendars);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const manageCalendar = () => {
    if (!name) return;
    setLoading(true);
    let cal;
    if (action == "create") {
      cal = {
        name,
        availableDays: days,
        availableTime: { from, to },
        location,
        createdDate: new Date(),
        slug: name?.replaceAll(" ", "-").toLowerCase(),
      };
    } else {
      cal = {
        ...calendar,
        name,
        availableDays: days,
        availableTime: { from, to },
        location,
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
    setShowModal(true);
  };

  const addCalendar = () => {
    setAction("create");
    setCalendar(null);

    setName("");
    setDays([]);
    setLocation("");
    setFrom(null);
    setTo(null);
    setSlug("");
    setShowModal(true);
  };

  const toggleDays = (day, checked) => {
    setDays((days) =>
      checked
        ? [...days.filter((da) => da !== day), day]
        : days.filter((da) => da !== day)
    );
  };

  return (
    <div className="EmailTickets CalendarBooking main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="calender" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="calender" />
        <div className="body-main-area">
          <StatusAlert />
          <Modal open={showModal} setOpen={setShowModal} close>
            <div className="modal-content">
              <div className="modal-header text-center px-5">
                <h4 className="modal-title mb-4" id="departmentModalLabel">
                  {action === "create"
                    ? " Create New"
                    : action === "edit"
                    ? "Edit Calendar"
                    : "Delete"}{" "}
                  Calendar
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
                        Available Days
                      </label>
                      <div className=" mt-2">
                        <div className="row">
                          {daysOfTheWeek.map((day, index) => (
                            <div
                              key={String(index)}
                              className="col-6 col-sm-3 my-2"
                            >
                              <input
                                className="fodrm-control"
                                id={day}
                                checked={days.indexOf(day) >= 0}
                                type="checkbox"
                                value={day}
                                onChange={(e) =>
                                  toggleDays(e.target.value, e.target.checked)
                                }
                              />{" "}
                              <label htmlFor={day}>{day}</label>
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
                            className="dform-control ms-1"
                            name="location"
                            value="Google Meet"
                            id="googlem"
                            checked={location === "Google Meet"}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Are you sure you want to delete this calendar event?</p>
                )}
              </div>
              <div className="modal-footer mt-4">
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
            <h3>Calendars</h3>

            <div className="slider-area  d-flex-align-center">
              <div className="top-area d-flex-align-center">
                <button type="button" onClick={addCalendar}>
                  Add New Calendar
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
                        <a target="_blank" href={`/calendar/${calendar.slug}`}>
                          Link
                        </a>
                      </div>
                      <div className="col col3 d-flex-align-center">
                        <span>
                          {calendar.availableTime?.from} -{" "}
                          {calendar.availableTime?.to}
                        </span>
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
