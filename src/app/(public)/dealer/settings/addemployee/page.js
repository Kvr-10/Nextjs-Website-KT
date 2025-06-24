'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';


import '@/app/styles/DealerAddEmployee.css';
import { apiUrl } from '@/utils/constants';

const DealerAddEmployee = () => {
  const [inputValue, setInputValue] = useState({
    dealer_email: '',
    employee_email: '',
    username: '',
    password: '',
    profilePic: '',
    mobile_number: '',
    aadhar_card: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('KTMauth');
      if (stored) {
        const apiKey = JSON.parse(stored);
        setInputValue(prev => ({ ...prev, dealer_email: apiKey.email }));
      }
    }
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();
    const {
      dealer_email,
      employee_email,
      username,
      password,
      profilePic,
      mobile_number,
      aadhar_card,
    } = inputValue;

    if (isNaN(mobile_number) || mobile_number.length !== 10) {
      return Swal.fire({ title: 'Enter valid 10-digit mobile number', confirmButtonColor: '#56b124' });
    }
    if (password.length < 6) {
      return Swal.fire({ title: 'Password should be minimum 6-digit', confirmButtonColor: '#56b124' });
    }

    const formData = new FormData();
    formData.append('dealer_email', dealer_email);
    formData.append('email', employee_email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('ProfilePic', profilePic);
    formData.append('mobile_number', mobile_number);
    formData.append('aadhar_card', aadhar_card);

    try {
      await axios.post(`${apiUrl}/v3/api/registration/employee/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire({ title: 'Employee added successfully', confirmButtonColor: '#56b124' });
    } catch (error) {
      console.error(error);
      Swal.fire({ title: 'Something went wrong', confirmButtonColor: '#56b124' });
    }
  };

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const getFile = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <form className="add__employee__form" onSubmit={addEmployee}>
        <div className="input">
          <div>
            <label>Employee Email*</label>
            <input
              type="text"
              name="employee_email"
              value={inputValue.employee_email}
              onChange={getInputValue}
              required
            />
          </div>
          <div>
            <label>Mobile Number*</label>
            <input
              type="text"
              name="mobile_number"
              value={inputValue.mobile_number}
              onChange={getInputValue}
              required
            />
          </div>
        </div>

        <div className="input">
          <div>
            <label>Username*</label>
            <input
              type="text"
              name="username"
              value={inputValue.username}
              onChange={getInputValue}
              required
            />
          </div>
          <div>
            <label>Password*</label>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              onChange={getInputValue}
              required
            />
          </div>
        </div>

        <div className="input add__employee__files">
          <input
            type="file"
            accept="image/*"
            name="profilePic"
            id="profilePic"
            style={{ display: 'none' }}
            onChange={getFile}
          />
          <label htmlFor="profilePic">Select Profile Pic</label>

          <input
            type="file"
            accept=".pdf"
            name="aadhar_card"
            id="aadhar_card"
            style={{ display: 'none' }}
            onChange={getFile}
          />
          <label htmlFor="aadhar_card">Select Aadhaar Card</label>
        </div>

        <div className="input">
          <button type="submit" className="add__employee__btn">Submit</button>
        </div>
      </form>

    </>
  );
};

export default DealerAddEmployee;
