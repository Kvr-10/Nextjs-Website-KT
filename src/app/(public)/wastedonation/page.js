'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import '@/app/styles/WasteDonation.css';

import backgroundImage from '@/public/Images/image1.png';
import circularImage from '@/public/Images/image 20.png';
import qrCodeImage from '@/public/Images/qrCode.png';

const WasteDonation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="donationDone">
        <div className="firstHeadingOfDonation">
          <Image
            className="donationBackgoundImage"
            src={backgroundImage}
            alt="Donation background"
          />
          <div className="headingDonation">
            <div></div>
            <div className="supportFuture">
              <h1>Support a Cleaner Future</h1>
              <p>Donate to Waste Management Initiatives Today!</p>
            </div>
          </div>
        </div>

        <div className="secondWasteDonation">
          <div className="wastedonationImage">
            <div className="wastedonationCircularImage">
              <Image src={circularImage} alt="Thank You" />
            </div>
            <div className="rectangle-270-block2">
              <div>
                <p>Thank you For Donation</p>
                <p>Name:</p>
                <p>Name:</p>
                <p>Name:</p>
                <p>Name:</p>
                <div>
                  <Image src={qrCodeImage} alt="QR Code" />
                  <p className="kabadiDonation">KabadiTechno pvt. ltd.</p>
                  <p className="paraDonation">Donation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="donationHeading">
            <p>
              "Donating for waste management transforms trash into treasure,
              creating a cleaner, greener future for all."
            </p>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default WasteDonation;
