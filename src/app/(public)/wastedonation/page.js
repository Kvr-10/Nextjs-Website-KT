'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import '@/app/styles/WasteDonation.css';



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
            src="/Images/image1.png"
            alt="Donation background"
            width={1600} height={100}
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
              <Image src="/Images/image 20.png" alt="Thank You" width={500} height={500} />
            </div>
            <div className="rectangle-270-block2">
              <div>
                <p>Thank you For Donation</p>
                <p>Name:</p>
                <p>Name:</p>
                <p>Name:</p>
                <p>Name:</p>
                <div>
                  <Image src="/Images/qrCode.png" alt="QR Code" width={100} height={100}/>
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
