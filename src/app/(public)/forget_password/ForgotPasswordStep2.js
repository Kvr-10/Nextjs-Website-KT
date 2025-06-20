'use client';

import React from 'react';
import Link from 'next/link';

// Styles
import '@/app/styles/Auth.css';

// Redux
import { useDispatch } from 'react-redux';
import { stepReducerActions } from '@/Redux/stepReducer';

const ForgotPasswordStep2 = () => {
  const dispatch = useDispatch();

  return (
    <div className="section">
      <h1>Password Reset</h1>
      <p className="form__top__text" style={{ marginBottom: '70px' }}>
        Check your mail, we sent you a reset password link.
      </p>
      <Link
        className="form__button"
        href="/sign-in"
        onClick={() => {
          dispatch(stepReducerActions.reset('forgotPasswordStep'));
        }}
      >
        Sign In
      </Link>
    </div>
  );
};

export default ForgotPasswordStep2;
