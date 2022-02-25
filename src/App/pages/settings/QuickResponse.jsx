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

const QuickResponse = (props) => {
  const [loading, setLoading] = useState(false);
  const [quickResp, setQiuckResp] = useState("");
  const [quickResponses, setQuickResponse] = useState([]);
  const [user] = useState(getUser());
  const [action, setAction] = useState("create");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuckResponse();
  }, []);
  const fetchQuckResponse = () => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings`,
        data: {
          cID: user?.cID,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setQuickResponse(result.data.configuration.quickResponse);
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
    if (!quickResp) return;
    setLoading(true);

    if (action === "create") {
      let newData = [...quickResponses, quickResp];
      submitConfiguration(newData);
    } else if (action === "delete") {
      let newData = quickResponses.filter((p) => p !== quickResp);
      submitConfiguration(newData);
    }
  };

  const submitConfiguration = (data) => {
    user &&
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/settings/save`,
        data: {
          cID: user?.cID,
          configuration: {
            quickResponse: data,
          },
        },
      })
        .then((result) => {
          if (result.data.success) {
            setLoading(false);
            setQuickResponse(data);
            setQiuckResp("");
            setShowModal(false);
            const alertID = StatusAlertService.showSuccess(
              "Settings saved successfully!"
            );
          } else {
            //
          }
        })
        .catch((e) => {
          console.log(handleError(e));
          setLoading(false);
        });
  };

  const deleteDepartment = (index) => {
    setAction("delete");
    setQiuckResp(quickResponses[index]);
    setShowModal(true);
  };

  return (
    <div className="right-area mt-4 mx-4">
      <StatusAlert />
      <Modal open={showModal} setOpen={setShowModal} close>
        <div className="mx-auto text-center">
          <h3>
            {action === "create"
              ? "Add Quick Response"
              : action === "edit"
              ? "Manage Quick Response"
              : "Delete Quick Response"}
          </h3>

          {action === "delete" ? (
            <div className="mt-4">
              <p>
                You are about to delete the Quick Response <b>"{quickResp}"</b>
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
              <textarea
                type="text"
                className="form-control mt-4 pt-1 mb-2"
                placeholder="Enter message"
                value={quickResp}
                id="department"
                style={{ height: "60px" }}
                onChange={(e) => setQiuckResp(e.target.value)}
              />
              <button
                className="btn  mx-auto"
                type="button"
                onClick={manageDepartment}
              >
                {action === "create" ? "Create Quick Response" : "Modify"}
              </button>
            </div>
          )}
        </div>
      </Modal>
      <div className="top-area d-flex-align-center">
        <h3 style={{ flex: "1 1" }}>Quick Response</h3>

        <div className="slider-area  d-flex-align-center">
          <div className="top-area d-flex-align-center">
            <button
              type="button"
              onClick={() => {
                setQiuckResp("");
                setAction("create");
                setShowModal(true);
              }}
            >
              Add New Quick Response
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
              <h5>Quick Response</h5>
            </div>
            <div className="col col7">
              <h5>Actions</h5>
            </div>
          </div>
          <div className="table-body">
            {quickResponses &&
              quickResponses?.map((department, index) => (
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

export default QuickResponse;
