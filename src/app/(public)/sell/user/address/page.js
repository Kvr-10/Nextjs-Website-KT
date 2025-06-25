'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

// Components
import Navbar from '@/components/Navbar';
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';
import UserAddressCard from '@/components/User/UserAddress/UserAddressCard';
import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';

// CSS
import '@/app/styles/UserAddress.css';
import '@/app/styles/App.css';

// API URL
import { apiUrl } from '@/lib/Private';

const UserAddress = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [areaInputData, setAreaInputData] = useState({
    pincode: '',
    city: '',
    address: '',
    addressarea: '',
    landmark: '',
    state: '',
  });

  const apiKey =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('KTMauth'))
      : null;

  const openModal = () => setIsOpen(!isOpen);

  const getInputValue = (e) => {
    setAreaInputData({ ...areaInputData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!apiKey) return;
    axios
      .get(`${apiUrl}/address/get-address-by-ktid/${apiKey['KT_ID']}/`)
      .then((res) => setUserAddress(res.data))
      .catch((err) => console.error(err));
  }, [isOpen]);

  const addArea = async () => {
    const {
      pincode,
      city,
      address,
      addressarea,
      landmark,
      state,
    } = areaInputData;

    if (
      !isNaN(pincode) &&
      pincode.length === 6 &&
      state &&
      city &&
      landmark &&
      address &&
      addressarea
    ) {
      const data = new FormData();
      data.append('user_id', apiKey.id);
      data.append('user_type', apiKey.account_type);
      data.append('name', apiKey.username);
      data.append('kabadi_techno_id', apiKey.KT_ID);
      data.append('phone_number', apiKey.mobile_number);
      data.append('address', address);
      data.append('address_area', addressarea);
      data.append('landmark', landmark);
      data.append('city', city);
      data.append('state', state);
      data.append('pincode', pincode);
      data.append('default', userAddress.length === 0 ? 'default' : 'not default');

      if (userAddress.length <= 4) {
        try {
          const res = await axios.post(`${apiUrl}/address/post-address/`, data, {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          });

          if (res.status === 200) {
            Swal.fire({
              title: 'Successfully added area',
              confirmButtonColor: '#56b124',
            });
            setAreaInputData({
              pincode: '',
              city: '',
              address: '',
              addressarea: '',
              landmark: '',
              state: '',
            });
            setIsOpen(false);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        Swal.fire({
          title: 'You can add only 5 addresses.',
          confirmButtonColor: '#56b124',
        });
        setIsOpen(false);
      }
    } else {
      Swal.fire({
        title: 'Enter valid fields. All fields are mandatory.',
        confirmButtonColor: '#56b124',
      });
    }
  };

  const deleteArea = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/address/delete-address/${id}/`);
      if (res.status === 202) {
        Swal.fire({
          title: 'Successfully deleted address',
          confirmButtonColor: '#56b124',
        });
        // force refresh
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 50);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="similar__section">
        <h1 className="similar__section__heading">Set Your Addresses</h1>
        <div className="address_cards">
          <div className="add__address__card" onClick={openModal}>
            <span>&#43;</span>
            <p>Add Address</p>
          </div>

          {userAddress.length !== 0 ? (
            userAddress.map((each, idx) => (
              <UserAddressCard
                key={idx}
                pincode={each.pincode}
                address_id={each.id}
                state={each.state}
                city={each.city}
                area={each.address}
                address_area={each.address_area}
                landmark={each.landmark}
                default={each.default}
                deleteArea={() => deleteArea(each.id)}
              />
            ))
          ) : (
            <p>No Addresses available here</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        isOpen={isOpen}
        ariaHideApp={false}
      >
        <h1>Set Address</h1>
        <input
          type="text"
          placeholder="Enter Pincode"
          name="pincode"
          value={areaInputData.pincode}
          onChange={getInputValue}
        />
        <input
          type="text"
          placeholder="Enter Address"
          name="address"
          value={areaInputData.address}
          onChange={getInputValue}
        />
        <input
          type="text"
          placeholder="Enter Address Area"
          name="addressarea"
          value={areaInputData.addressarea}
          onChange={getInputValue}
        />
        <input
          type="text"
          placeholder="Enter Landmark"
          name="landmark"
          value={areaInputData.landmark}
          onChange={getInputValue}
        />
        <input
          type="text"
          placeholder="Enter City"
          name="city"
          value={areaInputData.city}
          onChange={getInputValue}
        />
        <input
          type="text"
          placeholder="Enter State"
          name="state"
          value={areaInputData.state}
          onChange={getInputValue}
        />
        <div>
          <button onClick={openModal} className="add__area__button">
            Cancel
          </button>
          <button onClick={addArea} className="add__area__button">
            Add Your Address
          </button>
        </div>
      </Modal>

      <MainFooter />
      <TermFooter />
    </>
  );
};

export default UserAddress;
