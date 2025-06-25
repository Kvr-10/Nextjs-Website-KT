'use client';

import React from 'react';
import '@/app/styles/UserAddressCard.css'; // or wherever your CSS is placed

const UserAddressCard = ({
  area,
  address_area,
  landmark,
  city,
  state,
  pincode,
  default: isDefault,
  deleteArea,
}) => {
  return (
    <div className="user__area__card">
      <p>
        Address : <span>{area}</span>
      </p>
      <p>
        Area : <span>{address_area}</span>
      </p>
      <p>
        Landmark : <span>{landmark}</span>
      </p>
      <p>
        City : <span>{city}</span>
      </p>
      <p>
        State : <span>{state}</span>
      </p>
      <p>
        Pincode : <span>{pincode}</span>
      </p>
      <p>
        Default : <span>{isDefault}</span>
      </p>
      <button onClick={deleteArea}>Delete Area</button>
    </div>
  );
};

export default UserAddressCard;
