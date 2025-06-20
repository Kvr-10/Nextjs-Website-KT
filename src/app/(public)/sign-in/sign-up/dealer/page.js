'use client';

import React, { useEffect } from 'react';

// Components
import Navbar from '@/components/Navbar';
import RightBanner from '@/components/AuthPageBanner/RightBanner';
import DealerSignUpStep1 from '@/app/(public)/sign-in/sign-up/dealer/DealerSignUpStep1';
import DealerSignUpStep2 from '@/app/(public)/sign-in/sign-up/dealer/DealerSignUpStep2';
import SignUpAddressInfoStep from '@/app/(public)/sign-in/sign-up/SignUpCommonStep/SignUpAddressInfoStep';
import TermFooter from '@/components/Footer/TermFooter';

// CSS
import '@/app/styles/Auth.css';

// Redux
import { useSelector } from 'react-redux';

const DealerSignUp = () => {
  const dealerSignUpStep = useSelector(
    (state) => state.stepReducer.dealerSignUpStep
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <div className="auth__section">
        {dealerSignUpStep === 1 && <DealerSignUpStep1 />}
        {dealerSignUpStep === 2 && <DealerSignUpStep2 />}
        {dealerSignUpStep === 3 && <SignUpAddressInfoStep />}
        <RightBanner />
      </div>

    </>
  );
};

export default DealerSignUp;
