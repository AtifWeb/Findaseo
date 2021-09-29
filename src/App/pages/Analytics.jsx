import React from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

// import DocumentText from "../../Assets/img/document-text.png";
// import LeftArrow from "../../Assets/img/left-contact.png";
// import RightArrow from "../../Assets/img/right-contact.png";
import Person1 from "../../Assets/img/Frame 1.png";
import Person2 from "../../Assets/img/Frame 2.png";
import Person3 from "../../Assets/img/Frame 3.png";
// import user from "../../Assets/img/user.png";
// import BlueLow from "../../Assets/img/blue-low.png";
import ChatGreen from "../../Assets/img/chat-green.png";
import CalenderPurple from "../../Assets/img/calender-purple.png";
import MessageBlue from "../../Assets/img/message-blue.png";
// import ArrowRight from "../../Assets/img/arrow-right.png";
// import GreenMessage from "../../Assets/img/green-message.png";
// import LiveChat from "../../Assets/img/live-chat.png";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
import { useHistory } from "react-router";
import { getUser } from "App/helpers/auth";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { capitalize } from "@material-ui/core";
function Analytics() {
  const history = useHistory();
  const [user] = useState(getUser());
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [visits, setVisits] = useState([]);
  const [visitsByCountry, setVisitsByCountry] = useState({});
  const [visitsByCountryCode, setVisitsByCountryCode] = useState({});
  const [loading, setLoading] = useState(false);
  const mapData = {
    ...visitsByCountryCode,
  };

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
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Unique Visits",
          data: [
            3000, 3000, 9000, 7000, 6000, 6500, 8000, 9500, 300, 400, 333, 7000,
          ],
          fill: true,

          backgroundColor: gradient,
          borderColor: "#2D98DA",
        },
      ],
    };
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    visits && filterByCountry();
    visits && filterByCountryCode();
  }, [visits]);

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

  const filterByCountryCode = () => {
    let countries = {};
    for (let visit of visits) {
      if (visit?.countryCode) {
        if (countries[visit?.countryCode]) {
          countries[visit?.countryCode]++;
        } else {
          countries[visit?.countryCode] = 1;
        }
      }
    }
    setVisitsByCountryCode(countries);
    console.log({ countries });
  };

  const fetchStats = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/getStats`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setTickets(result.data.stats?.tickets);
            setBookings(result.data.stats?.bookings);
            setContacts(result.data.stats?.contacts);
            setVisits(result.data.stats?.visits);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  return (
    <div className="Home main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="Analytics" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="Analytics" />

        <div className="body-main-area">
          {/* <h2>Analytics</h2> */}

          <div className="top-banner-results">
            <div className="box">
              <h4 className="heading">Company Name</h4>
              <p>{user?.companyName ? capitalize(user?.companyName) : ""}</p>
            </div>
            <div className="box d-flex-align-center">
              <img src={ChatGreen} alt="" />

              <div className="presentation">
                <h4 className="heading">Chat Leads Acquired</h4>
                <p>{contacts?.length}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={CalenderPurple} alt="" />
              <div className="presentation">
                <h4 className="heading">Total Email Tickets</h4>
                <p>{tickets?.length}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={MessageBlue} alt="" />
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
                <select name="" id="">
                  <option value="Last 30 days">Last 30 days</option>
                </select>
              </div>
              <div
                className="chart-line"
                style={{ marginTop: 30, height: 280 }}
              >
                <Line data={Linedata} options={Lineoptions} />
              </div>
            </div>

            {/* <div className="todo-list">
              <div
                className="top d-flex-align-center"
                style={{ marginTop: 10 }}
              >
                <h3>User Activity</h3>
              </div>
              <div
                className="bar-chart-wrapper"
                style={{ marginTop: 40, height: 280 }}
              >
                <Bar data={BarData} options={BarOptions} />
              </div>
            </div> */}

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

            <div className="visitor-vector-map">
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
            </div>

            <div className="Customer-Lists">
              <div className="top d-flex-align-center">
                <h3>Contacts (Live Chat)</h3>
                <NeutralButton onClick={() => history.push(`/LiveChat`)}>
                  See All
                </NeutralButton>
              </div>
              <ul className="bottom">
                {contacts &&
                  contacts.map((contact, index) => (
                    <li key={String(index)} className="d-flex-align-center">
                      <img src={Person1} alt="" />
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

export default Analytics;
