'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import Navbar from '@/components/Navbar';
import SellFaqTopBanner from '@/components/SellFaqTopBanner';
import FaqCard from '@/app/(public)/faq/FaqCard';
import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';

// css
import '@/app/styles/Faq.css';

// api url
import { apiUrl } from '@/lib/Private';

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/v3/WebsiteContent/faq/`)
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>

      <div className="main__section">
        <SellFaqTopBanner title="Frequently asked Questions" />

        <div className="faq__section">
          {faqData.map((eachData, index) => (
            <FaqCard
              key={index}
              question={eachData.qns}
              answer={eachData.ans}
            />
          ))}
        </div>
      </div>

    </>
  );
};

export default FaqPage;
