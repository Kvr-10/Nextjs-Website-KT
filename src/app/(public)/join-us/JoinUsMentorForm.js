'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

// CSS
import '@/app/styles/JoinUsForm.css'; // ✅ Updated to alias import

// MUI Components
import { TextField, FormControl, Select } from '@mui/material';

// API
import { apiUrl } from '@/lib/Private'; // ✅ Updated path

const JoinUsMentorForm = () => {
  const [disabledStatus, setDisabledStatus] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    option: '',
    file: '',
  });

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const getFile = (e) => {
    setInputValue({ ...inputValue, file: e.target.files[0] });
  };

  const joinUs = async (e) => {
    e.preventDefault();
    setDisabledStatus(true);

    const { name, email, phone, linkedin, option, file } = inputValue;

    const isLinkedInValid = /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(linkedin);

    if (isNaN(phone) || phone.length !== 10) {
      Swal.fire({
        title: 'Enter valid 10 digit phone number',
        confirmButtonColor: '#56b124',
      });
    } else if (name && email && phone && linkedin && option && file) {
      if (file.type === 'application/pdf') {
        if (typeof name === 'string' && !isNaN(phone) && phone.length === 10 && isLinkedInValid) {
          try {
            const postUrl = `${apiUrl}/v3/WebsiteContent/mentor-form/`;

            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('phone', phone);
            data.append('linkedin_id', linkedin);
            data.append('domain', option);
            data.append('cv', file);

            await axios.post(postUrl, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            Swal.fire({
              title: 'We received your application.\nThank you!',
              confirmButtonColor: '#56b124',
            });

            setInputValue({
              name: '',
              email: '',
              phone: '',
              linkedin: '',
              option: '',
              file: '',
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
        setInputValue({ ...inputValue, file: '' });
        Swal.fire({
          title: 'Please upload a .pdf file',
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
      <div className="sub__section">
        <FormControl variant="outlined" className="input">
          <Select
            native
            required
            name="option"
            value={inputValue.option}
            onChange={getInputValue}
          >
            <option value="">Select field</option>
            <option value="financial management">Financial management</option>
            <option value="IT management">IT management</option>
            <option value="business development">Business development</option>
            <option value="marketing head">Marketing head</option>
            <option value="envirormental expert">Environmental expert</option>
            <option value="chemical r&d">Chemical R&D</option>
          </Select>
        </FormControl>

        <label
          htmlFor="file"
          style={{
            backgroundColor: inputValue.file === '' ? '#ff7373' : '#35ce72',
          }}
        >
          {inputValue.file === '' ? 'Upload Your CV (.pdf)' : 'CV Uploaded'}
        </label>
        <input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          style={{ display: 'none' }}
          onChange={getFile}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
      </div>
      <button type="submit" disabled={disabledStatus}>
        Join Us
      </button>
    </form>
  );
};

export default JoinUsMentorForm;
