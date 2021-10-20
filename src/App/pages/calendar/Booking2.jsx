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

const Container = styled.div`
  display: flex;
  height: 100vh;
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
  const [which, setWhich] = useState("15 mins");
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState({});
  const params = useParams();
  const companyName = params?.companyName;
  const slug = params?.calendar;
  const [times, setTimes] = useState([]);
  const [step, setStep] = useState("first");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  useEffect(() => {
    companyName && slug && getCalendar();
  }, [companyName, slug]);

  const timeFunction = (from, to, interval = 15) => {
    let timeArray = [];

    from = from.replace(/^0*/, "");
    to = to.replace(/^0*/, "");
    let [hourFrom, minutesFrom] = from.split(":");
    let [hourTo, minutesTo] = to.split(":");
    unavailableTimes.indexOf(`${hourFrom}:${minutesFrom}`) === -1 &&
      timeArray.push(`${hourFrom}:${minutesFrom}`);

    while (
      Number(String(hourTo) + String(minutesTo)) >
      Number(String(hourFrom) + String(minutesFrom))
    ) {
      minutesFrom = Number(minutesFrom) + interval;
      if (minutesFrom > 60) {
        hourFrom++;
        minutesFrom = minutesFrom % 60;
      }
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

  const getCalendar = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/get`,
      data: {
        companyName: companyName?.toLowerCase(),
        slug,
      },
    })
      .then((result) => {
        if (result.data.success) {
          if (!calendar) {
            window.location = "/";
          }
          setLoading(false);
          console.log(result.data.calendar);
          setCalendar(result.data.calendar);
          setUnavailableTimes(result.data.unavailableTimes);
        } else {
          window.location = "/";
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        setLoading(false);
      });
  };

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
          companyName,
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
      <Greeting>
        <div>
          <img src={SideBarLogo} alt="" />
          <a href="/">Go Back</a>
        </div>
        <div>
          <h1>Book a Meeting _</h1>
          <p>
            with{" "}
            <span> {calendar?.companyFullName || calendar?.companyName}</span>
          </p>
        </div>
      </Greeting>

      <Main style={{ width: "100%" }}>
        <StatusAlert />
        <span className="subtitle">Event:</span>
        {calendar?.name && <h2>{calendar?.name}</h2>}
        {step === "first" && (
          <div className="row">
            <div className="col">
              <div className="">
                <Label>Select a Date</Label>
                <Calendar
                  className="bg-primary w-100"
                  onChange={(value, event) => setDate(value)}
                  value={date}
                  defaultView="month"
                  tileClassName={({ activeStartDate, date, view }) =>
                    new Date(activeStartDate).getMonth() !==
                    new Date(date).getMonth()
                      ? "text-secondary"
                      : "text-white"
                  }
                  tileContent=""
                  tileDisabled={({ activeStartDate, date, view }) =>
                    calendar?.availableDays?.indexOf(
                      daysOfTheWeek[date.getDay()]
                    ) < 0
                  }
                  defaultValue={new Date()}
                />
              </div>
            </div>
            <div className="col">
              <Label>How long do you need?</Label>
              <div className="btn-group" role="group" aria-label="Time needed">
                <button
                  onClick={() => setWhich("15 mins")}
                  type="button"
                  className={`btn ${
                    which === "15 mins" ? "btn-primary" : "btn-light"
                  } px-3`}
                >
                  15 mins
                </button>
                <button
                  onClick={() => setWhich("30 mins")}
                  type="button"
                  className={`btn ${
                    which === "30 mins" ? "btn-primary" : "btn-light"
                  } px-3`}
                >
                  30 mins
                </button>
                <button
                  onClick={() => setWhich("1 hour")}
                  type="button"
                  className={`btn ${
                    which === "1 hour" ? "btn-primary" : "btn-light"
                  } px-3`}
                >
                  1 hour
                </button>
              </div>

              <div className="mt-4">
                <Label>What time work best?</Label>
                <Dropdown
                  options={times}
                  onChange={(t) => setTime(t.value)}
                  value={time}
                  placeholder="Select an option"
                  menuClassName="text-center"
                  className="text-center"
                  placeholderClassName="text-primary"
                  controlClassName=""
                />
              </div>
              <div className="text-center mt-3">
                <NeutralButton className="actionBtn" onClick={() => nextStep()}>
                  Continue
                </NeutralButton>
              </div>
            </div>
          </div>
        )}

        {step === "second" && (
          <div>
            <h4 className="text-center">Lets get to know you,</h4>
            <div className=" text-center mt-5">
              <div className="mb-3">
                <label htmlFor=""> Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className=" mb-3">
                <label htmlFor="">Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="">Phone Number:</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="form-control"
                />
              </div>

              <div className="text-center mt-5">
                <NeutralButton
                  className="actionBtn"
                  onClick={() => submitForm()}
                >
                  Finish
                </NeutralButton>
              </div>
            </div>
          </div>
        )}

        {step === "third" && (
          <div>
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
                onClick={() => (window.location = "/")}
              >
                Continue
              </NeutralButton>
            </div>
          </div>
        )}
      </Main>
    </Container>
  );
};

export default Booking;
