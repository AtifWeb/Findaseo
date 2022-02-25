import React from "react";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import styles from "./BookMeeting.module.css";
import BookMeetingImage from "../../../../../Assets/img/BookMeeting.svg";
import { useState } from "react";
import axios from "axios";
import handleError from "App/helpers/handleError";
import { useEffect } from "react";
import NeutralButton from "App/component/NeutralButton";
import { capitalize } from "@material-ui/core";
import useGetSubdomain from "App/hooks/useGetSubdomain";
export const BookMeeting = ({ company, companyName }) => {
  const { domain } = useGetSubdomain();
  const [showMeetings, setShowMeetings] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showMeetings && fetchCalendars();
  }, [showMeetings]);

  const fetchCalendars = () => {
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/livechat/calendars`,
      data: {
        cID: company,
      },
    })
      .then((result) => {
        if (result.data.success) {
          setLoading(false);
          setCalendars(result.data.calendars);
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
    <div className={styles.BookMeeting}>
      <h2 className={styles.heading}>Schedule a meeting</h2>
      {!showMeetings ? (
        <SenderButton
          // to="/plus/Calender"
          onClick={() => setShowMeetings(true)}
          text="Book a meeting"
          img={<i className="fas fa-calendar-week"></i>}
        />
      ) : (
        <div>
          {!calendars?.length ? (
            loading ? (
              <p>
                {" "}
                <i
                  style={{ color: "#222" }}
                  className="fas fa-spin fa-spinner"
                ></i>{" "}
              </p>
            ) : (
              <p style={{ color: "#222" }}>No Meeting available</p>
            )
          ) : (
            <div>
              {calendars?.map((calendar, index) => (
                <NeutralButton
                  key={String(index)}
                  style={{
                    borderBottom: "1px solid lightgrey",
                    marginBottom: "10px",
                    padding: "20px 5px",
                    boxShadow: "2px 2px 2px 2px lightgrey",
                    borderRadius: "8px",
                  }}
                  onClick={() =>
                    window.open(
                      `${
                        window.location.protocol
                      }//meeting.${domain}/${capitalize(companyName)}/${
                        calendar.slug
                      }`,
                      "_blank"
                    )
                  }
                >
                  <span className={styles.meeting}>{calendar?.name}</span>{" "}
                  <span className={styles.meeting}>({calendar?.location})</span>
                </NeutralButton>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
