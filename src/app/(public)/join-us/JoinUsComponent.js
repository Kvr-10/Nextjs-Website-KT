'use client';

import React from "react";

// CSS
import '@/app/styles/JoinUsComponent.css';

const JoinUsComponent = (props) => {
  return (
    <div className="join__us__component">
      <div className="top__section">
        <div className="left__side">
          <h1>{props.title}</h1>
        </div>
        <div className="right__side">
          <p>{props.headline}</p>
          <button onClick={props.openClose}>
            {props.isOpen ? "Less Info" : "More Info"}
          </button>
        </div>
      </div>

      {props.isOpen && (
        <div className="bottom__section">
          <p>{props.description}</p>
          <span>{props.disclaimer}</span>
          <props.component />
        </div>
      )}
    </div>
  );
};

export default JoinUsComponent;
