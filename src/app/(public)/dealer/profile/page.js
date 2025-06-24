'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import { apiUrl1 } from '@/lib/Private';

import '@/app/styles/UserDealerProfile.css';

const DealerProfile = () => {
  const [dealerData, setDealerData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    axios
      .get(`${apiUrl1}/v3/api/dealer/profile${apiKey?.tokens?.refresh}`)
      .then((res) => setDealerData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      {dealerData && (
        <div className="user__dealer__profile">
          <div className="left__side">
            <Image
              src="/Image/customer__profile__img.PNG"
              alt="Profile"
              width={150}
              height={150}
            />
            <a className="user__dealer__profile__edit__link" href="/dealer/profile/profileedit">
              Edit
            </a>
          </div>
          <div className="right__side">
            <p>Email ID : <span>{dealerData.email}</span></p>
            <p>Mobile Number : <span>{dealerData.mobile_number}</span></p>
            <p>Account Type : <span>{dealerData.account_type}</span></p>
            <p>Address: <a className="view__address">View your address</a></p>

            <div className="document__qr">
              <a className="user__dealer__profile__document__qr__link" href="/dealer/settings/documentupload">
                Documents
              </a>
              <a className="user__dealer__profile__document__qr__link" href="/dealer/profile/qr">
                QR Code
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DealerProfile;
