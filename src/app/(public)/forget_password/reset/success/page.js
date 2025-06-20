'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Assets and styles
import logo from '@/public/Image/kabadi__techno__logo.png';
import '@/app/styles/ForgetLinkStep2.css'; // Assuming you're using the global CSS here

export default function ForgetLinkStep2() {
  return (
    <div className="page_forget">
      <div className="back">
        <div className="form">
          <form className="sign_in_pswd">
            <h1 className="sign_in_pswd_h1">Password Changed</h1>
            <div className="sign_in_pswd_div">
              <p className="sign_in_pswd_p">
                Your password has been reset. You may go ahead and sign in now.
              </p>
            </div>
            <Link href="/sign-in" className="sign_in_btn">Sign In</Link>
          </form>
        </div>
        <div className="content">
          <center>
            <Image src={logo} alt="logo" height={130} />
            <h2>KABADI TECHNO</h2>
            <p>"Don't waste your waste."</p>
          </center>
        </div>
      </div>
    </div>
  );
}
