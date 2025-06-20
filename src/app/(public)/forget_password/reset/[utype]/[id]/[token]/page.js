'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import logo from '@/../public/Image/logo.png';

import { apiUrl } from '@/lib/Private';
import '@/app/styles/ForgetLinkStep1.css';

export default function ForgetLinkStep1({ params }) {
  const router = useRouter();
  const { utype, id, token } = params;

  const [showPswd, setShowPswd] = useState(false);
  const [showNewPswd, setShowNewPswd] = useState(false);
  const [inputValue, setInputValue] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const changePswdState = () => setShowPswd(!showPswd);
  const changeNewPswdState = () => setShowNewPswd(!showNewPswd);

  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const confirmationstep = async (e) => {
    e.preventDefault();

    try {
      const url = `${apiUrl}/v3/api/password-reset-completion/${utype}/`;
      const data = new FormData();

      data.append('token', token);
      data.append('user_id', id);

      if (
        inputValue.newPassword === inputValue.confirmNewPassword &&
        inputValue.newPassword.length >= 8
      ) {
        data.append('password', inputValue.newPassword);
        await axios.patch(url, data);
        router.push('/forget-password/password_change_success');
      } else {
        Swal.fire({
          title: 'Password should be at least 8 characters and match',
          confirmButtonColor: '#56b124',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Reset Link is invalid',
        confirmButtonColor: '#56b124',
      });
    }
  };

  return (
    <div className="page_forget">
      <div className="back">
        <div className="form">
          <form className="sign_in_pswd" onSubmit={confirmationstep}>
            <h1 className="sign_in_pswd_h1">Change Password</h1>
            <div className="sign_in_pswd_div">
              <p className="sign_in_pswd_p">Enter the changed password.</p>

              {/* New Password */}
              <div className="form_div">
                <input
                  required
                  type={showPswd ? 'text' : 'password'}
                  className="design_input"
                  placeholder="New Password"
                  name="newPassword"
                  onChange={getInputValue}
                  value={inputValue.newPassword}
                />
                <label className="input_text"></label>
                <div className="form_eye_button" onClick={changePswdState}>
                  <span className="label_eye_button">
                    {showPswd ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form_div">
                <input
                  required
                  type={showNewPswd ? 'text' : 'password'}
                  className="design_input"
                  placeholder="Confirm Password"
                  name="confirmNewPassword"
                  onChange={getInputValue}
                  value={inputValue.confirmNewPassword}
                />
                <label className="input_text"></label>
                <div className="form_eye_button" onClick={changeNewPswdState}>
                  <span className="label_eye_button">
                    {showNewPswd ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>
            </div>
            <button className="sign_in_btn">Submit</button>
          </form>
        </div>

        <div className="content">
          <center>
            <Image src={logo} alt="logo" height={130} />
            <h2>KABADI TECHNO</h2>
            <p>"Don't waste your waste."</p>
          </center>
        </div>
      </div>
    </div>
  );
}

// This component should be placed in:
// src/app/(public)/forget-password/reset/[utype]/[id]/[token]/page.jsx
