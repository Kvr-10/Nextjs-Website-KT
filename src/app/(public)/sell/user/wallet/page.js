'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';

import Image from 'next/image';
import Link from 'next/link';

// Icons
import HistoryIcon from '@mui/icons-material/History';

// Components
import Navbar from '@/components/Navbar';
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';

// Styles
import '@/app/styles/UserDealerWallet.css';
import '@/app/styles/App.css';

const UserWallet = () => {
  const [walletStep, setWalletStep] = useState({ step2: false, step3: false });
  const [inputValue, setInputValue] = useState({
    mobileNumber: '',
    transferAmount: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const showStep2 = () => {
    Swal.fire({
      title: 'This service is not available right now',
      confirmButtonColor: '#56b124',
    });
  };

  const showStep3 = () => {
    if (inputValue.mobileNumber !== '' && inputValue.transferAmount !== '') {
      setWalletStep({ step2: true, step3: true });
      setInputValue({
        mobileNumber: '',
        transferAmount: '',
      });
      setTimeout(() => {
        setWalletStep({ step2: false, step3: false });
      }, 5000);
    } else {
      Swal.fire({
        title: 'Fill the input fields properly',
        confirmButtonColor: '#56b124',
      });
    }
  };

  return (
    <>
      
      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="user__dealer__wallet__section similar__section">
        <h1 className="similar__section__heading">Your Wallet</h1>
        <div className="user__dealer__wallet">
          {/* Step 1 */}
          <div className="user__dealer__wallet__step user__dealer__wallet__step1">
            <Link
              href="/sell/user/wallet/wallethistory"
              className="user__dealer__wallet__history__icon"
              data-tooltip-id="wallet-tip"
              data-tooltip-content="Wallet history"
            >
              <HistoryIcon />
            </Link>
            <Tooltip id="wallet-tip" />
            <Image src="/Image/wallet.png" alt="Wallet" width={100} height={100} />
            <h1>
              ₹ <span>0</span>
            </h1>
            <button
              className="user__dealer__wallet__button"
              disabled={walletStep.step2}
              onClick={showStep2}
            >
              Transfer Amount
            </button>
          </div>

          {/* Step 2 */}
          {walletStep.step2 && (
            <div className="user__dealer__wallet__step user__dealer__wallet__step2">
              <div>
                <Image src="/Image/wallet.png" alt="Wallet" width={100} height={100} />
                <h1>
                  ₹ <span>0</span>
                </h1>
              </div>
              <div>
                <button>
                  <Image src="/Image/gpay.png" alt="GPay" width={60} height={60} />
                </button>
                <button>
                  <Image src="/Image/phonepe.png" alt="PhonePe" width={60} height={60} />
                </button>
                <button>
                  <Image src="/Image/paytm.png" alt="Paytm" width={60} height={60} />
                </button>
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={inputValue.mobileNumber}
                onChange={getInputValue}
                placeholder="Mobile Number"
                required
              />
              <input
                type="text"
                name="transferAmount"
                value={inputValue.transferAmount}
                onChange={getInputValue}
                placeholder="Transfer Amount"
                required
              />
              <button
                className="user__dealer__wallet__button"
                disabled={walletStep.step3}
                onClick={showStep3}
              >
                Transfer Amount
              </button>
            </div>
          )}

          {/* Step 3 */}
          {walletStep.step3 && (
            <div className="user__dealer__wallet__step user__dealer__wallet__step3">
              <div>
                <Image src="/Image/wallet.png" alt="Wallet" width={100} height={100} />
                <h1>
                  ₹ <span>0</span>
                </h1>
              </div>
              <h1>Transfer Successful</h1>
              <p>
                Transaction ID <span>0123456789</span>
              </p>
              <p>
                Amount Transfer on this number <span>8944837858</span> <span>to Google Pay</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserWallet;
