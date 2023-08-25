import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { searchUser, sendRequets } from "../api/user";
const PaymentRequestModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { setShowPaymentRequest, setShowToast } = useStateContext();
  const [error, setError] = useState({
    recipient: false,
    amount: false,
  });

  const [recipient, setRecipient] = useState({
    recipientEmail: "",
    found: false,
    amount: "",
  });

  //search for user
  const findUser = async (e) => {
    e.preventDefault();
    try {
      const res = await searchUser(recipient);
      setError({ recipient: !res.success });
      if (res.success) {
        setRecipient({
          ...recipient,
          found: true,
          recipientEmail: res.user.email,
        });
      }
    } catch (error) {
      setError({ recipient: true });
    }
  };
  const handleRequest = async () => {
    try {
      const res = await sendRequets(recipient);
      if (res.success) {
        setShowToast({
          status: true,
          type: "success",
          message: "Payment request successful",
        });
        handleClear();
        navigate("/fund-request");
      }
    } catch (error) {
      handleClear();
      setShowToast({
        status: true,
        type: "danger",
        message: error,
      });
    }
  };
  const handleClear = () => {
    setRecipient({});
    setShowPaymentRequest(false);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Request Fund</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter number or email"
              value={recipient.recipientEmail}
              required
              onChange={(e) =>
                setRecipient({ ...recipient, recipientEmail: e.target.value })
              }
            />
          </Form.Group>
          {error.recipient && <p className="text-danger">No recipient found</p>}
          {recipient.found && (
            <Form.Group className="mb-3">
              <Form.Label>Enter the amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the amount you want"
                value={recipient.amount}
                onChange={(e) =>
                  setRecipient({ ...recipient, amount: e.target.value })
                }
                required
              />
            </Form.Group>
          )}
          <Button
            variant="dark"
            disabled={error.amount}
            onClick={recipient.found ? handleRequest : findUser}
          >
            {recipient.found ? "Request" : "Verify recipient"}
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

export default PaymentRequestModal;
