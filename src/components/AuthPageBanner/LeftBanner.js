'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';
import Link from 'next/link';
import Swal from 'sweetalert2';

// Styles
import '@/app/styles/Auth.css';

export default function LeftBanner() {
  return (
    <div className="banner">
      <div className="typist">
        <h1>
          <Typewriter
            options={{
              strings: [
                `"Be a part of solution, not a part of pollution."`
              ],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h1>
      </div>

      {/* ✅ Using Next.js Link */}
      <Link href="/sign-in/sign-up" className="banner__button">
        Sign Up
      </Link>

      {/* Optional SweetAlert fallback button */}
      {/*
      <button
        className="banner__button"
        onClick={() => {
          Swal.fire({
            title: "Sign Up feature will be live soon.",
            confirmButtonColor: "#56b124",
          });
        }}
      >
        Sign Up
      </button>
      */}
    </div>
  );
}
