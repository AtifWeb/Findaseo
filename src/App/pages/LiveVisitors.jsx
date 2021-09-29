import React, { useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import GermanyFlag from "../../Assets/img/flag-germany.png";
import FireFox from "../../Assets/img/logos_firefox.png";
import SpainFlag from "../../Assets/img/flag-spain.png";
import JapanFlag from "../../Assets/img/flag-japan.png";
import Chrome from "../../Assets/img/logos_chrome.png";
// import { Doughnut } from 'react-chartjs-2';
// import {Map} from '../../Assets/script/js/Map'
import { VectorMap } from "react-jvectormap";
import { useSelector } from "react-redux";
import { getUser } from "App/helpers/auth";
import { useHistory } from "react-router";
import { format } from "date-fns";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import { useEffect } from "react";
function LiveVisitors() {
  const history = useHistory();
  const onlineVisitors = useSelector((store) => store.onlineVisitors);
  const [user] = useState(getUser());
  const [visits, setVisits] = useState([]);
  const [visitsByCountry, setVisitsByCountry] = useState([]);
  const [visitsByCountryCode, setVisitsByCountryCode] = useState({});
  const [loading, setLoading] = useState(false);
  const mapData = {
    ...visitsByCountryCode,
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
    let countryArray = [];
    for (let x in countries) {
      countryArray.push({ country: x, visits: countries[x] });
    }

    setVisitsByCountry(countryArray);
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
    <div className="LiveVisitors main-wrapper  d-flex">
      {/* sidebar */}
      <Sidebar active="LiveVisitor" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="LiveVisitor" />
        <div className="body-main-area">
          {/* <h2>Live Visitors</h2> */}
          <div className="grid-box-area visitor-grid grid-col-3">
            <div className="visitors-in-site ">
              <div className="top-area d-flex-align-center">
                <h4>Visitors on yours site at the moment</h4>
                <div className="slider-area  d-flex-align-center">
                  <p>
                    <span>1</span> - <span>{onlineVisitors?.length}</span> of
                    <span> {onlineVisitors?.length}</span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
              <div className="table">
                <ul className="table-head">
                  <li>No</li>
                  <li>Name</li>
                  <li>Entered</li>
                  <li>Last Visited Page</li>
                  <li>Country/Device</li>
                </ul>

                <ul className="table-body">
                  {onlineVisitors &&
                    onlineVisitors.map((visitor, index) => (
                      <div className="row" key={String(index)}>
                        <li>{index + 1}.</li>
                        <li>
                          <div className="tag">A</div>
                          <div className="presentation">
                            <h5>
                              {visitor.name}
                              {/* <div className="icons-wrapper">
                                <img
                                  src={`https://www.countryflags.io/${visitor.info.countryCode?.toLowerCase()}/flat/24.png`}
                                  alt=""
                                />
                                <img
                                  src={`/images/browsers/${visitor.info.browser.name.toLowerCase()}.png`}
                                  alt=""
                                />
                              </div> */}
                            </h5>
                            <p>New</p>
                            {/* <a href="http://palevay.com">http://palevay.com</a> */}
                          </div>
                        </li>
                        <li>
                          {format(new Date(visitor.registeredSince), "PP")}
                        </li>
                        <li>
                          <a href="http://pavelify.com">http://pavelify.com</a>
                        </li>
                        <li>
                          <div className="icons-wrapper">
                            <img
                              src={
                                visitor.info.countryCode?.toLowerCase()
                                  ? `https://www.countryflags.io/${visitor.info.countryCode?.toLowerCase()}/flat/24.png`
                                  : GermanyFlag
                              }
                              alt=""
                            />
                            <img
                              src={
                                visitor.info.browser.name.toLowerCase() ===
                                "chrome"
                                  ? Chrome
                                  : FireFox
                              }
                              alt=""
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              history.push(`/LiveChat/${visitor?.uuid}`)
                            }
                          >
                            Start Chat
                          </button>
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            </div>

            <div className="traffic-channels">
              <h4>Traffic Channels</h4>
              <div className="table">
                <ul className="table-head grid-col-3">
                  <li>Country</li>
                  <li>Visits</li>
                  {/* <li>Sales</li> */}
                </ul>
                <ul className="table-body">
                  {visitsByCountry.map((c, index) => (
                    <ul key={String(index)} className="row grid-col-3">
                      <li>{c.country}</li>
                      <li>{c.visits}</li>
                      {/* <li>$3,900</li> */}
                    </ul>
                  ))}
                </ul>
              </div>
            </div>

            <div className="map-area">
              <h4>Visitors Analytics</h4>
              <div style={{ height: 300 }} className="map">
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

            {/* chart area */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveVisitors;
