'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// CSS
import '@/app/styles/Auth.css';

// Redux
import { useDispatch } from 'react-redux';
import { stepReducerActions } from '@/Redux/stepReducer';

const DealerSignUpStep1 = () => {
  const dispatch = useDispatch();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle step forward
  const nextStep = (type) => {
    const infos = JSON.parse(localStorage.getItem('KTMinfo')) || {};
    infos.userType = type;
    localStorage.setItem('KTMinfo', JSON.stringify(infos));
    dispatch(stepReducerActions.forward('dealerSignUpStep'));
  };

  return (
    <div className="section">
      <h1>Sign Up</h1>

      <div className="person__type">
        <h1>What type of dealer am I ?</h1>

        <div>
          <h1>
            We purchase scrap from house, shops, restaurant, office,
            marriage hall, etc.
          </h1>
          <button
            className="person__type__button"
            onClick={() => nextStep('kabadiwala')}
          >
            Kabadiwala
          </button>
        </div>

        <div>
          <h1>
            We purchase from college, hospital, school, malls, university,
            factory, etc.
          </h1>
          <button
            className="person__type__button"
            onClick={() => nextStep('collector')}
          >
            Collector
          </button>
        </div>

        <div>
          <h1>We purchase scrap from kabadiwala and collector</h1>
          <button
            className="person__type__button"
            onClick={() => nextStep('recycler')}
          >
            Recycler
          </button>
        </div>
      </div>

      <p>
        Already have an account?{' '}
        <Link className="signin__link" href="/sign-in">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default DealerSignUpStep1;
