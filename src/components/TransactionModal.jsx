import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { searchUser, generateOtp, verifyOtp } from "../api/transaction";
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
    otp: false,
  });

  const [otpForm, setOtpForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle onBlur event for checking balance
  const handleBlur = () => {
    setError({ ...error, amount: recipient.amount > loggedUser.walletBalance });
  };

  // Function to clear recipient and error states
  const handleClear = () => {
    setRecipient({
      recipientEmail: "",
      found: false,
      amount: "",
    });
    setError({
      recipient: false,
      amount: false,
      otp: false,
    });
    setShowTransaction(false);
    setOtpForm(false);
  };

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
      setError({ recipient: true });
      setIsLoading(false);
    }
  };

  // Function to handle payment initiation and OTP generation
  const handlePay = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await generateOtp(recipient);
      if (res.success) {
        setOtpForm(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleClear();
      setShowToast({
        status: true,
        type: "danger",
        message: error || "Something went wrong",
      });
    }
  };

  // Function to handle OTP verification and complete the transaction
  const handleOtp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await verifyOtp(recipient);
      if (res.success) {
        setShowToast({
          status: true,
          type: "success",
          message: "Transaction successful",
        });
        setIsLoading(false);
        handleClear();
        navigate("/fund-transfer");
      }
    } catch (error) {
      setIsLoading(false);
      setError({ ...error, otp: true });
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
        <Modal.Title>Transfer Fund</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {otpForm ? (
          // OTP Verification Form
          <Form onSubmit={handleOtp}>
            <h4>Please enter the OTP to verify this transaction</h4>
            <p>OTP has been sent to your email</p>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter the OTP"
                value={recipient.otp}
                onChange={(e) =>
                  setRecipient({ ...recipient, otp: e.target.value })
                }
                required
              />
            </Form.Group>
            {error.otp && <p className="text-danger">Invalid OTP</p>}
            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Verify OTP"}
            </Button>
          </Form>
        ) : (
          // Payment Initiation Form
          <Form onSubmit={recipient.found ? handlePay : findUser}>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
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
            {error.recipient && (
              <p className="text-danger">No recipient found</p>
            )}
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
              disabled={error.amount || isLoading}
              type="submit"
            >
              {isLoading
                ? "Loading..."
                : recipient.found
                ? "Send Money"
                : "Verify Recipient"}
            </Button>
          </Form>
        )}
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
