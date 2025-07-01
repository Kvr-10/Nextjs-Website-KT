'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { cartReducerActions } from '@/Redux/cartReducer';
import { stepReducerActions } from '@/Redux/stepReducer';
import { apiUrl } from '@/lib/Private';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';

import '@/app/styles/ProfileNavbar.css';

const DealerProfileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('KTMauth');
    if (auth) {
      const parsed = JSON.parse(auth);
      setRefreshToken(parsed?.tokens?.refresh);
    }
  }, []);

  const logOut = () => {
    if (!refreshToken) return;

    axios
      .post(`${apiUrl}/v3/api/logout/dealer/${refreshToken}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': refreshToken,
        },
      })
      .then(() => {
        dispatch(cartReducerActions.reset());
        dispatch(stepReducerActions.reset('cartStep'));
        localStorage.removeItem('KTMauth');
        router.push('/sign-in');
      })
      .catch((err) => {
        console.error(err);
        dispatch(cartReducerActions.reset());
        dispatch(stepReducerActions.reset('cartStep'));
        localStorage.removeItem('KTMauth');
        router.push('/sign-in');
      });
  };

  const links = [
    { href: '/dealer/home', icon: <HomeIcon />, label: 'Home' },
    { href: '/dealer/profile', icon: <AccountCircleIcon />, label: 'Profile' },
    { href: '/dealer/pickup', icon: <TransferWithinAStationIcon />, label: 'Pickup' },
    { href: '/dealer/wallet', icon: <AccountBalanceWalletIcon />, label: 'Wallet' },
    { href: '/dealer/settings', icon: <SettingsIcon />, label: 'Settings' },
    { href: '/sign-in', icon: <ExitToAppIcon />, label: 'Logout' },
  ];

  return (
    <>
      <div className="menubar" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <ul className={isOpen ? 'profile__navbar profile__navbar__active' : 'profile__navbar'}>
        {links.map(({ href, icon, label }) => (
          <li key={label}>
            <Link href={href} className="profile__link" onClick={() => setIsOpen(false)}>
              {icon} {label}
            </Link>
          </li>
        ))}
        <li>
          {/* <button className="profile__link" onClick={logOut}>
            <ExitToAppIcon /> Logout
          </button> */}
        </li>
      </ul>
    </>
  );
};

export default DealerProfileNavbar;
