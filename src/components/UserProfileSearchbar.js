'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// Material UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';

// CSS
import '@/app/styles/UserProfileSearchbar.css';

const UserProfileSearchbar = () => {
  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;
  const gAuth = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMgauth')) : null;

  const cart = useSelector((state) => state.cartReducer);

  return (
    <div className="user__profile__searchbar">
      <div className="searchbar">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="profile">
        <p>
          {apiKey?.username
            ? `Welcome ${apiKey.username}`
            : gAuth !== null
            ? 'Welcome As Guest'
            : 'Loading...'}
        </p>
        <div>
          <Link href="/sell/user/profile" className="profile__icon">
            <AccountCircleIcon />
          </Link>
          <Link href="/sell/cart" className="cart__icon">
            {cart?.cartItems ? (
              <Badge badgeContent={cart.cartItems.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSearchbar;
