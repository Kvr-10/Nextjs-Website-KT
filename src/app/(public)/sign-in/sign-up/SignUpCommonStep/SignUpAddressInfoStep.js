'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

// Material UI
import { TextField } from '@mui/material';

// CSS
import '@/app/styles/Auth.css';

// Redux
import { useDispatch } from 'react-redux';
import { stepReducerActions } from '@/Redux/stepReducer';

// API
import { apiUrl } from '@/lib/Private';

// import Image if needed
// import profilepic from '/Image/email-bg.png'

const SignUpAddressInfoStep = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    areaPincode: '',
    state: '',
    city: '',
    address: '',
  });

  const [active, setActive] = useState(true);
  const [userType, setUserType] = useState('customer');
  const [disabledStatus, setDisabledStatus] = useState(false);

  const infos = JSON.parse(localStorage.getItem('KTMinfo'));

  useEffect(() => {
    if (infos?.isDealer === true) {
      setUserType('dealer');
    }
  }, [infos]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const getPincodeDetail = async (e) => {
    if (inputValue.areaPincode !== '') {
      if (e.key === 'Tab') {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${inputValue.areaPincode}`
          );

          if (response.data[0].PostOffice !== null) {
            setInputValue({
              ...inputValue,
              state: response.data[0].PostOffice[0].State,
              city: response.data[0].PostOffice[0].District,
            });
          } else {
            Swal.fire({
              title: 'Please enter valid pincode',
              confirmButtonColor: '#56b124',
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const signUp = async (e) => {
    setDisabledStatus(true);
    e.preventDefault();

    try {
      const infos = JSON.parse(localStorage.getItem('KTMinfo'));
      const registrationUrl = `${apiUrl}/v3/api/registration/${userType}/`;

      try {
        await axios.get(
          `${apiUrl}/v3/api/database-checker/${userType}/${infos.email}/`
        );
      } catch (err) {
        console.log(err.message);
        if (
          err.message ===
          'Please firstly verify your email. Mail sent to your email!!'
        ) {
          setActive(false);
          Swal.fire({
            title: 'User Exists. Please verify your email and signin',
            confirmButtonColor: '#56b124',
          });
        }
      }

      if (active) {
        const data = new FormData();
        data.append('username', infos.name);
        data.append('email', infos.email);
        data.append('password', infos.password);
        data.append('mobile_number', infos.phone);

        if (userType === 'customer') {
          data.append('role', infos.userType);
          data.append('account_category', userType);
        }

        if (infos.isPersonalAccount === true) {
          data.append('account_type', 'Personal');
        } else if (infos.isOrganizationAccount === true) {
          data.append('account_type', 'Organization');
        }

        if (infos.userType === 'kabadiwala') {
          data.append('account_type', 'Kabadi');
        } else if (infos.userType === 'collector') {
          data.append('account_type', 'Collector');
        } else if (infos.userType === 'recycler') {
          data.append('account_type', 'Recycler');
        }

        data.append('ProfilePic', '');

        const response = await fetch(registrationUrl, {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          setInputValue({
            areaPincode: '',
            state: '',
            city: '',
            address: '',
          });

          localStorage.removeItem('KTMinfo');

          dispatch(stepReducerActions.reset('customerSignUpPersonalStep'));
          dispatch(stepReducerActions.reset('customerSignUpOrganizationStep'));
          dispatch(stepReducerActions.reset('dealerSignUpStep'));

          Swal.fire({
            title: 'Verification email sent',
            confirmButtonColor: '#56b124',
          });

          router.push('/sign-in');
        } else {
          const jsonResponse = await response.json();

          let error = '';
          for (let item in jsonResponse) {
            error += `${jsonResponse[item][0]}\n`;
          }

          setInputValue({
            areaPincode: '',
            state: '',
            city: '',
            address: '',
          });

          dispatch(stepReducerActions.reset('customerSignUpPersonalStep'));
          dispatch(stepReducerActions.reset('customerSignUpOrganizationStep'));
          dispatch(stepReducerActions.reset('dealerSignUpStep'));

          Swal.fire({
            title: error,
            confirmButtonColor: '#56b124',
          });
        }
      }
    } catch (err) {
      console.log(err);
    }

    setDisabledStatus(false);
  };

  const handleBack = () => {
    switch (pathname) {
      case '/sign-in/sign-up/customer/CustomerSignUpPersonal':
        dispatch(stepReducerActions.backward('customerSignUpPersonalStep'));
        break;
      case '/sign-in/sign-up/customer/CustomerSignUpOrganization':
        dispatch(
          stepReducerActions.backward('customerSignUpOrganizationStep')
        );
        break;
      case '/sign-in/sign-up/dealer':
        dispatch(stepReducerActions.backward('dealerSignUpStep'));
        break;
      default:
        break;
    }
  };

  return (
    <div className="section">
      <h1>Sign Up</h1>
      <p style={{ marginTop: '0', fontSize: '1rem' }} className="section__tab">
        (Add pincode & press TAB key to autocomplete other fields)
      </p>

      <form className="form" onSubmit={signUp}>
        <TextField
          className="input"
          type="text"
          label="Your Area Pin Code"
          variant="outlined"
          name="areaPincode"
          value={inputValue.areaPincode}
          onChange={getInputValue}
          onKeyDown={getPincodeDetail}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your State"
          variant="outlined"
          name="state"
          value={inputValue.state}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your City"
          variant="outlined"
          name="city"
          value={inputValue.city}
          onChange={getInputValue}
          required
        />
        <TextField
          className="input"
          type="text"
          label="Your Address"
          variant="outlined"
          name="address"
          value={inputValue.address}
          onChange={getInputValue}
          required
        />

        <div>
          <button className="form__button" type="button" onClick={handleBack}>
            Back
          </button>
          <button
            className="form__button"
            type="submit"
            disabled={disabledStatus}
          >
            Sign Up
          </button>
        </div>
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

export default SignUpAddressInfoStep;
