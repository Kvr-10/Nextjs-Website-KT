"use client";

import React, { useState } from "react";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '@/app/styles/FaqCard.css';

const FaqCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq__card">
      <h1
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {props.question}{" "}
        <span>
          {isOpen ? (
            <ExpandLessIcon fontSize="large" />
          ) : (
            <ExpandMoreIcon fontSize="large" />
          )}
        </span>
      </h1>
      {isOpen ? (
        <div dangerouslySetInnerHTML={{ __html: props.answer }}></div>
      ) : null}
    </div>
  );
};

export default FaqCard;
