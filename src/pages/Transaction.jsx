import { Button } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import TransactionModal from "../components/TransactionModal";
import { getHistory } from "../api/user";
import { useEffect, useState } from "react";

const Transaction = () => {
  const { showTransaction, setShowTransaction, loggedUser } = useStateContext();
  const [history, setHistory] = useState();
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory();
      if (res.transactions.length === 0) {
        setHistory("");
      } else {
        setHistory(res.transactions);
      }
    };
    fetchHistory();
  }, []);

  const handleShowTransaction = () => {
    setShowTransaction(true);
  };
  const handleCloseTransaction = () => {
    setShowTransaction(false);
  };

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

  return (
    <div className="m-5">
      <div className="my-3 d-flex justify-content-between">
        <h3>TRASACTIONS</h3>
        <div className="">
          <Button variant="dark" onClick={handleShowTransaction}>
            Send Money
          </Button>
        </div>
        <TransactionModal
          show={showTransaction}
          onHide={handleCloseTransaction}
        ></TransactionModal>
      </div>
      <div className="">
        {history ? (
          <table className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">Date</th>
                <th scope="col">Transation ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Reference Account</th>
              </tr>
            </thead>
            <tbody>
              {history.map((value) => (
                <tr key={value._id} className="text-center">
                  <td>{convertDate(value.date)}</td>
                  <td>{value._id}</td>
                  <td>{value.amount}</td>
                  <td>
                    {value.sender._id === loggedUser._id ? "Debit" : "Credit"}
                  </td>
                  <td>
                    {value.sender._id === loggedUser._id
                      ? value.recipient.userName
                      : value.sender.userName}
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

export default Transaction;
