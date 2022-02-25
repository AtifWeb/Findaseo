import { getUser } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import Axios from "Lib/Axios/axios";
import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import DocumentText from "../../../Assets/img/document-text.png";
import LeftArrow from "../../../Assets/img/left-contact.png";
import RightArrow from "../../../Assets/img/right-contact.png";
import Edit from "../../../Assets/img/edit-2.png";
import Trash from "../../../Assets/img/trash.png";
import "react-status-alert/dist/status-alert.css";
import { capitalize } from "@material-ui/core";
import Modal from "App/component/Modal";
import NeutralButton from "App/component/NeutralButton";

const Departments = (props) => {
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [user] = useState(getUser());
  const [action, setAction] = useState("create");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDeparments();
  }, []);
  const fetchDeparments = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/fetchDepartments`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setDepartments(result.data.departments);
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const manageDepartment = () => {
    if (!department) return;
    setLoading(true);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/settings/manageDepartment`,
      data: {
        cID: user?.cID,
        department,
        action,
      },
    })
      .then((result) => {
        setLoading(false);

        if (result.data.success) {
          setDepartments(result.data.departments);
          setDepartment("");
          setShowModal(false);
        } else {
          //
        }
      })
      .catch((e) => {
        console.log(handleError(e));
        setLoading(false);
      });
  };

  // const editDepartment = (index) => {
  //   setAction("edit");
  //   setDepartment(departments[index]);
  //   setShowModal(true);
  // };

  const deleteDepartment = (index) => {
    setAction("delete");
    setDepartment(departments[index]);
    setShowModal(true);
  };

  return (
    <div className="right-area">
      <StatusAlert />
      <Modal open={showModal} setOpen={setShowModal} close>
        <div className="mx-auto text-center">
          <h3>
            {action === "create"
              ? "Add New Department"
              : action === "edit"
              ? "Manage Department"
              : "Delete Department"}
          </h3>

          {action === "delete" ? (
            <div className="mt-4">
              <p>
                You are about to delete the department <b>"{department}"</b>
              </p>

              <div>
                <button
                  className="btn btn-light mt-4"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn"
                  type="button"
                  onClick={manageDepartment}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                className="form-control mt-4 mb-2"
                placeholder="eg. Billing"
                value={department}
                id="department"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <button
                className="btn  mx-auto"
                type="button"
                onClick={manageDepartment}
              >
                {action === "create" ? "Create Department" : "Modify"}
              </button>
            </div>
          )}
        </div>
      </Modal>
      <div className="top-area d-flex-align-center">
        <h3>Departments</h3>

        <div className="slider-area  d-flex-align-center">
          <div className="top-area d-flex-align-center">
            <button
              type="button"
              onClick={() => {
                setDepartment("");
                setAction("create");
                setShowModal(true);
              }}
            >
              Add New Department
            </button>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table">
          <div className="table-head">
            <div className="col col2">
              <h5>#</h5>
            </div>
            <div className="col col3">
              <h5>Department</h5>
            </div>
            <div className="col col7">
              <h5>Actions</h5>
            </div>
          </div>
          <div className="table-body">
            {departments &&
              departments?.map((department, index) => (
                <div className="row" key={String(index)}>
                  <div className="col col2">
                    <p>{String(index + 1)}</p>
                  </div>
                  <div className="col col3 d-flex-align-center">
                    <p>{capitalize(department)}</p>
                  </div>

                  <div className="col col7">
                    <div className="images-wrapper d-flex-align-center">
                      {/* <NeutralButton onClick={() => editDepartment(index)}>
                        <img src={Edit} alt="" />
                      </NeutralButton> */}
                      <NeutralButton onClick={() => deleteDepartment(index)}>
                        <img src={Trash} alt="" />
                      </NeutralButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
