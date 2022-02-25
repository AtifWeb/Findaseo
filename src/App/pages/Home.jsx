import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

// import DocumentText from "../../Assets/img/document-text.png";
// import LeftArrow from "../../Assets/img/left-contact.png";
// import RightArrow from "../../Assets/img/right-contact.png";
import Person1 from "../../Assets/img/Frame 1.png";
import Person2 from "../../Assets/img/Frame 2.png";
import Person3 from "../../Assets/img/Frame 3.png";
// import user from "../../Assets/img/user.png";
import Checkmark from "../../Assets/img/checkmark.png";
import ChatGreen from "../../Assets/img/chat-green.png";
import OrangeCalender from "../../Assets/img/orangecalender.svg";
import CalenderPurple from "../../Assets/img/calender-purple.png";
import MessageBlue from "../../Assets/img/message-blue.png";
import ArrowRight from "../../Assets/img/arrow-right.png";
import GreenMessage from "../../Assets/img/green-message.png";
import LiveChat from "../../Assets/img/live-chat.png";
import { Doughnut, Line } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import {
  // data,
  options,
  Lineoptions,
  // Linedata,
  BarData,
  BarOptions,
} from "../Utils/AnalyticsChart";
import NeutralButton from "App/component/NeutralButton";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { getUser } from "App/helpers/auth";
import { useHistory } from "react-router";
import { capitalize } from "@material-ui/core";
import {
  filterOptions,
  last3Months,
  last6Months,
  last7Days,
  thisMonth,
  thisWeek,
  thisYear,
} from "./analytics/filters";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { useQueries } from "react-query";
import { fetchStats, fetchTodolist } from "Lib/Axios/endpoints/queries";

