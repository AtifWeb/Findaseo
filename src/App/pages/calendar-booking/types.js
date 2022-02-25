import { capitalize } from "@material-ui/core";
import NeutralButton from "App/component/NeutralButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Edit from "../../../Assets/img/edit-2.png";
import Trash from "../../../Assets/img/trash.png";

const CalendarTypes = ({ type, bookings, past, upcoming }) => {
  const [meetings, setMeetings] = useState(bookings);

  useEffect(() => {
    switch (type) {
      case "past":
        setMeetings(past);
        break;

      case "upcoming":
        setMeetings(upcoming);
        break;

      default:
        setMeetings(bookings);
        break;
    }
  }, [type]);
  return (
    <>
      <div className="table-wrapper">
        <div className="table">
          <div className="table-head">
            <div className="col col6">
              <h5>#</h5>
            </div>
            <div className="col col3">
              <h5>Contact</h5>
            </div>
            <div className="col col3">
              <h5>Event</h5>
            </div>
            <div className="col col3">
              <h5>Location</h5>
            </div>
            <div className="col col4">
              <h5>Duration</h5>
            </div>
            <div className="col col4">
              <h5>Start Time</h5>
            </div>
            <div className="col col5">
              <h5>Actions</h5>
            </div>
          </div>
          <div className="table-body">
            {meetings &&
              meetings?.map((meeting, index) => (
                <div className="row" key={String(index)}>
                  <div className="col col6">
                    <p>{String(index + 1)}</p>
                  </div>
                  <div
                    className="col col3 d-flex-align-center"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p>Name: {capitalize(meeting?.name)}</p>
                    <p>Tel: {meeting?.phone}</p>
                  </div>
                  <div className="col col3	 d-flex-align-center">
                    {meeting?.locationData?.topic || meeting?.name}
                  </div>
                  <div
                    style={{ width: "100%" }}
                    className="col col3 d-flex-align-center"
                  >
                    <b>
                      {meeting?.location === "Phone Call"
                        ? "Zoom"
                        : meeting?.location}
                    </b>
                  </div>

                  <div className="col col5 d-flex-align-center">
                    {meeting?.duration}
                  </div>

                  <div className="col col4 d-flex-align-center">
                    {meeting?.locationData?.startTime || "______"}
                  </div>

                  <div className="col col5">
                    <div className="images-wrapper d-flex-align-center">
                      {meeting?.location !== "Phone Call" ? (
                        <NeutralButton
                          className="calendarBookingStart"
                          onClick={() =>
                            window
                              .open(meeting?.locationData?.startUrl, "_blank")
                              ?.focus()
                          }
                          target={"_blank"}
                        >
                          Start Meeting
                        </NeutralButton>
                      ) : (
                        <NeutralButton className="text-muted">
                          Start Meeting
                        </NeutralButton>
                      )}

                      <NeutralButton>
                        <img src={Trash} alt="" />
                      </NeutralButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarTypes;
