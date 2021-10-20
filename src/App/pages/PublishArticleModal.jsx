import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import bold from "../../Assets/img/svg/bold.svg";
export const PublishArticleModal = ({
  NewArticleshow,
  handleNewArticleshowClose,
}) => {
  return (
    <>
      <Modal
        show={NewArticleshow}
        className="publish_modal"
        centered
        onHide={handleNewArticleshowClose}
      >
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal_heading_article">What is the pricing?</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className="top-area"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="primary" style={{ marginRight: 10 }}>
                Content
              </Button>
              <Button variant="outline-secondary">Preview</Button>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="mt-3"
              style={{
                width: "100%",
                border: "1px solid #ddd",
                resize: "none",
                outline: "none",
                height: "300px",
                padding: "1rem",
              }}
            ></textarea>
            <p
              style={{ marginBottom: "0px", textAlign: "center" }}
              className="mt-3 mb-3"
            >
              Articles are formatted with Markdown. Markdown is easy to use.
              <a href="#">find the docs here</a>
            </p>

            <div
              className="top-area"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="success"
                style={{ backgroundColor: "#3DAE2E", marginRight: 10 }}
              >
                Publish Article
              </Button>
              <Button variant="primary">Save Draft</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
