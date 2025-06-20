'use client';

import React from "react";

// CSS import for Next.js (from styles folder)
import '@/app/styles/AboutWorkCard.css';


const AboutWorkCard = ({ title, description }) => {
  return (
    <div className="about__work__card">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default AboutWorkCard;
