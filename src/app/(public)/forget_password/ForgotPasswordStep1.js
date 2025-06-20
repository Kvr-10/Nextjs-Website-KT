'use client';

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Material UI
import { TextField } from "@mui/material";

// CSS
import '@/app/styles/Auth.css';

// Redux
import { useDispatch } from "react-redux";
import { stepReducerActions } from "@/Redux/stepReducer";

// API URL
import { apiUrl } from "@/lib/Private";

const ForgotPasswordStep1 = () => {
  const dispatch = useDispatch();
  const [tabBtn, setTabBtn] = useState('customer');
  const [inputValue, setInputValue] = useState({ email: "" });

  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const nextForgot = async (e) => {
    e.preventDefault();

    if (inputValue.email !== "") {
      const dbcheckUrl = `${apiUrl}/v3/api/database-checker/${tabBtn}/${inputValue.email}/`;
      const data = new FormData();
      data.append("email", inputValue.email);

      try {
        await axios.get(dbcheckUrl, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } catch (err) {
        if (err.response.status === 302) {
          const forgotUrl = `${apiUrl}/v3/api/request-password-reset-email/${tabBtn}/`;
          await axios.post(forgotUrl, data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          setInputValue({ email: "" });
          dispatch(stepReducerActions.forward("forgotPasswordStep"));
        } else if (
          err.response.data.message ===
          "Please firstly verify your email. Mail sent to your email!!"
        ) {
          const activate = new FormData();
          activate.append("email", inputValue.email);
          try {
            await axios.post(
              `${apiUrl}/v3/api/regenerate-verification-email/${tabBtn}`,
              activate,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
          } catch (err) {
            Swal.fire({
              title: "Error in sending regeneration link",
              confirmButtonColor: "#56b124",
            });
          }
          Swal.fire({
            title:
              "Account with this email Exists. Activation Link sent!! Please Verify your email and then request for password change",
            confirmButtonColor: "#56b124",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Email id not registered",
            confirmButtonColor: "#56b124",
          });
        }
      }
    }
  };

  return (
    <div className="section">
      <h1>Password Reset</h1>

      <form className="form" onSubmit={nextForgot}>
        <p className="form__top__text">
          Type your email address below and we will send you an OTP on your email with
          instruction on how to reset your password.
        </p>

        <div className="forget__type__btns">
          <button
            className={`forget__type ${tabBtn === 'customer' ? 'active' : ''}`}
            type="button"
            onClick={() => setTabBtn('customer')}
          >
            Customer
          </button>
          <button
            className={`forget__type ${tabBtn === 'dealer' ? 'active' : ''}`}
            type="button"
            onClick={() => setTabBtn('dealer')}
          >
            Dealer
          </button>
        </div>

        <TextField
          className="input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          required
          onChange={getInputValue}
          value={inputValue.email}
        />

        <button className="form__button" type="submit">
          Send email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep1;
