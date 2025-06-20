'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import Navbar from '@/components/Navbar';
import RightBanner from '@/components/AuthPageBanner/RightBanner';
import TermFooter from '@/components/Footer/TermFooter';

// Styles
import '@/app/styles/Auth.css';

export default function SignUp() {
  const router = useRouter();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize signup info in localStorage
  useEffect(() => {
    localStorage.setItem(
      'KTMinfo',
      JSON.stringify({
        isCustomer: false,
        isDealer: false,
        isPersonalAccount: false,
        isOrganizationAccount: false,
        userType: '',
        name: '',
        email: '',
        phone: '',
        password1: '',
        password2: '',
      })
    );
  }, []);

  const nextStep = (type, destination) => {
    const infos = JSON.parse(localStorage.getItem('KTMinfo'));

    if (type === 'customer') {
      infos.isCustomer = true;
      infos.isDealer = false;
    } else {
      infos.isDealer = true;
      infos.isCustomer = false;
    }

    localStorage.setItem('KTMinfo', JSON.stringify(infos));
    router.push(destination);
  };

  return (
    <>

      <div className="auth__section">
        <div className="section">
          <h1>Sign Up</h1>

          <div className="person__type">
            <h1>Who am I ?</h1>

            <div>
              <h1>I want to sell my scrap</h1>
              <button
                className="person__type__button"
                onClick={() => nextStep('customer', '/sign-in/sign-up/customer')}
              >
                I am customer
              </button>
            </div>

            <div>
              <h1>I want to purchase the scrap</h1>
              <button
                className="person__type__button"
                onClick={() => nextStep('dealer', '/sign-in/sign-up/dealer')}
              >
                I am dealer
              </button>
            </div>
          </div>

          <p>
            Already have an account?{' '}
            <Link href="/sign-in" className="signin__link">
              Sign In
            </Link>
          </p>
        </div>

        <RightBanner />
      </div>
    </>
  );
}