function Home() {
  const history = useHistory();
  const [user] = useState(getUser());

  // const {
  //   data: todolist,
  // } = useQuery("todolist", fetchTodolist, { initialData: {} });

  const [todolistQuery, statsQeury] = useQueries([
    { queryKey: "todolist", queryFn: fetchTodolist, initialData: {} },
    { queryKey: "stats", queryFn: fetchStats, initialData: {} },
  ]);

  const { data: todolist } = todolistQuery;
  const {
    data: { bookings, contacts, visits, tickets },
  } = statsQeury;

  const [visitsByCountry, setVisitsByCountry] = useState({});
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  const [lineData, setLineData] = useState({
    labels: [],
    data: [],
  });

  let data = {
    labels: Object.keys(visitsByCountry),
    datasets: [
      {
        label: "# of Visits",
        data: Object.values(visitsByCountry),
        backgroundColor: ["#9953B7", "#18AB8F", "#2D96D6", "#EEF0F6"],
        hoverOffset: 5,
        borderColor: ["#9953B7", "#18AB8F", "#2D96D6", "#EEF0F6"],
        borderWidth: 1,
        cutout: 80,
      },
    ],
  };

  let Linedata = (canvas) => {
    let CTX = document.querySelector(".chart-line canvas").getContext("2d");
    var gradient = CTX.createLinearGradient(0, 140, 0, 220);
    gradient.addColorStop(0, "#D1E9F7");

    gradient.addColorStop(1, "#ECF6FC");

    return {
      labels: [...lineData.labels],
      datasets: [
        {
          label: "Unique Visits",
          data: [...lineData.data],
          fill: true,

          backgroundColor: gradient,
          borderColor: "#2D98DA",
        },
      ],
    };
  };

  useEffect(() => {
    visits && filterByCountry();
  }, [visits]);

  useEffect(() => {
    visits && filterByDate();
  }, [filterOption, visits]);

  const filterByCountry = () => {
    let countries = {};
    for (let visit of visits) {
      if (countries[visit?.countryName]) {
        countries[visit?.countryName]++;
      } else {
        countries[visit?.countryName] = 1;
      }
    }
    setVisitsByCountry(countries);
  };

  const filterByDate = () => {
    let type = "day";

    let labels = [],
      datas = [],
      dates = [];

    switch (filterOption) {
      case "This Week":
        dates = thisWeek();
        break;
      case "This Month":
        dates = thisMonth();
        break;

      case "Last 3 Months":
        dates = last3Months();
        type = "month";
        break;

      case "Last 6 Months":
        dates = last6Months();
        type = "month";
        break;

      case "This Year":
        dates = thisYear();
        type = "month";
        break;

      default:
        dates = last7Days();
        break;
    }

    for (let date of dates) {
      labels.push(date);
      let d = 0;

      if (type === "day") {
        for (let visit of visits) {
          if (format(new Date(visit.createdAt), "PP") === date) {
            d++;
          }
        }
      } else {
        for (let visit of visits) {
          if (
            `${format(new Date(visit.createdAt), "MMMM")}-${new Date(
              visit.createdAt
            ).getFullYear()}` === `${date}-${new Date().getFullYear()}`
          ) {
            d++;
          }
        }
      }
      datas.push(d);
    }
    // console.log({ labels, data: datas });
    setLineData({ labels, data: datas });
  };

  return (
    <div className="Home main-wrapper d-flex">
      <Helmet>
        <title>Dashboard - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="home" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="home" />

        <div className="body-main-area">
          {/* <h2>Dashboard</h2> */}

          <div className="top-banner-results">
            <div className="box">
              <h4 className="heading">Company Name</h4>
              <p>
                {user?.companyFullName || user?.companyName
                  ? capitalize(user?.companyFullName || user?.companyName)
                  : ""}
              </p>
            </div>
            <div className="box d-flex-align-center">
              <img src={ChatGreen} alt="" />

              <div className="presentation">
                <h4 className="heading">Chat Leads Acquired</h4>
                <p>{contacts?.length}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={MessageBlue} alt="" />
              <div className="presentation">
                <h4 className="heading">Total Email Tickets</h4>
                <p>{tickets?.length}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={CalenderPurple} alt="" />
              <div className="presentation">
                <h4 className="heading">Calendar Booking</h4>
                <p>{bookings?.length}</p>
              </div>
            </div>
          </div>

          <div className="bottom-area">
            <div className="chart-line-wrapper">
              <div className="top d-flex-align-center">
                <h3>Analytics</h3>
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  name=""
                  id=""
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="chart-line"
                style={{ marginTop: 30, height: 280 }}
              >
                <Line data={Linedata} options={Lineoptions} />
              </div>
            </div>

            <div className="todo-list">
              <div className="top d-flex-align-center">
                <h3>Todo Lists</h3>
                <NeutralButton
                  onClick={() => history.push(`/settings/Integrations`)}
                  style={{ color: "#2998DE" }}
                >
                  See All
                </NeutralButton>
              </div>
              <ul className="bottom">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/settings/LiveChat`)}
                  className="d-flex-align-center"
                >
                  <img src={GreenMessage} alt="" />
                  <p>Configure Live chat </p>
                  {todolist.livechatConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/settings/EmailSetup`)}
                  className="d-flex-align-center"
                >
                  <img src={LiveChat} alt="" />
                  <p>Configure Email Ticketing</p>

                  {todolist.emailTicketConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/CalendarBooking`)}
                  className="d-flex-align-center"
                >
                  <div className="icon-wrapper orange">
                    <img src={OrangeCalender} alt="" />
                  </div>
                  <p>Configure Calendar Meeting</p>

                  {todolist.calendarConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
                {/* <li className="d-flex-align-center">
                  <div className="icon-wrapper whatsapp">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <p>Integrate WhatsApp</p>
                  <NeutralButton>
                    <img src={ArrowRight} alt="" />
                  </NeutralButton>
                </li> */}
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/settings/Messenger`)}
                  className="d-flex-align-center "
                >
                  <div className="icon-wrapper messenger">
                    <i className="fab fa-facebook-messenger"></i>
                  </div>
                  <p>Integrate Messenger</p>

                  {todolist.messengerConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/settings/OperatingHours`)}
                  className="d-flex-align-center"
                >
                  <div className="icon-wrapper hours">
                    <i className="fas fa-hourglass-start"></i>
                  </div>
                  <p>Set Operating Hours</p>

                  {todolist.operatingHoursConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/Contact`)}
                  className="d-flex-align-center"
                >
                  <div className="icon-wrapper contacts">
                    <i className="far fa-address-book"></i>
                  </div>
                  <p>Import Contacts</p>

                  {todolist.contactsConfigured ? (
                    <img style={{ height: "20px" }} src={Checkmark} alt="" />
                  ) : (
                    <img src={ArrowRight} alt="" />
                  )}
                </li>
              </ul>
            </div>

            <div className="dognut-chart">
              <div className="top d-flex-align-center">
                <h3>Charts</h3>
                <div className="dots">
                  <svg
                    width="22"
                    height="6"
                    viewBox="0 0 22 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2.0625" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="11" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="19.9375" cy="3" r="2.0625" fill="#282D4A" />
                  </svg>
                </div>
              </div>

              <div className="chart-container">
                <p>
                  {visits?.length} <span>Visitors</span>
                </p>
                <Doughnut data={data} options={options} />
              </div>
            </div>

            {/* <div className="visitor-vector-map">
              <div className="top d-flex-align-center">
                <h3>Visitors</h3>
                <div className="dots">
                  <svg
                    width="22"
                    height="6"
                    viewBox="0 0 22 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2.0625" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="11" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="19.9375" cy="3" r="2.0625" fill="#282D4A" />
                  </svg>
                </div>
              </div>

              <div style={{ height: 200 }} className="map">
                <VectorMap
                  map={"world_mill"}
                  backgroundColor="#fff"
                  zoomOnScroll={false}
                  regionStyle={{
                    initial: {
                      fill: "#dfe1f7",
                    },
                    hover: {
                      fill: "#7822e6",
                    },
                    selected: {
                      fill: "#7822e6",
                    },
                  }}
                  series={{
                    regions: [
                      {
                        values: mapData, //this is your data
                        scale: ["#7822e6"], //your color game's here
                        normalizeFunction: "polynomial",
                      },
                    ],
                  }}
                  regionsSelectable={true}
                  containerStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  containerClassName="map"
                />
              </div>
            </div> */}

            <div className="Customer-Lists">
              <div className="top d-flex-align-center">
                <h3>Customer Catalogue</h3>
                <NeutralButton onClick={() => history.push(`/LiveChat`)}>
                  See All
                </NeutralButton>
              </div>
              <ul className="bottom">
                {contacts &&
                  contacts.map((contact, index) => (
                    <li key={String(index)} className="d-flex-align-center">
                      <div
                        className="livechat-tag"
                        style={{
                          background: contact?.color || "red",
                          marginRight: "5px",
                        }}
                      >
                        {contact?.name?.slice(0, 1) || 0}
                      </div>
                      <div className="presentation">
                        <p>{contact?.name}</p>
                        <p>{contact?.email}</p>
                      </div>
                      <button
                        onClick={() =>
                          history.push(`/LiveChat/${contact?.uuid}`)
                        }
                      >
                        Contact
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
