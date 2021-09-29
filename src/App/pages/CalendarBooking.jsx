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
function CalendarBooking() {
  const history = useHistory();
  const params = useParams();
  const [user] = useState(getUser());
  const [bookings, setBookings] = useState([]);
  const [totalCalendars, setTotalCalendars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [past, setPast] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setBookings(result.data.bookings);
            console.log(result.data);
            let ev = [];
            result.data.bookings?.forEach((boo) => {
              let month = String(
                new Date(boo?.locationData?.startTime).getMonth()
              );
              let day = String(
                new Date(boo?.locationData?.startTime).getDate()
              );
              if (month.length === 1) {
                month = "0" + month;
              }
              if (day.length === 1) {
                day = "0" + day;
              }
              ev.push({
                title: boo?.locationData?.topic,
                description: boo?._id,
                start: `${new Date(
                  boo?.locationData?.startTime
                ).getFullYear()}-${month}-${day}`,
                end: `${new Date(
                  boo?.locationData?.startTime
                ).getFullYear()}-${month}-${day}`,
              });
            });

            setEvents(ev);
            setTotalCalendars(result.data.calendars);
            setPast(result.data.pastBookings);
            setUpcoming(result.data?.upcoming);
            setLoading(false);
            // setCalendars(result.data.calendars);
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
    let fc = document.querySelector(".fc-prev-button");

    fc?.setAttribute("id", "calender-prev-button");
    fc?.setAttribute("id", "calender-next-button");
    fc && Calender();
  }, [events, params?.type]);
  return (
    <div className="EmailTickets CalendarBooking main-wrapper d-flex">
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
              <span>{bookings.length}</span>
            </li>
            <li
              className={`${
                params?.type === "upcoming" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/upcoming")}
            >
              <p>Upcoming Meetings</p>
              <span> {upcoming?.length}</span>
            </li>
            <li
              className={`${
                params?.type === "past" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/past")}
            >
              <p>Past Meetings</p>
              <span>{past?.length}</span>
            </li>
            {/* <li
              className={`${
                params?.type === "pending" ? "active" : ""
              } d-flex-align-center`}
              onClick={() => history.push("/CalendarBooking/pending")}
            >
              <p>Pending</p>
              <span>0</span>
            </li> */}

            <li className="button-wrapper">
              <button
                className="schedule-btn w-75"
                type="button"
                onClick={() => history.push("/CalendarBooking/calendars")}
              >
                Manage Topics ({totalCalendars})
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
