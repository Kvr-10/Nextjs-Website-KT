'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

// Styles
import '@/app/styles/SellItem.css';
import '@/app/styles/App.css';

// Components

import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import ChangePincode from '@/components/ChangePincode';
import SellItemCard from '@/components/SellItemPage/SellItemCard';
import DealerContactCard from '@/components/SellItemPage/DealerContactCard';


// Material UI
import { Button, Menu, MenuItem } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TuneIcon from '@mui/icons-material/Tune';

// Utils
import { apiUrl } from '@/lib/Private';

const SellItem = () => {
  const [isClient, setIsClient] = useState(false);
  const [pincode, setPincode] = useState('');
  const [sellItemName, setSellItemName] = useState('all');
  const [pincodeData, setPincodeData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [modalPincode, setModalPincode] = useState('');
  const [sellItemData, setSellItemData] = useState([]);
  const [dealerContactData, setDealerContactData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const storedPin = localStorage.getItem('KTMpincode');
    const storedItem = localStorage.getItem('KTMsellItemName');
    if (storedPin) setPincode(storedPin);
    if (storedItem) setSellItemName(storedItem);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!pincode || !isClient) return;

    axios.get(`https://api.postalpincode.in/pincode/${pincode}`).then((res) => {
      if (res.data[0].PostOffice) setPincodeData(res.data);
      else Swal.fire({ title: 'Enter valid pincode', confirmButtonColor: '#56b124' });
    });

    axios.get(`${apiUrl}/dealer/api/getdealers/${pincode}`).then((res) => {
      if (res.status === 200) setDealerContactData(res.data.data.dealers);
    });

    axios.get(`${apiUrl}/dealer_details/search-subcategory/${pincode}/`).then((res) => {
      setSellItemData(res.data);
    }).catch((err) => {
      if (err.response?.status === 302) {
        const data = err.response.data;
        if (sellItemName === 'all') setSellItemData(data);
        else {
          const item = sellItemName[0].toUpperCase() + sellItemName.slice(1).toLowerCase();
          const filtered = data.filter((each) => each.category_name === item);
          setSellItemData(filtered);
        }
      }
    });
  }, [pincode, sellItemName, isClient]);

  const openModal = () => setIsOpen(!isOpen);

  const changePincode = () => {
    if (!modalPincode) return;
    axios.get(`https://api.postalpincode.in/pincode/${modalPincode}`).then((res) => {
      if (res.data[0].Status === 'Success') {
        localStorage.setItem('KTMpincode', modalPincode);
        setPincode(modalPincode);
        setModalPincode('');
        openModal();
      } else {
        Swal.fire({ title: 'Invalid pincode', confirmButtonColor: '#56b124' });
        setModalPincode('');
      }
    });
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const filter = (category) => {
    localStorage.setItem('KTMsellItemName', category.toLowerCase());
    setSellItemName(category);
    setAnchorEl(null);
  };

  if (!isClient) return null;

  return (
    <>
   
      <UserProfileSearchbar />

      <div className="sell__item__section">
        <div className="sell__item__header">
          <h1>
            {sellItemData.length > 0 ? `${sellItemName[0].toUpperCase() + sellItemName.slice(1)} Category` : dealerContactData.length > 0 ? 'Dealer Contact Details' : 'No Service'}
          </h1>
          <ChangePincode openModal={openModal} pincode={pincode} />
          {pincodeData && (
            <div className="sell__item__area">
              <p>
                Selected area: <span>{pincodeData[0].PostOffice[0].Block}, {pincodeData[0].PostOffice[0].District}, {pincodeData[0].PostOffice[0].State} - {pincodeData[0].PostOffice[0].Pincode}</span>
              </p>
            </div>
          )}
          <div className="filter">
            <Button onClick={handleClick}>Filter <TuneIcon /></Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              {['all', 'paper', 'glass', 'plastic', 'metals', 'e-waste', 'other'].map((cat) => (
                <MenuItem key={cat} onClick={() => filter(cat)}>{cat[0].toUpperCase() + cat.slice(1)}</MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {sellItemData.length > 0 ? (
          <div className="sell__item">
            {sellItemData.map((each, idx) => (
              each.subcategory_name && <SellItemCard key={idx} {...each} />
            ))}
          </div>
        ) : dealerContactData.length > 0 ? (
          <div className="dealer__contact__section">
            {dealerContactData.map((each) => (
              <DealerContactCard key={each.id} {...each} />
            ))}
          </div>
        ) : (
          <p className="no__service">
            This service is not available in your area.<br />
            <span style={{ color: '#56b124', fontWeight: 'bold' }}>It will be coming soon.</span>
          </p>
        )}

        <Modal className="modal__content" overlayClassName="modal__overlay" isOpen={isOpen} ariaHideApp={false}>
          <CloseRoundedIcon fontSize="large" className="modal__close__icon" onClick={openModal} />
          <h1>Change area pincode</h1>
          <input type="text" placeholder="Pincode" value={modalPincode} onChange={(e) => setModalPincode(e.target.value)} />
          <div>
            <button onClick={changePincode}>Done</button>
          </div>
        </Modal>
      </div>
      
    </>
  );
};

export default SellItem;
