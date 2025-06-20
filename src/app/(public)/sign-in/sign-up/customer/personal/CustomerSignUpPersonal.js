'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import Navbar from '@/components/Navbar';
import RightBanner from '@/components/AuthPageBanner/RightBanner';
import TermFooter from '@/components/Footer/TermFooter';
import CustomerSignUpPersonalStep1 from '@/app/(public)/sign-in/sign-up/customer/personal/CustomerSignUpPersonalStep1';
import SignUpAddressInfoStep from '@/app/(public)/sign-in/sign-up/SignUpCommonStep/SignUpAddressInfoStep';

// Styles
import '@/app/styles/Auth.css';

const CustomerSignUpPersonal = () => {
  const customerSignUpPersonalStep = useSelector(
    (state) => state.stepReducer.customerSignUpPersonalStep
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <div className="auth__section">
        {customerSignUpPersonalStep === 1 && <CustomerSignUpPersonalStep1 />}
        {customerSignUpPersonalStep === 2 && <SignUpAddressInfoStep />}

        <RightBanner />
      </div>

    </>
  );
};

export default CustomerSignUpPersonal;
