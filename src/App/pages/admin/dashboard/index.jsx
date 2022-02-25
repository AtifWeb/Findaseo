import Checkmark from "../../../../Assets/img/checkmark.png";
import ChatGreen from "../../../../Assets/img/chat-green.png";
import OrangeCalender from "../../../../Assets/img/orangecalender.svg";
import CalenderPurple from "../../../../Assets/img/calender-purple.png";
import MessageBlue from "../../../../Assets/img/message-blue.png";
import NeutralButton from "App/component/NeutralButton";
import { useState } from "react";
import capitalize from "helpers/capitalize";
import axios from "axios";
import { StatusAlertService } from "react-status-alert";
import handleError from "App/helpers/handleError";
import { useEffect } from "react";
import { getAdmin } from "App/helpers/auth";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin] = useState(getAdmin());

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/back/companies`,
      data: {},
      headers: { Authorization: "Bearer " },
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          let { companies } = result.data;
          setUsers(companies);
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        const alertID = StatusAlertService.showError(
          handleError(e) || "An error came up, please try again"
        );
        console.log(alertID);
        setLoading(false);
      });
  };

  return (
    <div className="">
      <div className="top-banner-results">
        <div className="box">
          <h4 className="heading">Admin Name</h4>
          <p>{admin?.name}</p>
        </div>
        <div className="box d-flex-align-center">
          <img src={ChatGreen} alt="" />

          <div className="presentation">
            <h4 className="heading">Total Companies</h4>
            <p>{users.length}</p>
          </div>
        </div>
        {/* <div className="box d-flex-align-center">
          <img src={MessageBlue} alt="" />
          <div className="presentation">
            <h4 className="heading">Total Email Tickets</h4>
            <p>{1}</p>
          </div>
        </div>
        <div className="box d-flex-align-center">
          <img src={CalenderPurple} alt="" />
          <div className="presentation">
            <h4 className="heading">Calendar Booking</h4>
            <p>{1}</p>
          </div>
        </div> */}
      </div>

      <div className="EmailTickets CalendarBooking main-wrapper d-flex">
        <div className="body-area">
          <div className="body-main-area">
            <div className="table-wrapper">
              <div className="table">
                <div className="table-head">
                  <div className="col col6">
                    <h5>#</h5>
                  </div>
                  <div className="col col3">
                    <h5>Name</h5>
                  </div>
                  <div className="col col3">
                    <h5>Company Name</h5>
                  </div>
                  <div className="col col3">
                    <h5>Email</h5>
                  </div>
                  <div className="col col4">
                    <h5>Phone</h5>
                  </div>
                  <div className="col col4">
                    <h5>Number of Operators</h5>
                  </div>
                  <div className="col col5">
                    <h5>Actions</h5>
                  </div>
                </div>
                <div className="table-body">
                  {users &&
                    users?.map((user, index) => (
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
                          <p> {capitalize(user?.name)}</p>
                        </div>
                        <div className="col col3	 d-flex-align-center">
                          {capitalize(user?.companyName)}
                        </div>
                        <div
                          style={{ width: "100%" }}
                          className="col col3 d-flex-align-center"
                        >
                          {capitalize(user?.email)}
                        </div>

                        <div className="col col5 d-flex-align-center">
                          {user?.phone}
                        </div>

                        <div className="col col4 d-flex-align-center">
                          {user?.operators}
                        </div>

                        <div className="col col5">
                          <div className="images-wrapper d-flex-align-center">
                            <NeutralButton>
                              {/* <img src={Trash} alt="" /> */}
                            </NeutralButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
