import React from "react";
const Otp = () => {
  return (
    <div ClassName="container height-100 d-flex justify-content-center align-items-center">
      {" "}
      <div ClassName="position-relative">
        {" "}
        <div ClassName="card p-2 text-center">
          {" "}
          <h6>
            Please enter the one time password <br /> to verify this transaction
          </h6>{" "}
          <div>OTP - Verification
            {" "}
            <span>A code has been sent to your mail</span>
          </div>{" "}
          <div
            id="otp"
            ClassName="inputs d-flex flex-row justify-content-center mt-2"
          >
            {" "}
            <input
              ClassName="m-2 text-center form-control rounded"
              type="text"
              id="first"
              maxlength="1"
            />{" "}
            <input
              ClassName="m-2 text-center form-control rounded"
              type="text"
              id="second"
              maxlength="1"
            />{" "}
            <input
              ClassName="m-2 text-center form-control rounded"
              type="text"
              id="third"
              maxlength="1"
            />{" "}
            <input
              ClassName="m-2 text-center form-control rounded"
              type="text"
              id="fourth"
              maxlength="1"
            />{" "}
            h="1"
          </div>{" "}
          <div ClassName="mt-4">
            {" "}
            <button ClassName="btn btn-danger px-4 validate">
              Validate
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div ClassName="card-2">
          {" "}
          <div ClassName="content d-flex justify-content-center align-items-center">
            {" "}
            <span>Didn't get the code</span>{" "}
            <a href="#" ClassName="text-decoration-none ms-3">
              Resend(1/3)
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Otp;
