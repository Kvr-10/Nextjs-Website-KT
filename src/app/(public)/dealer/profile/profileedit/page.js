// DealerProfileEdit.js (Next.js version)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';

import { apiUrl, apiUrl1 } from '@/lib/Private';

import '@/app/styles/UserDealerProfileEdit.css';
import '@/app/styles/App.css';

const DealerProfileEdit = () => {
  const [dealerData, setDealerData] = useState();
  const [uploadedImage, setUploadedImage] = useState({ photo: '/Image/customer__profile__img.PNG' });
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    axios
      .get(`${apiUrl1}/v3/api/view-profile/dealer/${apiKey?.tokens?.refresh}`)
      .then((res) => setDealerData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getInputValue = (e) => {
    setDealerData({ ...dealerData, [e.target.name]: e.target.value });
  };

  const updateDealerProfile = async (e) => {
    e.preventDefault();
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    try {
      const data = new FormData();
      data.append('Did', apiKey.id);
      data.append('mobile_number', dealerData.mobile_number);
      data.append('account_type', apiKey.account_type);

      await fetch(`${apiUrl1}/v3/api/update-attrs/dealer/`, {
        method: 'POST',
        body: data,
      });

      Swal.fire({ title: 'Profile Updated', confirmButtonColor: '#56b124' });
      router.push('/dealer/profile');
    } catch (err) {
      console.log(err);
      Swal.fire({ title: 'Profile not updated', confirmButtonColor: '#56b124' });
    }
  };

  const updatePhoto = (e) => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadedImage({ ...uploadedImage, [e.target.name]: reader.result });
      }
    };

    const data = new FormData();
    data.append('ProfilePic', e.target.files[0]);

    fetch(`${apiUrl1}/v3/api/update-profilepic/dealer/${apiKey.id}/`, {
      method: 'POST',
      body: data,
    });

    Swal.fire({ title: 'Profile Pic changed successfully', confirmButtonColor: '#56b124' });
  };

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      {dealerData && (
        <div className="user__dealer__profile__edit similar__section">
          <h1 className="similar__section__heading">Edit your profile</h1>

          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="photo"
            name="photo"
            onChange={updatePhoto}
            onClick={(e) => (e.target.value = null)}
          />

          <label htmlFor="photo" className="change__pic__label">Select Profile Pic</label>

          <form onSubmit={updateDealerProfile}>
            <input type="text" placeholder="Name" value={dealerData.name || ''} name="name" onChange={getInputValue} />
            <input type="email" placeholder="Email ID" value={dealerData.email} disabled />
            <input type="tel" placeholder="Mobile Number" value={dealerData.mobile} name="mobile" onChange={getInputValue} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

    </>
  );
};

export default DealerProfileEdit;
