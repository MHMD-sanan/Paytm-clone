import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { searchUser, sendRequest } from "../api/user";

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

  const [isLoading, setIsLoading] = useState(false);

  // Function to search for a user
  const findUser = async (e) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError({ recipient: true });
    }
  };

  // Function to handle sending the payment request
  const handleRequest = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await sendRequest(recipient);
      if (res.success) {
        setShowToast({
          status: true,
          type: "success",
          message: "Payment request successful",
        });
        handleClear();
        setIsLoading(false);
        navigate("/fund-request");
      }
    } catch (error) {
      setIsLoading(false);
      handleClear();
      setShowToast({
        status: true,
        type: "danger",
        message: error,
      });
    }
  };

  // Function to clear recipient and close the modal
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
        <Form onSubmit={recipient.found ? handleRequest : findUser}>
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
            disabled={error.amount || isLoading}
            type="submit"
          >
            {isLoading
              ? "Loading..."
              : recipient.found
              ? "Request"
              : "Verify recipient"}
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
