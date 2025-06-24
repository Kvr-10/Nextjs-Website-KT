// src/app/(dealer)/settings/DealerRequestCategory/page.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';

// Components
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerRequestCategoryCard from './DealerRequestCategoryCard';

// Styles
import '@/app/styles/DealerRequestCategory.css';
import '@/app/styles/App.css';

// Static Images
const tick__image = '/images/tick__image.png';
const upload__document = '/images/upload__document.png';

// Constants & Dummy Data
import { DealerRequestCategoryData } from './DealerRequestCategoryData';
import { apiUrl } from '@/utils/constants';

const DealerRequestCategory = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    img: '',
    img__status: upload__document,
    title: '',
    description: '',
  });

  const [dealerRequestCategoryData, setDealerRequestCategoryData] = useState(DealerRequestCategoryData);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('KTMauth');
    if (stored) {
      setApiKey(JSON.parse(stored));
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    axios
      .get(`${apiUrl}/dealer_details/get_category_request/${apiKey.id}/`)
      .then((res) => setDealerRequestCategoryData(res.data))
      .catch(console.error);
  }, [apiKey]);

  const getImage = (e) => {
    const attribute = `${e.target.name}__status`;
    if (e.target.files?.[0]) {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.files[0],
        [attribute]: tick__image,
      });
    }
  };

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const requestCategory = async (e) => {
    e.preventDefault();
    if (!apiKey || inputValue.img === '') return;

    const data = new FormData();
    data.append('dealer_id', apiKey.id);
    data.append('category_image', inputValue.img);
    data.append('description', inputValue.description);
    data.append('category_name', inputValue.title);

    try {
      await axios.post(`${apiUrl}/dealer_details/add_category_request/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire({
        title: 'Successfully requested',
        confirmButtonColor: '#56b124',
      });

      router.push('/dealer/settings');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__request__category similar__section">
        <h1 className="similar__section__heading">Request to Add Category</h1>

        <form className="request__category__form" onSubmit={requestCategory}>
          <img src={inputValue.img__status} alt="status" />
          <input
            type="file"
            required
            accept="image/*"
            id="img"
            name="img"
            style={{ display: 'none' }}
            onChange={getImage}
            onClick={(e) => (e.target.value = null)}
          />
          <label htmlFor="img">Upload Image</label>
          <input
            type="text"
            placeholder="Category Name"
            required
            name="title"
            value={inputValue.title}
            onChange={getInputValue}
          />
          <input
            type="text"
            placeholder="Add Description"
            required
            name="description"
            value={inputValue.description}
            onChange={getInputValue}
          />
          <button type="submit">Request</button>
        </form>

        <div className="request__category">
          <h1>Requested Category</h1>
          <div>
            {dealerRequestCategoryData.length !== 0 ? (
              dealerRequestCategoryData.map((each, index) => (
                <DealerRequestCategoryCard
                  key={index}
                  img={each.category_image}
                  name={each.category_name}
                  description={each.description}
                  status={each.status}
                />
              ))
            ) : (
              <p>No request available here</p>
            )}
          </div>
        </div>
      </div>


    </>
  );
};

export default DealerRequestCategory;
