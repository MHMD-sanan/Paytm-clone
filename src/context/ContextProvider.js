import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  //modals
  const [showLogin, setShowLogin] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [showRequestPay, setShowRequestPay] = useState(false);

  const [showToast, setShowToast] = useState({
    status: false,
    type: "",
    message: "",
    otp: "",
    paymentRequestId:""
  });

  const [recipient, setRecipient] = useState({
    recipientEmail: "",
    found: false,
    amount: "",
  });
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        showLogin,
        setShowLogin,
        loggedUser,
        setLoggedUser,
        showTransaction,
        setShowTransaction,
        showToast,
        setShowToast,
        showPaymentRequest,
        setShowPaymentRequest,
        recipient,
        setRecipient,
        showRequestPay,
        setShowRequestPay,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
