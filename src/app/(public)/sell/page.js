'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Swal from 'sweetalert2';

// Components
import Navbar from '@/components/Navbar';
import SellFaqTopBanner from '@/components/SellFaqTopBanner';
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import ChangePincode from '@/components/ChangePincode';
import SellCard from '@/app/(public)/sell/SellCard';


// Styles
import '@/app/styles/Sell.css';
import '@/app/styles/App.css';

// Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// API
import { apiUrl } from '@/lib/Private';

const Sell = () => {
  const [scrapCategoryData, setScrapCategoryData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [happyCustomer, setHappyCustomer] = useState([]);
  const [modalPincode, setModalPincode] = useState('');

  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;
  const gAuth = typeof window !== 'undefined' ? localStorage.getItem('KTMgauth') : null;
  const pincode = typeof window !== 'undefined' ? localStorage.getItem('KTMpincode') : null;

  const [userData, setUserData] = useState({
    area_pin: pincode || 'Select',
    type: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (userData.area_pin !== '') {
      localStorage.setItem('KTMpincode', userData.area_pin);
    }
  }, [userData.area_pin]);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const changePincode = () => {
    if (modalPincode !== '') {
      axios
        .get(`https://api.postalpincode.in/pincode/${modalPincode}`)
        .then((res) => {
          if (res.data[0].Status === 'Success') {
            setUserData({ ...userData, area_pin: modalPincode });
            setModalPincode('');
            setIsOpen(false);
          } else {
            setModalPincode('');
            setIsOpen(false);
            Swal.fire({
              title: 'Invalid pincode',
              confirmButtonColor: '#56b124',
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/cat/category-list/`)
      .then((res) => setScrapCategoryData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/v3/WebsiteContent/happy-customers/`)
      .then((res) => setHappyCustomer(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>

      <div className="main__section">
        {(!apiKey && !gAuth) && <SellFaqTopBanner title="Kabadi Techno Rates of Scrap" />}

        {(apiKey && apiKey.account_category === 'customer') || gAuth ? (
          <>
            <UserProfileSearchbar />
            <h1>Kabadi Techno Rates of Scrap</h1>
            <ChangePincode pincode={userData.area_pin} openModal={openModal} />
          </>
        ) : (
          <ChangePincode
            pincode={userData.area_pin || pincode || 'Select'}
            openModal={openModal}
          />
        )}

        <div className="scrap__section" id="sellyourscrap">
          {scrapCategoryData.map((item) => (
            <SellCard key={item.id} pic={item.image} title={item.name} />
          ))}
        </div>

        <div className="main__section__carousel">
          <h1>Our Happy Customers</h1>
          {happyCustomer.length > 0 && (
            <div className="carousel__section">
              <Splide
                className="main__carousel"
                options={{
                  type: 'loop',
                  gap: '1rem',
                  autoplay: true,
                  pauseOnHover: false,
                  resetProgress: false,
                  pagination: false,
                  arrows: false,
                }}
              >
                {happyCustomer.map((cust, idx) => (
                  <SplideSlide key={idx} className="carousel">
                    <img src={cust.dp} alt={cust.name} />
                    <div>
                      <h1>{cust.feedback}</h1>
                      <p>{cust.name}</p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          )}
        </div>

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <CloseRoundedIcon fontSize="large" className="modal__close__icon" onClick={openModal} />
          <h1>Change area pincode</h1>
          <input
            type="text"
            placeholder="Pincode"
            value={modalPincode}
            onChange={(e) => setModalPincode(e.target.value)}
          />
          {(!apiKey && !gAuth) && (
            <input
              type="text"
              placeholder="customer type"
              value="Guest"
              disabled
            />
          )}
          <div>
            <button onClick={changePincode}>Done</button>
          </div>
        </Modal>
      </div>

    </>
  );
};

export default Sell;
