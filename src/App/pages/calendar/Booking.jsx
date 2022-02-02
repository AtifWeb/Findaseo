import axios from "axios";
import { getUser } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import daysOfTheWeek from "App/helpers/days";
import NeutralButton from "App/component/NeutralButton";
import { useParams } from "react-router";
import styled from "styled-components";
import SideBarLogo from "../../../Assets/img/Pavelify.png";
import Calender from "./Calender/Calender";
import ConfirmationPopUpCalender from "./ConfirmationPopUpCalender/ConfirmationPopUpCalender";
import useGetSubdomain from "App/hooks/useGetSubdomain";
import { useQuery } from "react-query";
import { getCalendar } from "Lib/Axios/endpoints/queries";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: white;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Greeting = styled.div`
  background-color: #0f1957;
  width: 100%;
  display: flex;
  div:first-child {
    background-color: #2d96d6;
    width: 103px;
    height: 100vh;
    padding: 40px 50px;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      height: 320px;
    }
    img {
      width: 90px;
    }
    a {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
      border: 1px solid white;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 14px;
    }
  }

  div:last-child {
    h1 {
      color: white;
      font-size: 48px;
      margin-top: 50%;
      margin-left: -30px;
    }
    p {
      margin-left: -30px;
      font-size: 28px;
      color: white;
      span {
        text-transform: capitalize;
        color: #2d96d6;
        font-weight: bold;
      }
    }

    @media screen and (max-width: 600px) {
      h1 {
        font-size: 44px;
        margin-top: 40%;
        margin-left: -80px;
      }
    }
  }
`;

const Main = styled.div`
  width: 100%;
  padding: 10px 25px;
  padding-top: 30px;
  span.subtitle {
    color: grey;
    font-size: 18px;
    margin-bottom: 0px;
    display: inline-block;
  }
  h2 {
    margin-top: -15px;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .actionBtn {
    background-color: #2e8dcd;
    padding: 8px 12px;
    border-radius: 12px;
    display: inline-block;
    color: white;
  }

  .bg-primary {
    background-color: #2e8dcd;
  }
  .text-secondary {
    color: grey;
  }
`;

const Label = styled.h5`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Booking = (props) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const companyName = params?.companyName;
  const slug = params?.calendar;
  const [times, setTimes] = useState([]);
  const [step, setStep] = useState("first");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { subdomain, domain } = useGetSubdomain();

  const {
    data: {
      calendar,
      unavailableTimes,
      calendar: { duration: which = "15 mins" },
    },
    refetch,
    isFetched,
  } = useQuery(["calendar", companyName.toLowerCase(), slug], getCalendar, {
    initialData: { calendar: {} },
  });

  if (isFetched && !calendar) {
    window.location = "/";
  }

  const timeFunction = (from, to, interval = 15) => {
    let timeArray = [];

    from = from.replace(/^0*/, "");
    to = to.replace(/^0*/, "");
    let [hourFrom, minutesFrom] = from.split(":");
    let [hourTo, minutesTo] = to.split(":");
    unavailableTimes.indexOf(`${hourFrom}:${minutesFrom}`) === -1 &&
      timeArray.push(`${hourFrom}:${minutesFrom}`);
    let minStr = "";
    while (
      Number(String(hourFrom) + String(minutesFrom)) <
      Number(String(hourTo) + String(minutesTo))
    ) {
      minutesFrom = Number(minutesFrom) + interval;
      if (minutesFrom >= 60) {
        hourFrom++;
        minutesFrom = minutesFrom % 60;
      }
      minutesFrom =
        String(minutesFrom).length < 2 ? minutesFrom + String(0) : minutesFrom;
      unavailableTimes.indexOf(`${hourFrom}:${minutesFrom}`) === -1 &&
        timeArray.push(`${hourFrom}:${minutesFrom}`);
    }
    timeArray.pop();

    setTimes(timeArray);
    setTime("");
  };

  useEffect(() => {
    calendar?.availableTime?.from &&
      calendar?.availableTime?.from &&
      timeFunction(
        calendar.availableTime.from,
        calendar.availableTime.to,
        which === "15 mins" ? 15 : which === "30 mins" ? 30 : 60
      );
  }, [calendar, which, unavailableTimes]);

  const nextStep = () => {
    if (!date) {
      const alertID = StatusAlertService.showError("Please select a date");
    } else if (!time) {
      const alertID = StatusAlertService.showError("Please select time");
    } else {
      setStep("second");
    }
  };

  const submitForm = () => {
    if (!name) {
      const alertID = StatusAlertService.showError("Please enter your name");
    } else if (!email) {
      const alertID = StatusAlertService.showError("Please enter your email");
    } else if (!phone) {
      const alertID = StatusAlertService.showError(
        "Please enter your phone number"
      );
    } else {
      setLoading(true);
      let [h, m] = time?.split(":");
      date.setHours(h, m, 0);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/book`,
        data: {
          name,
          email,
          phone,
          time: date,
          companyName: companyName?.toLowerCase(),
          slug,
          which,
        },
      })
        .then((result) => {
          setLoading(false);

          if (result.data.success) {
            setStep("third");
          } else {
            const alertID = StatusAlertService.showError(
              "Something went wrong! Please try again."
            );
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
          const alertID = StatusAlertService.showError(
            "Something went wrong, please try again later!"
          );
        });
    }
  };

  return (
    <Container>
      <StatusAlert />
      {step === "first" && (
        <Calender
          data={{
            which,
            companyName: calendar.companyFullName || companyName,
            calendar,
            times,
            time,
            date,
            setDate,
            setTime,
            continue: time && date ? () => setStep("second") : null,
          }}
        />
      )}
      {step === "second" && (
        <ConfirmationPopUpCalender
          data={{
            which,
            companyName: calendar.companyFullName || companyName,
            calendar,
            times,
            setTime,
            back: () => setStep("first"),
            name,
            setName,
            email,
            setEmail,
            phone,
            setPhone,
            time,
            date,
            continue: name && email && phone ? submitForm : null,
            loading,
          }}
        />
      )}

      {step === "third" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h3 className="text-center">
            The meeting has been scheduled successfully!
          </h3>
          <h4 className="mt-5 text-secondary text-center">
            You will receive an email shortly containing information about the
            meeting.
          </h4>
          <div className="text-center mt-5">
            <NeutralButton
              className="actionBtn"
              onClick={() =>
                window.location.replace(
                  `${window.location.protocol}//${domain}`
                )
              }
            >
              Continue
            </NeutralButton>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Booking;
