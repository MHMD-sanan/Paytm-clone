import React, { useState } from "react";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/user";
import { useStateContext } from "../context/ContextProvider";

const Entry = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { setIsLogin, setShowLogin, setLoggedUser, setShowToast } =
    useStateContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    userName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const clearForm = () => {
    setData({
      userName: "",
      mobileNumber: "",
      email: "",
      password: "",
    });
  };
  const handleToggleForm = () => {
    setError("");
    clearForm();
    setIsRegistering(!isRegistering);
  };

  const handleCloseButton = () => {
    setShowLogin(false);
    clearForm();
  };

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isRegistering) {
        res = await signupUser(data);
      } else {
        res = await loginUser(data);
      }

      if (res.success) {
        clearForm();
        setError("");
        localStorage.setItem("jwt", res.token);
        setIsLogin(true);
        setLoggedUser(res.user);
        setShowLogin(false);
        navigate("/");
        setShowToast({
          status: true,
          type: "success",
          message: "Entry successful",
        });
      }
    } catch (error) {
      clearForm();
      setError(error.error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="">
        <Modal.Title id="contained-modal-title-vcenter">
          {isRegistering
            ? "Paytm Wallet - Create account"
            : "Paytm Wallet - Login"}
        </Modal.Title>
        <CloseButton onClick={handleCloseButton} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAction}>
          {isRegistering && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={data?.userName}
                  onChange={(e) =>
                    setData({ ...data, userName: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="mobile" className="mb-3">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter mobile number"
                  value={data?.mobileNumber}
                  required
                  onChange={(e) =>
                    setData({ ...data, mobileNumber: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={data?.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button
            variant="dark"
            type="submit"
            // onClick={handleAction}
          >
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p>{isRegistering ? "Already have an account?" : "New to Paytm?"}</p>
        <Button variant="dark" size="sm" onClick={handleToggleForm}>
          {isRegistering ? "Sign in" : "Sign up"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Entry;
