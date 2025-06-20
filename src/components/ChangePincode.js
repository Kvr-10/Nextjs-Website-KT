'use client';

import React from 'react';

// CSS (adjusted path for Next.js)
import '@/app/styles/ChangePincode.css';

const ChangePincode = ({ openModal, pincode }) => {
  return (
    <p className="change__pincode">
      Change your pincode <span onClick={openModal}>{pincode}</span>
    </p>
  );
};

export default ChangePincode;
