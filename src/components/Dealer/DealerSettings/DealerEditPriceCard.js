'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

import { apiUrl } from '@/lib/Private'; // Update path if needed
import '@/app/styles/DealerPriceItemCard.css';

const DealerEditPriceCard = (props) => {
  const router = useRouter();
  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;

  const [pricePincode, setPricePincode] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const image_url = `${apiUrl}/${props.img}`;

  const [inputValue, setInputValue] = useState(
    Array(10).fill().map(() => ({
      pincode: '',
      subcategory: props.subcategory,
      dealer: apiKey?.id || '',
      price: '0',
    }))
  );

  // Update price from fetched values
  useEffect(() => {
    pincodes.forEach((pin, pinIndex) => {
      pricePincode.forEach((detail) => {
        if (detail.subcategory_name === props.name && detail.pincode === pin) {
          const temp = [...inputValue];
          temp[pinIndex].price = detail.price;
          temp[pinIndex].pincode = detail.pincode;
          setInputValue(temp);
        }
      });
    });
  }, [pricePincode, pincodes]);

  // Fetch dealer prices
  useEffect(() => {
    if (!apiKey?.id) return;
    axios
      .get(`${apiUrl}/dealer_details/get-price/${apiKey.id}/`)
      .then((res) => setPricePincode(res.data))
      .catch(console.log);
  }, [apiKey?.id]);

  // Fetch dealer pincodes
  useEffect(() => {
    if (!apiKey?.id) return;
    axios
      .get(`${apiUrl}/dealer_details/get_all_pincodes/${apiKey.id}/`)
      .then((res) => {
        const pins = res.data;
        const pinList = Array.from({ length: 10 }, (_, i) => pins[`Pincode ${i + 1}`] || 0);
        setPincodes(pinList);
      })
      .catch(console.log);
  }, [apiKey?.id]);

  const getInputValue = (index, pin, e) => {
    const data = [...inputValue];
    data[index][e.target.name] = e.target.value;
    data[index].pincode = pin;
    setInputValue(data);
  };

  const deletePrice = (index, pincode) => {
    const data = new FormData();
    data.append('dealer', apiKey.id);
    data.append('subcategory', inputValue[index].subcategory);
    data.append('pincode', pincode);

    axios
      .post(`${apiUrl}/dealer_details/delete-price/`, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(() =>
        Swal.fire({
          title: 'Successfully removed',
        })
      )
      .catch(() =>
        Swal.fire({
          title: 'Error removing price',
          icon: 'error',
          confirmButtonColor: 'red',
        })
      );
  };

  const setPrice = async (e) => {
    e.preventDefault();

    for (const element of inputValue) {
      const data = new FormData();
      data.append('dealer', element.dealer);
      data.append('pincode', element.pincode);
      data.append('price', element.price);
      data.append('subcategory', element.subcategory);

      try {
        await axios.post(`${apiUrl}/dealer_details/add-price/`, data, {
          headers: { 'Content-type': 'multipart/form-data' },
        });
        Swal.fire({ title: 'Price added', confirmButtonColor: '#56b124' });
      } catch {
        await axios.post(`${apiUrl}/dealer_details/update-price/`, element, {
          headers: { 'Content-type': 'multipart/form-data' },
        });
        Swal.fire({ title: 'Price updated', confirmButtonColor: '#56b124' });
        router.push('/dealer/settings/setprice');
      }
    }

    Swal.fire({ title: 'All prices saved', confirmButtonColor: '#56b124' });
  };

  return (
    <form className="dealer__price__item__card" onSubmit={setPrice}>
      <div className="details__section">
        <div className="img">
          <img src={image_url} alt="Subcategory" />
        </div>
        <div className="details">
          <h1>{props.name[0].toUpperCase() + props.name.slice(1)}</h1>
          <p>Set area price</p>

          {pincodes.map((pin, pinIndex) => {
            if (pin > 0) {
              const existingDetail = pricePincode.find(
                (d) => d.subcategory_name === props.name && d.pincode === pin
              );

              return (
                <div className="price__section" key={pinIndex}>
                  <h1>{pin}</h1>
                  <p>:</p>
                  <input
                    type="text"
                    placeholder={existingDetail?.price || '0'}
                    onChange={(e) => getInputValue(pinIndex, pin, e)}
                    name="price"
                    value={inputValue[pinIndex]?.price || ''}
                  />
                  {existingDetail && (
                    <DeleteIcon onClick={() => deletePrice(pinIndex, pin)} style={{ cursor: 'pointer' }} />
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="action__section">
        <div className="agree">
          <input type="checkbox" required />
          <p>Kabadi Techno Commission 1% Per/kg</p>
        </div>
        <button type="submit">Set Price</button>
      </div>
    </form>
  );
};

export default DealerEditPriceCard;
