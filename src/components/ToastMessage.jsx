import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";

const ToastMessage = ({ message, type }) => {
  // Get the showToast and setShowToast functions from context
  const { showToast, setShowToast } = useStateContext();

  // Automatically close the toast after 4 seconds
  useEffect(() => {
    setTimeout(() => setShowToast({}), 4000);
  }, [setShowToast]);

  return (
    <>
      {/* ToastContainer to show toast messages */}
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 1 }}
      >
        {/* Show the toast based on showToast status */}
        <Toast show={showToast.status}>
          <Toast.Body
            className={
              showToast.type === "success" ? "text-success" : "text-danger"
            }
          >
            {showToast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ToastMessage;
