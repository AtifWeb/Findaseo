import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { format } from "date-fns";

const CalendarBookingIndex = ({ bookings, events }) => {
  return (
    <>
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
                  {format(new Date(booking?.time || null), "PP")} &nbsp;
                  {format(
                    new Date(booking?.locationData?.startTime || null),
                    "p"
                  )}
                  :
                </u>
                &nbsp;
                {booking?.duration} Meeting with {booking?.name} @
                {booking?.location} (<b>{booking?.locationData?.topic}</b>)
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
    </>
  );
};

export default CalendarBookingIndex;
