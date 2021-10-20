import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../component/Sidebar";
import SpainFlag from "../../Assets/img/flag-spain.png";
import { Badge, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NewArticleModal } from "./NewArticleModal";
import { PublishArticleModal } from "./PublishArticleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Home_Desk() {
  const [NewArticleshow, setNewArticleshow] = useState(false);
  const [NewPublishArticleModalshow, setPublishArticleModalShow] =
    useState(false);

  const handleNewArticleshowClose = () => setNewArticleshow(false);
  const handleNewArticleshowShow = () => setNewArticleshow(true);

  const handlePublishArticleClose = () => setPublishArticleModalShow(false);
  const handlePublishArticleShow = () => setPublishArticleModalShow(true);

  const handlePublishArticleShowWithClick = (e) => {
    e.preventDefault();
    setNewArticleshow(false);
    setPublishArticleModalShow(true);
  };

  return (
    <div className="Home main-wrapper d-flex Home_Desk">
      <NewArticleModal
        NewArticleshow={NewArticleshow}
        onShowDiffer={handlePublishArticleShowWithClick}
        handleNewArticleshowClose={handleNewArticleshowClose}
      />
      <PublishArticleModal
        NewArticleshow={NewPublishArticleModalshow}
        handleNewArticleshowClose={handlePublishArticleClose}
      />

      {/* sidebar */}
      <Sidebar active="help_desk" />
      <div className="body-area">
        <div className="body_sidebar">
          <div className="body_sidebar_box">
            <img src={SpainFlag} alt="" />
            <p> English</p>
          </div>
          <div
            className="body_sidebar_box no_bg "
            style={{ fontWeight: 700, marginTop: 20 }}
          >
            <p> HELP DESK</p>
          </div>
          <ul style={{ paddingLeft: 0 }}>
            <li className="body_sidebar_box" style={{ marginBottom: 0 }}>
              Articles
            </li>
            <li
              className="body_sidebar_box "
              style={{
                marginBottom: 0,
                background: "transparent",
                border: "none",
              }}
            >
              Categories
            </li>
          </ul>
          <div className="body_sidebar_box no_bg" style={{ fontWeight: 700 }}>
            <p>Status</p>
          </div>
          <ul style={{ paddingLeft: 0 }}>
            <li
              className="body_sidebar_box"
              style={{ marginBottom: 0 }}
              style={{
                marginBottom: 0,
                background: "transparent",
                border: "none",
              }}
            >
              Punlished
            </li>
            <li
              className="body_sidebar_box "
              style={{
                marginBottom: 0,
                background: "transparent",
                border: "none",
              }}
            >
              Draft
            </li>
            <li
              className="body_sidebar_box "
              style={{
                marginBottom: 0,
                background: "transparent",
                border: "none",
              }}
            >
              Visible
            </li>
            <li
              className="body_sidebar_box "
              style={{
                marginBottom: 0,
                background: "transparent",
                border: "none",
              }}
            >
              Draft
            </li>
          </ul>
        </div>

        <div className="content_inner">
          <div className="body_header">
            <form className="left-area d-flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="#9CA2C9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="#9CA2C9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input type="text" placeholder="Search..." />
            </form>

            <div className="buttons-wrapper">
              <button>Page Setup</button>
              <button>Documentation</button>
              <button onClick={handleNewArticleshowShow}>New Article</button>
            </div>

            <div
              className="burger-icon"
              onClick={(e) =>
                document.querySelector(".Sidebar").classList.toggle("active")
              }
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>

          <Table hover style={{ background: "#FAFAFA" }} responsive="sm">
            <thead>
              <tr>
                <th>article title</th>
                <th>status</th>
                <th>statistics</th>
                <th>last update</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="hoverable">
              <tr onClick={handlePublishArticleShow}>
                <td className="first_cell">
                  <input type="checkbox" name="" id="" />
                  <span> What is Pricing?</span>
                </td>
                <td>Draft</td>
                <td>
                  <Badge bg="secondary">0 visit</Badge>
                </td>
                <td>
                  <p>11 Oct</p>
                  <p>Created: 10 Oct</p>
                </td>
                <td>
                  <Button variant="primary">
                    <i class="fas fa-cog"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Home_Desk;
