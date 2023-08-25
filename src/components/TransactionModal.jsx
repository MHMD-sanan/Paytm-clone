import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { searchUser, sendMoney } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const TransactionModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const {
    loggedUser,
    setShowTransaction,
    setShowToast,
    recipient,
    setRecipient,
  } = useStateContext();

  const [error, setError] = useState({
    recipient: false,
    amount: false,
  });


  const handleBlur = () => {
    setError({ ...error, amount: recipient.amount > loggedUser.walletBalance });
  };
  const handleClear = () => {
    setRecipient({});
    setShowTransaction(false);
  };
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

  const handlePay = async () => {
    try {
      const res = await sendMoney(recipient);
      if (res.success) {
        setShowToast({
          status: true,
          type: "success",
          message: "Transaction successful",
        });
        handleClear();
        navigate("/fund-transfer");
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
                placeholder="Enter the amount"
                value={recipient.amount}
                onChange={(e) =>
                  setRecipient({ ...recipient, amount: e.target.value })
                }
                onBlur={handleBlur}
                required
              />
              {error.amount && (
                <p className="text-danger">Not enough balance in your wallet</p>
              )}
            </Form.Group>
          )}
          <Button
            variant="dark"
            disabled={error.amount}
            onClick={recipient.found ? handlePay : findUser}
          >
            {recipient.found ? "Send Money" : "Verify recipient"}
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

export default TransactionModal;
