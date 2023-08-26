import { Button, Table } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import TransactionModal from "../components/TransactionModal";
import { getHistory } from "../api/user";
import { useEffect, useState } from "react";

const Transaction = () => {
  // Get state variables from context
  const { showTransaction, setShowTransaction, loggedUser } = useStateContext();

  // State to store transaction history
  const [history, setHistory] = useState([]);

  // Fetch transaction history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        console.log(res);
        if (res.transactions.length === 0) {
          setHistory([]);
        } else {
          setHistory(res.transactions);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };
    fetchHistory();
  }, []);

  // Show and hide TransactionModal
  const handleShowTransaction = () => {
    setShowTransaction(true);
  };
  const handleCloseTransaction = () => {
    setShowTransaction(false);
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

  return (
    <div className="m-5">
      <div className="my-3 d-flex justify-content-between align-items-center">
        <h3>TRANSACTIONS</h3>
        <Button variant="dark" onClick={handleShowTransaction}>
          Send Money
        </Button>
      </div>
      <TransactionModal
        show={showTransaction}
        onHide={handleCloseTransaction}
      />
      {history.length > 0 ? (
        <Table striped bordered responsive>
          <thead>
            <tr className="text-center">
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Reference Account</th>
            </tr>
          </thead>
          <tbody>
            {history.map((value) => (
              <tr key={value._id} className="text-center">
                <td>{convertDate(value.date)}</td>
                <td>{value._id}</td>
                <td>$ {value.amount}</td>
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
        </Table>
      ) : (
        <p className="text-center mt-5">No transaction history found</p>
      )}
    </div>
  );
};

export default Transaction;
