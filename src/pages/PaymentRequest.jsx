import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import PaymentRequestModal from "../components/PaymentRequestModal";
import { useStateContext } from "../context/ContextProvider";
import { getRequests } from "../api/request";
import { useNavigate } from "react-router-dom";

const PaymentRequest = () => {
  const navigate = useNavigate();
  const {
    showPaymentRequest,
    setShowPaymentRequest,
    loggedUser,
    setShowTransaction,
    setRecipient,
  } = useStateContext();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch payment requests history
    const fetchHistory = async () => {
      try {
        const res = await getRequests();
        if (res.success) {
          const data = res.requests.filter(
            (item) => item.recipient._id === loggedUser._id
          );
          setHistory(data);
        }
      } catch (error) {
        console.error("Error fetching payment requests:", error);
      }
    };
    fetchHistory();
  }, [loggedUser]);

  // Show and hide PaymentRequestModal
  const handleShowPaymentRequest = () => {
    setShowPaymentRequest(true);
  };
  const handleClosePaymentRequest = () => {
    setShowPaymentRequest(false);
  };

  // Convert date to a user-friendly format
  const convertDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  // Handle payment action
  const handlePay = (email, amount, requestId) => {
    setRecipient({
      recipientEmail: email,
      found: true,
      amount: amount,
      paymentRequestId: requestId,
    });
    setShowTransaction(true);
    navigate("/fund-transfer");
  };

  return (
    <div className="m-5">
      <div className="my-3 d-flex justify-content-between align-items-center">
        <h3>Requests</h3>
        <Button variant="dark" onClick={handleShowPaymentRequest}>
          Request Money
        </Button>
      </div>
      <PaymentRequestModal
        show={showPaymentRequest}
        onHide={handleClosePaymentRequest}
      />
      <div className="container">
        {history.length > 0 ? (
          <Table striped bordered responsive>
            <thead>
              <tr className="text-center">
                <th>Date</th>
                <th>Sender</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((value) => (
                <tr key={value._id} className="text-center">
                  <td>{convertDate(value.createdDate)}</td>
                  <td>{value.sender.userName}</td>
                  <td>$ {value.amount}</td>
                  <td>
                    {value.status === "pending" ? (
                      <Button
                        variant="dark"
                        onClick={() =>
                          handlePay(value.sender.email, value.amount, value._id)
                        }
                      >
                        Pay
                      </Button>
                    ) : (
                      value.status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center mt-5">No transaction history found</p>
        )}
      </div>
    </div>
  );
};

export default PaymentRequest;
