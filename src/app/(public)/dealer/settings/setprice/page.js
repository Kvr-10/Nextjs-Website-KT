'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerSetPriceCard from '@/components/Dealer/DealerSettings/DealerSetPriceCard';


import { apiUrl } from '@/lib/Private';
import '@/app/styles/App.css';

const DealerSetPrice = () => {
  const [scrapCategoryData, setScrapCategoryData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/cat/category-list/`)
      .then((res) => setScrapCategoryData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__set__price similar__section">
        <h1 className="similar__section__heading" style={{ marginBottom: '0' }}>
          Set Your Price
        </h1>

        <div className="scrap__section">
          {scrapCategoryData.map((eachData, index) => (
            <DealerSetPriceCard
              key={index}
              img={eachData.image}
              title={eachData.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DealerSetPrice;
