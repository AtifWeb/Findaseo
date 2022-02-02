import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
// import PlusIcon from '../../Assets/img/purple-plus.png'
// import Message from '../../Assets/img/message.png'
// import Tickets from '../../Assets/img/sms-tracking.png'
// import Calenders from '../../Assets/img/calendar.png'
// import DocumentText from '../../Assets/img/document-text.png'
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import Person1 from "../../Assets/img/Frame 1.png";
import Person2 from "../../Assets/img/Frame 2.png";
import Person3 from "../../Assets/img/Frame 3.png";
import Edit from "../../Assets/img/edit-2.png";
import Trash from "../../Assets/img/trash.png";
import Settings from "../../Assets/img/settings-table.svg";
import { getUser } from "App/helpers/auth";
import Axios from "Lib/Axios/axios";
import handleError from "App/helpers/handleError";
import Modal from "App/component/Modal";
import NeutralButton from "App/component/NeutralButton";
import { format } from "date-fns";
import { capitalize } from "@material-ui/core";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchOperatorsAndDepartments } from "Lib/Axios/endpoints/queries";
import { manageOperator } from "Lib/Axios/endpoints/mutations";

function Operators() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getUser());
  const [action, setAction] = useState("create");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState([]);
  const [operator, setOperator] = useState();
  const [open, setOpen] = useState(false);

  const {
    data: { operators, departments },
    refetch,
  } = useQuery("operatorsAndDepartments", fetchOperatorsAndDepartments, {
    initialData: {},
  });

  const mutation = useMutation(manageOperator, {
    onSuccess: (data) => {
      console.log({ data });
      setLoading(false);
      setOpen(false);
      refetch({});
    },
    onError: (error) => {
      const alertID = StatusAlertService.showError(handleError(error));
      console.log(handleError(error));
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(
      ".table-body .row .col1 input"
    );

    //    click event on first checkbox i mean main checkbox
    Checkbox.addEventListener("click", (e) => {
      if (e.target.checked === true) {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = true;
        });
      } else {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = false;
        });
      }
    });
  }, []);

  const editOperator = (index) => {
    setAction("edit");
    setOpen(true);
    setName(operators[index].name);
    setEmail(operators[index].email);
  };

  const deleteOperator = (index) => {
    setAction("delete");
    setOpen(true);
    setName(operators[index].name);
    setEmail(operators[index].email);
  };

  const operatorDepartment = (index) => {
    setAction("department");
    setOpen(true);
    setOperator(operators[index]);
    setDepartment(operators[index].department);
  };

  const toggleDepartment = (d) => {
    if (department.indexOf(d) === -1) {
      setDepartment((dep) => [...dep, d]);
    } else {
      setDepartment((dep) => dep.filter((a) => a !== d));
    }
  };

  return (
    <div className="Contact Operators main-wrapper d-flex">
      <Helmet>
        <title>Operators - Pavelify</title>
      </Helmet>
      {/* sidebar */}
      <Sidebar active="operators" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="operators" />
        <StatusAlert />
        <Modal open={open} setOpen={setOpen} close>
          <div className="modal-body mx-auto text-center">
            <h3 className="modal-title mb-4" id="operatorModalLabel">
              {action === "create"
                ? " Create New "
                : action === "edit"
                ? "Edit "
                : action === "department"
                ? "Departments for "
                : "Delete "}
              Operator
            </h3>
            {action === "department" ? (
              <div>
                <select
                  value={department}
                  onChange={(e) => toggleDepartment(e.target.value)}
                  multiple
                  name="departments"
                  id=""
                  className="form-control"
                >
                  {departments &&
                    departments.map((depart, index) => (
                      <option key={String(index)}>{depart}</option>
                    ))}
                </select>
              </div>
            ) : action !== "delete" ? (
              <div>
                <input
                  type="text"
                  placeholder="e.g John Steven"
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="e.g xxx@mail.com"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : (
              <p>Are you sure you want to delete this Operator?</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn"
              data-bs-dismiss="modal"
              onClick={() =>
                mutation.mutate({ operator, action, department, name, email })
              }
              loading={loading}
            >
              {action === "create"
                ? " Create"
                : action === "edit"
                ? "Edit"
                : action === "department"
                ? "Manage Department"
                : "Delete"}
            </button>
          </div>
        </Modal>

        <div className="body-main-area">
          {/* <h2>Operators</h2> */}
          <div className="body-box" style={{ display: "block" }}>
            {/* right area */}
            <div className="right-area">
              <div className="top-area d-flex-align-center">
                <h3>Operators</h3>
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setOpen(true);
                    setAction("create");
                  }}
                >
                  Add New Operator
                </button>

                <div className="slider-area  d-flex-align-center">
                  <p>
                    <span>1</span> - <span>{operators?.length}</span> of{" "}
                    <span>{operators?.length}</span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
              <div className="table-wrapper">
                <div className="table">
                  <div className="table-head">
                    <div className="col col1">
                      <input type="checkbox" name="" id="all-check-checkbox" />
                    </div>
                    <div className="col col2">
                      <h5>Profile</h5>
                    </div>
                    <div className="col col3">
                      <h5>Email</h5>
                    </div>
                    <div className="col col4">
                      <h5>Online</h5>
                    </div>
                    <div className="col col5">
                      <h5>Last Login</h5>
                    </div>
                    <div className="col col6">
                      <h5>Departement</h5>
                    </div>
                    <div className="col col7">
                      <h5>Actions</h5>
                    </div>
                  </div>
                  <div className="table-body">
                    {operators &&
                      operators?.map((operator, index) => (
                        <div className="row" key={String(index)}>
                          <div className="col col1">
                            <input type="checkbox" name="" id="" />
                          </div>
                          <div className="col col2 d-flex-align-center">
                            <div
                              className="livechat-tag"
                              style={{
                                background: operator?.color || "#2D96D6",
                                marginRight: "5px",
                              }}
                            >
                              {operator?.name?.slice(0, 1) || 0}
                            </div>
                            <p>{operator?.name}</p>
                          </div>
                          <div className="col col3">
                            <p>{operator?.email}</p>
                          </div>
                          <div className="col col4">
                            <button
                              className={
                                operator?.online ? "Online" : "offline"
                              }
                            >
                              {operator?.online ? "Online" : "Offline"}
                            </button>
                          </div>
                          <div className="col col5">
                            <p>
                              {operator?.last_login
                                ? `${format(
                                    new Date(operator?.last_login),
                                    "PP"
                                  )}`
                                : ""}
                            </p>
                          </div>
                          <div className="col col6">
                            <h5>
                              {operator?.department?.reduce(
                                (prev, curr) =>
                                  `${capitalize(prev)}, ${capitalize(curr)}`
                              )}
                            </h5>
                          </div>
                          <div className="col col7">
                            <div className="images-wrapper d-flex-align-center">
                              {/* <NeutralButton
                                onClick={() => editOperator(index)}
                              >
                                <img src={Edit} alt="" />
                              </NeutralButton> */}
                              <NeutralButton
                                onClick={() => deleteOperator(index)}
                              >
                                <img src={Trash} alt="" />
                              </NeutralButton>
                              <NeutralButton
                                onClick={() => operatorDepartment(index)}
                              >
                                <img src={Settings} alt="" />
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
    </div>
  );
}

export default Operators;
