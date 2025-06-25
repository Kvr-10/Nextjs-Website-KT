'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import axios from 'axios';

// Components

import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';
import UserAutoScrapCard from '@/components/User/UserAutoScrapCard';


// Styles
import '@/app/styles/App.css';

// API
import { apiUrl } from '@/lib/Private';

const UserAutoScrap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrapItemData, setScrapItemData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/cat/category-list/`)
      .then((res) => {
        setScrapItemData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>

      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="scrap__section">
        {scrapItemData.map((eachData) => (
          <UserAutoScrapCard
            key={eachData.id}
            autoScrapService={() =>
              Swal.fire({
                title: 'This service is not available right now',
                confirmButtonColor: '#56b124',
              })
            }
            img={eachData.image}
            title={eachData.name}
          />
        ))}

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Fill area pincode & customer type</h1>
          <input type="text" placeholder="Pincode" />
          <input type="text" placeholder="Customer type" disabled />
          <div>
            <button
              onClick={() => {
                setIsOpen(false);
                Swal.fire({
                  title: 'This service is not available right now',
                  confirmButtonColor: '#56b124',
                });
              }}
            >
              Done
            </button>
          </div>
        </Modal>
      </div>

    </>
  );
};

export default UserAutoScrap;
