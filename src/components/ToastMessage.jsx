import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
const ToastMessage = ({ message, type }) => {
  const { showToast, setShowToast } = useStateContext();

  useEffect(() => {
    setTimeout(() => setShowToast({}), 4000);
  }, [setShowToast]);

  return (
    <>
      {/* <Button onClick={handleShowSuccessToast}>Show Success Toast</Button> */}
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 1 }}
      >
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
