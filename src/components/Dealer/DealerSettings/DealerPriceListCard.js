// src/components/Dealer/DealerSettings/DealerPriceListCard.jsx
'use client';

import React from "react";
import Image from "next/image";
import '@/app/styles/DealerPriceList.css';
import '@/app/styles/App.css';

const DealerPriceListCard = ({ img, name, pincodeDetails }) => {
  return (
    <div className="dealer__price__item__card">
      <div className="details__section">
        <div className="img">
          <Image src={img} alt={name} width={100} height={100} />
        </div>
        <div className="details">
          <h1 className="details__heading">
            {name[0].toUpperCase() + name.slice(1)}
          </h1>
          {pincodeDetails.map((eachDetail, index) => (
            <div className="price__section" key={index}>
              <h1>{eachDetail.pincode}</h1>
              <p>{eachDetail.price}</p>
              <span>{eachDetail.priceIn}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="action__section">
        <div className="agree">
          <p>Kabadi Techno Commission 1% Per/kg</p>
        </div>
        <button>Edit Price</button>
      </div>
    </div>
  );
};

export default DealerPriceListCard;
