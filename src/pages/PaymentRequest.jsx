import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PaymentRequestModal from "../components/PaymentRequestModal";
import { useStateContext } from "../context/ContextProvider";
import { getRequets } from "../api/user";
import { useNavigate } from "react-router-dom";
import RequestPayModal from "../components/RequestPayModal";
const PaymentRequest = () => {
  const navigate = useNavigate();
  const {
    showPaymentRequest,
    setShowPaymentRequest,
    loggedUser,
    setShowTransaction,
    setRecipient,
    showRequestPay,
    setShowRequestPay,
  } = useStateContext();

  const [history, setHistory] = useState();
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getRequets();
      if (res.success && res.requests.length === 0) {
        setHistory("");
      } else {
        const data = res.requests.filter(
          (item) => item.recipient._id === loggedUser._id
        );
        setHistory(data);
      }
    };
    fetchHistory();
  }, []);

  //for request
  const handleShowPaymentRequest = () => {
    setShowPaymentRequest(true);
  };
  const handleClosePaymentRequest = () => {
    setShowPaymentRequest(false);
  };

  //for paying request with separate modal
  // const handleShowRequestPay = (email,amount) => {
  //   setShowRequestPay(true);
  //   setRecipient({
  //     recipientEmail: email,
  //     found: true,
  //     amount: amount,
  //   });
  // };
  // const handleCloseRequestPay = () => {
  //   setShowRequestPay(false);
  // };
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
  const handlePay = (email, amount) => {
    setRecipient({
      recipientEmail: email,
      found: true,
      amount: amount,
    });
    setShowTransaction(true);
    navigate("/fund-transfer");
  };
  return (
    <div className="m-5">
      <div className="my-3 d-flex justify-content-between">
        <h3>Requests</h3>
        <div className="">
          <Button variant="dark" onClick={handleShowPaymentRequest}>
            Request Money
          </Button>
        </div>
        <PaymentRequestModal
          show={showPaymentRequest}
          onHide={handleClosePaymentRequest}
        ></PaymentRequestModal>

        {/* <RequestPayModal
          show={showRequestPay}
          onHide={handleCloseRequestPay}
        ></RequestPayModal> */}
      </div>
      <div className="container">
        {history ? (
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Date</th>
                <th scope="col">Sender</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((value) => (
                <tr key={value._id} className="text-center">
                  <td>{convertDate(value.createdDate)}</td>
                  <td>{value.sender.userName}</td>
                  <td>{value.amount}</td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() =>
                        handlePay(value.sender.email, value.amount)
                      }
                    >
                      Pay
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-5">No trasaction history found</p>
        )}
      </div>
    </div>
  );
};

export default PaymentRequest;
