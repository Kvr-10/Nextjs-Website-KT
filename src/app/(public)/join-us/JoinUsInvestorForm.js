'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

// CSS
import '@/app/styles/JoinUsForm.css'; // ✅ Updated path

// MUI Components
import { TextField } from '@mui/material';

// API URL
import { apiUrl } from '@/lib/Private'; // ✅ Next.js alias import

const JoinUsInvestorForm = () => {
  const [disabledStatus, setDisabledStatus] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
  });

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const joinUs = async (e) => {
    e.preventDefault();
    setDisabledStatus(true);

    const { name, email, phone, linkedin } = inputValue;

    const isLinkedInValid = /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
      linkedin
    );

    if (isNaN(phone) || phone.length !== 10) {
      Swal.fire({
        title: 'Enter valid 10 digit phone number',
        confirmButtonColor: '#56b124',
      });
    } else if (name && email && phone && linkedin) {
      if (typeof name === 'string' && !isNaN(phone) && phone.length === 10 && isLinkedInValid) {
        try {
          const postUrl = `${apiUrl}/v3/WebsiteContent/investor-form/`;

          const data = new FormData();
          data.append('name', name);
          data.append('email', email);
          data.append('phone', phone);
          data.append('linkedin_id', linkedin);

          await axios.post(postUrl, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          Swal.fire({
            title: 'Thank You!',
            confirmButtonColor: '#56b124',
          });

          setInputValue({
            name: '',
            email: '',
            phone: '',
            linkedin: '',
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: 'Enter valid email ID',
            confirmButtonColor: '#56b124',
          });
        }
      } else {
        Swal.fire({
          title: 'Please Enter Valid Inputs',
          confirmButtonColor: '#56b124',
        });
      }
    } else {
      Swal.fire({
        title: 'Please fill all fields',
        confirmButtonColor: '#56b124',
      });
    }

    setDisabledStatus(false);
  };

  return (
    <form className="join__us__form" onSubmit={joinUs}>
      <div className="sub__section">
        <TextField
          className="input"
          type="text"
          label="Name"
          variant="outlined"
          name="name"
          required
          onChange={getInputValue}
          value={inputValue.name}
        />
        <TextField
          className="input"
          type="email"
          label="Email ID"
          variant="outlined"
          name="email"
          required
          onChange={getInputValue}
          value={inputValue.email}
        />
      </div>
      <div className="sub__section">
        <TextField
          className="input"
          type="tel"
          label="Phone Number"
          variant="outlined"
          name="phone"
          required
          onChange={getInputValue}
          value={inputValue.phone}
        />
        <TextField
          className="input"
          type="url"
          label="LinkedIn ID"
          variant="outlined"
          name="linkedin"
          required
          onChange={getInputValue}
          value={inputValue.linkedin}
        />
      </div>
      <button type="submit" disabled={disabledStatus}>
        Join Us
      </button>
    </form>
  );
};

export default JoinUsInvestorForm;
