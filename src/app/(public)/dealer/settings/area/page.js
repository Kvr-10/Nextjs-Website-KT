'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerAreaCard from '@/components/Dealer/DealerSettings/DealerAreaCard';

import '@/app/styles/DealerArea.css';
import '@/app/styles/App.css';

const DealerArea = () => {
  const [apiKey, setApiKey] = useState(null);
  const [dealerAreaData, setDealerAreaData] = useState([]);
  const [areaInputData, setAreaInputData] = useState({ pincode: '', state: '', city: '', area: '' });
  const [priceData, setPriceData] = useState([]);
  const [numberOfPincodesAllowed, setNumberOfPincodesAllowed] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem('KTMauth');
      if (storedKey) setApiKey(JSON.parse(storedKey));
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      axios.get(`/dealer_details/no_of_pincodes/${apiKey.id}/`).then(res => setNumberOfPincodesAllowed(res.data.no_of_pincodes)).catch(console.log);
      axios.get(`/dealer_details/get_all_pincodes/${apiKey.id}/`).then(res => {
        const pincodes = Object.values(res.data).filter(v => !isNaN(v));
        setDealerAreaData(pincodes);
      }).catch(console.log);
      axios.get(`/dealer_details/get-price/${apiKey.id}/`).then(res => setPriceData(res.data)).catch(console.log);
    }
  }, [apiKey]);

  const getInputValue = (e) => setAreaInputData({ ...areaInputData, [e.target.name]: e.target.value });

  const searchArea = async () => {
    if (!areaInputData.pincode) return Swal.fire({ title: 'Add a pincode first', confirmButtonColor: '#56b124' });
    const res = await axios.get(`https://api.postalpincode.in/pincode/${areaInputData.pincode}`);
    const postOffice = res.data[0].PostOffice?.[0];
    if (!postOffice) return Swal.fire({ title: 'Check the entered pincode', confirmButtonColor: '#56b124' });
    setAreaInputData({ ...areaInputData, state: postOffice.State, city: postOffice.District, area: postOffice.Block });
  };

  const addArea = () => {
    if (!areaInputData.pincode || !areaInputData.state || !areaInputData.city || !areaInputData.area) return;

    const exists = dealerAreaData.includes(areaInputData.pincode);
    if (exists) return Swal.fire({ title: 'This pincode has already been added.', confirmButtonColor: '#56b124' });

    const count = dealerAreaData.length;
    const newData = [...dealerAreaData, areaInputData.pincode];
    const data = new FormData();
    data.append('dealer_id', apiKey.id);

    newData.forEach((pin, i) => data.append(`pincode${i + 1}`, pin));
    for (let i = newData.length + 1; i <= 10; i++) data.append(`pincode${i}`, '');

    axios.post(`/dealer_details/update_pincodes/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        Swal.fire({ title: 'Area added successfully', confirmButtonColor: '#56b124' });
        setDealerAreaData(newData);
        setAreaInputData({ pincode: '', state: '', city: '', area: '' });
      }).catch(console.log);
  };

  const deleteArea = (index) => {
    const pincodeToDelete = dealerAreaData[index];
    const remaining = dealerAreaData.filter((_, i) => i !== index);
    const data = new FormData();
    data.append('dealer_id', apiKey.id);
    remaining.forEach((pin, i) => data.append(`pincode${i + 1}`, pin));
    for (let i = remaining.length + 1; i <= 10; i++) data.append(`pincode${i}`, '');

    axios.post(`/dealer_details/update_pincodes/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        Swal.fire({ title: 'Pincode removed successfully', confirmButtonColor: '#56b124' });
        setDealerAreaData(remaining);
      }).catch(console.log);
  };

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />
      <div className="dealer__area similar__section">
        <h1 className="similar__section__heading">Set Your Area</h1>
        <div className="area__form">
          <input type="text" name="pincode" value={areaInputData.pincode} onChange={getInputValue} placeholder="Enter Your Pincode" required />
          <button className="search__area__button" onClick={searchArea}>Search</button>
          <p>State : <span>{areaInputData.state}</span></p>
          <p>City : <span>{areaInputData.city}</span></p>
          <p>Area : <span>{areaInputData.area}</span></p>
          <button className="add__area__button" onClick={addArea}>Add Your Area</button>
        </div>

        <div className="add__area">
          <h1>Added Area</h1>
          <div>
            {dealerAreaData.length ? dealerAreaData.map((pincode, idx) => (
              <DealerAreaCard key={idx} pincode={pincode} deleteArea={() => deleteArea(idx)} />
            )) : <p>No Area available here</p>}
          </div>
        </div>
      </div>

    </>
  );
};

export default DealerArea;