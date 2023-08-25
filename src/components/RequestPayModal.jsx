import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";

const RequestPayModal = ({ show, onHide }) => {
  const { setShowRequestPay, recipient } = useStateContext();
  const handlePay = () => {};
  const handleClear = () => {
    setShowRequestPay(false);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Transfer Funds</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter number or email"
              value={recipient.recipientEmail}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter the amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the amount"
              value={recipient.amount}
              // onBlur={handleBlur}
              required
            />
            {/* {error.amount && (
                <p className="text-danger">Not enough balance in your wallet</p>
              )} */}
          </Form.Group>
          <Button variant="dark" onClick={handlePay}>
            Pay
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClear}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestPayModal;
