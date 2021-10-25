import React, { useEffect, useState } from "react";
import BodyHeader from "App/component/BodyHeader";
import Sidebar from "App/component/Sidebar";

import { useHistory, useParams } from "react-router";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import NeutralButton from "App/component/NeutralButton";
function Todolist() {
  const params = useParams();
  const history = useHistory();
  const [user] = useState(getUser());
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="Contact main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="home" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="home" />

        <div className="body-main-area">
          <div
            className="body-box px-3 pt-2 pb-4"
            style={{ gridTemplateColumns: "unset" }}
          >
            <h3>Todolist</h3>

            <div className="mt-4">
              <ul className="bottom">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/settings/LiveChat`)}
                  className="d-flex-align-center"
                >
                  {/* <img src={LiveChat} alt="" /> */}
                  <p>Configure Live chat </p>
                  {false ? (
                    <img style={{ height: "20px" }} src={""} alt="" />
                  ) : (
                    <img src={""} alt="" />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
