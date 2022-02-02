import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Calender } from "../../Assets/script/js/Calender";
// import { events as er } from "../Utils/CalenderEvents";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { useHistory, useParams } from "react-router";
import { format } from "date-fns";
import CalendarBookingIndex from "./calendar-booking";
import CalendarTypes from "./calendar-booking/types";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { fetchBookings } from "Lib/Axios/endpoints/queries";
function CalendarBooking() {
  const history = useHistory();
  const params = useParams();
  const [user] = useState(getUser());

  const {
    data: {
      events,
      bookings,
      calendars: totalCalendars,
      pastBookings: past,
      upcoming,
    },
  } = useQuery("calendarBooking", fetchBookings, {
    initialData: {},
  });

  useEffect(() => {
    let fc = document.querySelector(".fc-prev-button");

    fc?.setAttribute("id", "calender-prev-button");
    fc?.setAttribute("id", "calender-next-button");
    fc && Calender();
  }, [events, params?.type]);
  return (
    <div className="EmailTickets CalendarBooking main-wrapper d-flex">
      <Helmet>
        <title>Calendar Booking - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="calendar" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="calendar" />

        <div className="body-main-area">
          {/* <h2>Calendar Booking</h2> */}

          <ul className="navigation-bar d-flex-align-center">
            <li
              className={`${
                params?.type === "scheduled" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/scheduled")}
            >
              <p>Scheduled Meetings</p>
              <span>{bookings?.length || 0}</span>
            </li>
            <li
              className={`${
                params?.type === "upcoming" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/upcoming")}
            >
              <p>Upcoming Meetings</p>
              <span> {upcoming?.length || 0}</span>
            </li>
            <li
              className={`${
                params?.type === "past" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/past")}
            >
              <p>Past Meetings</p>
              <span>{past?.length || 0}</span>
            </li>

            <li className="button-wrapper">
              <button
                className="schedule-btn w-75"
                type="button"
                onClick={() => history.push("/CalendarBooking/calendars")}
              >
                Manage Events ({totalCalendars})
              </button>
            </li>
          </ul>

          <div
            className={`bottom-calender-area ${
              params?.type ? "" : "grid-col-4"
            }`}
            style={{ marginTop: 40 }}
          >
            {params?.type ? (
              <CalendarTypes
                bookings={bookings}
                past={past}
                upcoming={upcoming}
                type={params?.type}
              />
            ) : (
              <CalendarBookingIndex bookings={bookings} events={events} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarBooking;
