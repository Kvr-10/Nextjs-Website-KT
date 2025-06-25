'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// CSS
import '@/app/styles/ProfileNavbar.css';

// MUI Icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CropFreeIcon from '@mui/icons-material/CropFree';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Redux actions
import { cartReducerActions } from '@/Redux/cartReducer';
import { stepReducerActions } from '@/Redux/stepReducer';
import { apiUrl } from '@/lib/Private';

const UserProfileNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logOut = async () => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));

    try {
      await axios.post(`${apiUrl}/v3/api/logout/customer/${apiKey?.tokens?.refresh}`, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${apiKey?.tokens?.refresh}`,
        },
      });

      dispatch(cartReducerActions.reset());
      dispatch(stepReducerActions.reset('cartStep'));

      localStorage.removeItem('KTMauth');
      localStorage.removeItem('KTMpincode');
      localStorage.removeItem('KTMsellItemName');

      router.push('/signin');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        dispatch(cartReducerActions.reset());
        dispatch(stepReducerActions.reset('cartStep'));
        localStorage.removeItem('KTMauth');
        localStorage.removeItem('KTMpincode');
        localStorage.removeItem('KTMsellItemName');
        router.push('/signin');
      }
    }
  };

  return (
    <>
      <div className="menubar" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <ul className={isOpen ? 'profile__navbar profile__navbar__active' : 'profile__navbar'}>
        <li>
          <Link href="/sell/user/profile" className="profile__link" onClick={() => setIsOpen(false)}>
            <AccountCircleIcon /> Profile
          </Link>
        </li>
        <li>
          <Link href="/sell/user/pickup" className="profile__link" onClick={() => setIsOpen(false)}>
            <TransferWithinAStationIcon /> Pickup
          </Link>
        </li>
        <li>
          <Link href="/sell/user/wallet" className="profile__link" onClick={() => setIsOpen(false)}>
            <AccountBalanceWalletIcon /> Wallet
          </Link>
        </li>
        <li>
          <Link href="/sell/user/qr" className="profile__link" onClick={() => setIsOpen(false)}>
            <CropFreeIcon /> QR Code
          </Link>
        </li>
        <li>
          <Link href="/sell/user/autoscrap" className="profile__link" onClick={() => setIsOpen(false)}>
            <AutorenewIcon /> Auto Scrap
          </Link>
        </li>
        <li>
          <button className="profile__link" onClick={logOut}>
            <ExitToAppIcon /> Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default UserProfileNavbar;
