'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';


import '@/app/styles/DealerProfileSearchbar.css';

const DealerProfileSearchbar = () => {
  const [dealerName, setDealerName] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('KTMauth');
    if (auth) {
      const parsed = JSON.parse(auth);
      setDealerName(parsed?.username || '');
    }
  }, []);

  return (
    <div className="dealer__profile__searchbar">
      <span className="logo">
        <Image src="/Image/kabadi__techno__logo.png" alt="Logo" width={150} height={40} />
      </span>
      <div className="searchbar">
        <input type="text" placeholder="Search..." />
        <SearchIcon />
      </div>
      <p>
        Welcome {dealerName}
        <AccountCircleIcon />
      </p>
    </div>
  );
};

export default DealerProfileSearchbar;
