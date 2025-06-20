'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

// Styles
import '@/app/styles/Auth.css';

export default function RightBanner() {
  return (
    <div className="banner">
      <div className="typist">
        <h1>
          <Typewriter
            options={{
              strings: [
                `"Be a part of solution,\nnot a part of pollution."`
              ],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h1>
      </div>
    </div>
  );
}
