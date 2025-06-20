'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import Navbar from '@/components/Navbar';
import RightBanner from '@/components/AuthPageBanner/RightBanner';
import CustomerSignUpOrganizationStep1 from '@/app/(public)/sign-in/sign-up/customer/organization/CustomerSignUpOrganizationStep1';
import SignUpAddressInfoStep from '@/app/(public)/sign-in/sign-up/SignUpCommonStep/SignUpAddressInfoStep';
import TermFooter from '@/components/Footer/TermFooter';

// Styles
import '@/app/styles/Auth.css';

export default function CustomerSignUpOrganizationPage() {
  const customerSignUpOrganizationStep = useSelector(
    (state) => state.stepReducer.customerSignUpOrganizationStep
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <div className="auth__section">
        {customerSignUpOrganizationStep === 1 && <CustomerSignUpOrganizationStep1 />}
        {customerSignUpOrganizationStep === 2 && <SignUpAddressInfoStep />}
        <RightBanner />
      </div>
    </>
  );
}
