'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// MUI components
import { Select, FormControl, MenuItem } from '@mui/material';

// Components
import Navbar from '@/components/Navbar';
import RightBanner from '@/components/AuthPageBanner/RightBanner';
import TermFooter from '@/components/Footer/TermFooter';

// CSS
import '@/app/styles/Auth.css';

export default function CustomerSignUp() {
  const [optionValue, setOptionValue] = useState('');
  const router = useRouter();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle dropdown value
  const optionChange = (e) => {
    setOptionValue(e.target.value);
  };

  // Proceed to next step
  const nextStep = (type, destination) => {
    const infos = JSON.parse(localStorage.getItem('KTMinfo') || '{}');

    if (optionValue !== '') {
      if (type === 'personal') {
        infos.isPersonalAccount = true;
        infos.isOrganizationAccount = false;
      } else {
        infos.isOrganizationAccount = true;
        infos.isPersonalAccount = false;
      }

      infos.userType = optionValue;
      localStorage.setItem('KTMinfo', JSON.stringify(infos));
      setOptionValue('');
      router.push(destination);
    }
  };

  return (
    <>

      <div className="auth__section">
        <div className="section">
          <h1>Sign Up</h1>

          <div className="person__type">
            <h1>What type of customer am I?</h1>

            {/* Personal Account */}
            <div>
              <h1>
                People selling from house, shop, restaurants, offices, marriage
                halls, etc. (Who produce less scrap)
              </h1>

              <FormControl variant="outlined" className="person__type__select">
                <Select
                  value={optionValue}
                  onChange={optionChange}
                  displayEmpty
                >
                  <MenuItem value="">Select type</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Shop">Shop</MenuItem>
                  <MenuItem value="Restaurant">Restaurant</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Marriage Hall">Marriage Hall</MenuItem>
                </Select>
              </FormControl>

              <button
                className="person__type__button"
                onClick={() =>
                  nextStep('personal', '/sign-in/sign-up/customer/personal')
                }
              >
                Personal Account
              </button>
            </div>

            {/* Organization Account */}
            <div>
              <h1>
                People selling from colleges, hospitals, schools, malls,
                universities, factories, etc. (Who produce more scrap)
              </h1>

              <FormControl variant="outlined" className="person__type__select">
                <Select
                  value={optionValue}
                  onChange={optionChange}
                  displayEmpty
                >
                  <MenuItem value="">Select type</MenuItem>
                  <MenuItem value="College">College</MenuItem>
                  <MenuItem value="Hospital">Hospital</MenuItem>
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Mall">Mall</MenuItem>
                  <MenuItem value="University">University</MenuItem>
                  <MenuItem value="Factory">Factory</MenuItem>
                  <MenuItem value="Hotel">Hotel</MenuItem>
                </Select>
              </FormControl>

              <button
                className="person__type__button"
                onClick={() =>
                  nextStep('organization', '/sign-in/sign-up/customer/organization')
                }
              >
                Organization Account
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

        <RightBanner />
      </div>
    </>
  );
}
