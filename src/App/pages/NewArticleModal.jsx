import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const NewArticleModal = ({
  NewArticleshow,
  onShowDiffer,
  handleNewArticleshowClose,
}) => {
  return (
    <>
      <Modal show={NewArticleshow} centered onHide={handleNewArticleshowClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal_heading_article">
              Add an Article to your help desk
            </h5>
            <h5 className="modal_heading2_article">
              The article will be added to the helpdesk language: <b>English</b>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title for your article</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a title for your article"
              />
            </Form.Group>
            <div
              className="mt-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleNewArticleshowClose}
              >
                Cancel
              </Button>{" "}
              <Button
                variant="primary"
                style={{ marginLeft: "10px" }}
                type="submit"
                onClick={onShowDiffer}
              >
                Create Article
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
