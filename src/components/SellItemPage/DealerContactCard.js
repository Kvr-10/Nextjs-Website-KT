'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// CSS (adjust path if needed)
import '@/app/styles/DealerContactCard.css';

// Config
import { apiUrl } from '@/lib/Private'; // Ensure this is correct in your project

const DealerContactCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellInput, setSellInput] = useState({
    dealer_id: '',
    customer_name: '',
    phone: '',
    email: '',
    itemName: '',
    itemPic: '',
    quantity: '',
    description: '',
  });

  const getSellInput = (e) => {
    setSellInput({ ...sellInput, [e.target.name]: e.target.value });
  };

  const uploadPic = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSellInput({
          ...sellInput,
          [e.target.name]: reader.result,
        });
      }
    };
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const submitSellItem = async () => {
    const { customer_name, phone, email, itemName, itemPic, quantity, description } = sellInput;

    if (
      typeof customer_name === 'string' &&
      !isNaN(phone) &&
      phone.length === 10 &&
      quantity > 0
    ) {
      const data = new FormData();
      data.append('dealer_id', props.dealerId);
      data.append('customer_name', customer_name);
      data.append('phone', phone);
      data.append('email', email);
      data.append('itemName', itemName);
      data.append('quantity', quantity);
      data.append('description', description);
      if (itemPic !== '') data.append('itemPic', itemPic);

      try {
        await axios.post(`${apiUrl}/dealer/api/requestinquiry-post/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setIsOpen(false);
        setSellInput({
          dealer_id: '',
          customer_name: '',
          phone: '',
          email: '',
          itemName: '',
          itemPic: '',
          quantity: '',
          description: '',
        });

        Swal.fire({ title: 'Order Placed', confirmButtonColor: '#56b124' });
      } catch (err) {
        Swal.fire({ title: "Order can't be placed", confirmButtonColor: '#56b124' });
      }
    } else {
      Swal.fire({ title: 'Fill the form properly', confirmButtonColor: '#56b124' });
    }
  };

  return (
    <>
      <div className="dealer__contact__card">
        <h2>KTD{props.dealerId} is available</h2>
        <p>
          Dealing in:{' '}
          {props.Dealing.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}
        </p>
        <p>
          Minimum Qty: <span>{props.Minimum}kg</span>
        </p>
        <p>
          Maximum Qty: <span>{props.Maximum}kg</span>
        </p>
        <p>
          Timing: <span>8am to 7pm</span>
        </p>
        <button onClick={openModal}>Sell</button>
      </div>

      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        isOpen={isOpen}
        onRequestClose={openModal}
        ariaHideApp={false}
      >
        <CloseRoundedIcon fontSize="large" className="modal__close__icon" onClick={openModal} />
        <h1>Fill the below form to sell your item</h1>

        <input
          type="file"
          required
          accept="image/*"
          name="itemPic"
          id="itemPic"
          style={{ display: 'none' }}
          onChange={uploadPic}
          onClick={(e) => (e.target.value = null)}
        />
        <label htmlFor="itemPic">Select Item Pic</label>

        <input
          type="text"
          name="customer_name"
          value={sellInput.customer_name}
          placeholder="Customer Name"
          onChange={getSellInput}
        />
        <input
          type="text"
          name="phone"
          value={sellInput.phone}
          placeholder="Phone number"
          onChange={getSellInput}
        />
        <input
          type="email"
          name="email"
          value={sellInput.email}
          placeholder="Email"
          onChange={getSellInput}
        />
        <input
          type="text"
          name="itemName"
          value={sellInput.itemName}
          placeholder="Item Name"
          onChange={getSellInput}
        />
        <input
          type="number"
          name="quantity"
          value={sellInput.quantity}
          placeholder="Quantity"
          onChange={getSellInput}
        />
        <input
          type="text"
          name="description"
          value={sellInput.description}
          placeholder="Description"
          onChange={getSellInput}
        />

        <div>
          <button onClick={submitSellItem}>Submit</button>
        </div>
      </Modal>
    </>
  );
};

export default DealerContactCard;
