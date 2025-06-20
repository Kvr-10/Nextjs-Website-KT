'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import logo from '@/public/Image/kabadi__techno__logo.png';
import '@/app/styles/ForgetLinkStep1.css';
import { apiUrl } from '@/lib/Private';

const Verification = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const utype = params.utype;
  const token = searchParams.get('token');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !utype) return;

    axios
      .get(`${apiUrl}/v3/api/email-verify/${utype}/?token=${token}`)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, utype]);

  return (
    <div className="page_forget">
      <div className="back">
        <div className="form">
          <form className="sign_in_pswd">
            <h1 className="sign_in_pswd_h1">Email Verification Status</h1>
            <div className="sign_in_pswd_div">
              {success && <p className="sign_in_pswd_p">Your email has been verified. You may go ahead and sign in now.</p>}
              {!success && !loading && <p className="sign_in_pswd_p">Email activation link expired</p>}
              {loading && <p className="sign_in_pswd_p">Loading..</p>}
            </div>
            <Link href="/sign-in" className="sign_in_btn">Signin</Link>
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
};

export default Verification;
