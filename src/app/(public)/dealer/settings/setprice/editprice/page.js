// src/app/(dealer)/settings/setprice/editprice/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Components
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerEditPriceCard from '@/components/Dealer/DealerSettings/DealerEditPriceCard';


// Styles
import '@/app/styles/DealerEditPrice.css';
import '@/app/styles/App.css';

// Constants
import { apiUrl } from '@/lib/Private'; // Make sure this path is correct

const DealerEditPrice = () => {
  const priceItemName = useSelector((state) => state.itemNameReducer.priceItemName);
  const [dealerEditPriceItemData, setDealerEditPriceItemData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/cat/all-subcategory-list/`)
      .then((res) => {
        setDealerEditPriceItemData(res.data);
      })
      .catch((err) => {
        setDealerEditPriceItemData(err.response?.data || []);
      });
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__edit__price similar__section">
        <h1 className="similar__section__heading">
          Set Price For{' '}
          {priceItemName !== ''
            ? priceItemName[0].toUpperCase() + priceItemName.slice(1)
            : 'All'}{' '}
          Category
        </h1>

        <Link href="/dealer/settings/setprice/editprice/pricelist" className="dealer__price__list">
          Price List
        </Link>

        <div className="edit__price">
          {dealerEditPriceItemData.map((eachData, index) => (
            <DealerEditPriceCard
              key={index}
              img={eachData.sub_image}
              name={eachData.sub_name}
              category={eachData.category}
              subcategory={eachData.id}
            />
          ))}
        </div>
      </div>

    </>
  );
};

export default DealerEditPrice;
