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
import { useHistory } from "react-router";
import { format } from "date-fns";
function CalendarBooking() {
  const history = useHistory();
  const [user] = useState(getUser());
  const [bookings, setBookings] = useState([]);
  const [totalCalendars, setTotalCalendars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [past, setPast] = useState(0);
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
    document
      .querySelector(".fc-prev-button")
      .setAttribute("id", "calender-prev-button");
    document
      .querySelector(".fc-next-button")
      .setAttribute("id", "calender-next-button");
    Calender();
  }, [events]);
  return (
    <div className="EmailTickets CalendarBooking main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="calender" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="calender" />

        <div className="body-main-area">
          <h2>Calendar Booking</h2>

          <ul className="navigation-bar d-flex-align-center">
            <li className="active d-flex-align-center">
              <p>Scheduled Meetings</p>
              <span>{bookings.length}</span>
            </li>
            <li className="d-flex-align-center">
              <p>Upcoming Meetings</p>
              <span> {bookings.length - past}</span>
            </li>
            <li className="d-flex-align-center">
              <p>Past Meetings</p>
              <span>{past}</span>
            </li>
            <li className="d-flex-align-center">
              <p>Pending</p>
              <span>0</span>
            </li>
            <li className="d-flex-align-center">
              <p>Meeting Categories</p>
              <span>0</span>
            </li>
            <li className="button-wrapper">
              <button
                className="schedule-btn w-75"
                type="button"
                onClick={() => history.push("/CalendarBooking/calendars")}
              >
                Manage Calendars ({totalCalendars})
              </button>
            </li>
          </ul>

          <div
            className="bottom-calender-area grid-col-4"
            style={{ marginTop: 40 }}
          >
            <div style={{ background: "#fff" }}>
              <div class="box calender stagger">
                <div class="calender-top">
                  <label
                    htmlFor="calender-prev-button"
                    class="icon-wrapper"
                    id="calender-back-icon-wrapper"
                  >
                    <svg
                      width="10"
                      height="17"
                      viewBox="0 0 10 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1.5L2 8.5L9 15.5"
                        stroke="#282D4A"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </label>
                  <strong class="Calender-DateTime">Dec, 2021</strong>
                  <label
                    htmlFor="calender-next-button"
                    class="icon-wrapper"
                    id="calender-towards-icon-wrapper"
                  >
                    <svg
                      width="10"
                      height="17"
                      viewBox="0 0 10 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L8 8.5L1 15.5"
                        stroke="#282D4A"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </label>
                </div>
                <div class="calender-days-name">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div class="calender-days"></div>
              </div>

              <div className="bottom-after-calender">
                <h3>Scheduled Lists</h3>
                <ul>
                  {bookings?.map((booking, index) => (
                    <li key={String(index)}>
                      <u>
                        {format(new Date(booking?.time), "PP")} &nbsp;
                        {format(
                          new Date(booking?.locationData?.startTime),
                          "p"
                        )}
                        :
                      </u>
                      &nbsp;
                      {booking?.duration} Meeting with {booking?.name} @
                      {booking?.location} (<b>{booking?.locationData?.topic}</b>
                      )
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="calender">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventColor="#7822e624"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarBooking;
