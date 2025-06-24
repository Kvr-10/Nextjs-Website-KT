'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerHomeCard from './DealerHomeCard';

// Styles
import '@/app/styles/DealerHome.css';
import '@/app/styles/App.css';

// API URL
import { apiUrl1 } from '@/lib/Private';

const DealerHome = () => {
  const [pickupData, setPickupData] = useState([]);
  const [homeData, setHomeData] = useState([
    { title: 'Total Pickup', number: 0 },
    { title: 'Total Category', number: 0 }, // NOTE: You can update this based on actual category logic.
    { title: 'Total Successful', number: 0 }, // NOTE: Also update based on real success status.
    { title: 'Total Cancel', number: 0 },
    { title: 'Total Today Pickup', number: 0 },
  ]);

  const [loading, setLoading] = useState(true);

  const getDate = () => new Date().toISOString().split('T')[0]; // yyyy-mm-dd

  useEffect(() => {
    const auth = localStorage.getItem('KTMauth');
    if (!auth) return;

    let parsed;
    try {
      parsed = JSON.parse(auth);
    } catch (err) {
      console.error("Invalid KTMauth format:", err);
      return;
    }

    const dealerId = parsed?.id;
    if (!dealerId) return;

    axios
      .get(`${apiUrl1}/api/dealer/confirm_orders/${dealerId}/`)
      .then((res) => {
        const data = res.data || [];
        setPickupData(data);

        let cancelCount = 0;
        let todayPickupCount = 0;
        let total = data.length;

        const today = getDate();

        data.forEach((item) => {
          if (['Cancelled by Dealer', 'Cancelled by Customer'].includes(item.status)) {
            cancelCount++;
          }
          if (item.status === 'Accepted' && item.created_at?.slice(0, 10) === today) {
            todayPickupCount++;
          }
        });

        setHomeData((prev) =>
          prev.map((item) => {
            switch (item.title) {
              case 'Total Pickup':
                return { ...item, number: total };
              case 'Total Cancel':
                return { ...item, number: cancelCount };
              case 'Total Today Pickup':
                return { ...item, number: todayPickupCount };
              default:
                return item;
            }
          })
        );
      })
      .catch((err) => {
        console.error("Failed to fetch dealer pickup data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__home similar__section">
        <h1 className="similar__section__heading">Dashboard</h1>

        {loading ? (
          <p>Loading dashboard data...</p>
        ) : (
          <div className="dashboard">
            {homeData.map((each, i) => (
              <DealerHomeCard key={i} title={each.title} number={each.number} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DealerHome;
