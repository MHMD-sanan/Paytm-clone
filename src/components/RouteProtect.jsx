import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const RouteProtect = (props) => {
  const { isLogin } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, []);
  return <div>{props.children}</div>;
};

export default RouteProtect;
