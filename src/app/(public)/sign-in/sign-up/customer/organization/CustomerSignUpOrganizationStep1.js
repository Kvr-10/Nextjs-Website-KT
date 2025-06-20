'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

// MUI
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { stepReducerActions } from '@/Redux/stepReducer';

// Styles
import '@/app/styles/Auth.css';

// Constants
import { apiUrl1 } from '@/lib/Private';

const CustomerSignUpOrganizationStep1 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const nextStep = async (e) => {
    e.preventDefault();
    if (
      typeof inputValue.fullName === 'string' &&
      !isNaN(inputValue.mobileNumber) &&
      inputValue.mobileNumber.length === 10
    ) {
      if (
        inputValue.password.length >= 8 &&
        inputValue.password === inputValue.confirmPassword
      ) {
        const infos = JSON.parse(localStorage.getItem('KTMinfo') || '{}');
        localStorage.setItem('KTMinfo', JSON.stringify(infos));

        const data = new FormData();
        data.append('full_name', inputValue.fullName);
        data.append('email', inputValue.email);
        data.append('password', inputValue.password);
        data.append('password2', inputValue.confirmPassword);
        data.append('phone_number', inputValue.mobileNumber);
        data.append('account_role', infos['userType']);
        data.append('account_type', 'Customer');
        data.append(
          'profile_type',
          infos['isPersonalAccount'] ? 'Personal' : 'Organization'
        );

        try {
          const res = await axios.post(`${apiUrl1}/v3/api/register/`, data);

          if (res.status === 201) {
            localStorage.removeItem('KTMinfo');
            dispatch(stepReducerActions.reset('customerSignUpOrganizationStep'));

            Swal.fire({
              title: 'Verification email sent',
              confirmButtonColor: '#56b124',
            });

            setInputValue({
              fullName: '',
              email: '',
              mobileNumber: '',
              password: '',
              confirmPassword: '',
            });

            router.push('/sign-in');
          }
        } catch (err) {
          const errMsg = err?.response?.data?.error;
          if (
            errMsg ===
              'User already exists as Customer please login for the same account type' ||
            errMsg ===
              'User already exists as Dealer please login for the same account type'
          ) {
            Swal.fire({
              title: 'Verified account exist. You can signin with this account.',
              confirmButtonColor: '#56b124',
            });
            router.push('/sign-in');
          } else {
            console.error('Unexpected error:', err);
          }
        }
      } else {
        Swal.fire({
          title: 'Passwords must be same and more than 8 characters',
          confirmButtonColor: '#56b124',
        });
      }
    } else {
      Swal.fire({
        title: 'Enter 10-digit mobile number and valid username and email',
        confirmButtonColor: '#56b124',
      });
    }
  };

  return (
    <div className="section">
      <h1>Sign Up</h1>

      <form className="form" onSubmit={nextStep}>
        <TextField
          className="input"
          type="text"
          label="Your Organization Name"
          variant="outlined"
          name="fullName"
          value={inputValue.fullName}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="email"
          label="Your Organization Email"
          variant="outlined"
          name="email"
          value={inputValue.email}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your Mobile Number"
          variant="outlined"
          name="mobileNumber"
          value={inputValue.mobileNumber}
          onChange={getInputValue}
          required
        />
        <FormControl variant="outlined" className="form__control">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            required
            label="Password"
            className="input"
            type={showPassword.password1 ? 'text' : 'password'}
            value={inputValue.password}
            name="password"
            onChange={getInputValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password1: !prev.password1,
                    }))
                  }
                  edge="end"
                >
                  {/* Icon optional */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="outlined" className="form__control">
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            required
            label="Confirm Password"
            className="input"
            type={showPassword.password2 ? 'text' : 'password'}
            value={inputValue.confirmPassword}
            name="confirmPassword"
            onChange={getInputValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password2: !prev.password2,
                    }))
                  }
                  edge="end"
                >
                  {/* Icon optional */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <p className="signup__agreement">
          <input type="checkbox" required /> I have read and agree to the{' '}
          <a
            href="/privacypolicy"
            className="signup__agreement__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="/termsconditions"
            className="signup__agreement__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </a>
        </p>

        <button className="form__button" type="submit">
          Submit
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <a className="signin__link" href="/sign-in">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default CustomerSignUpOrganizationStep1;
