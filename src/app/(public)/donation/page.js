'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import '@/app/styles/Donation.css';


const Donation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
  
      <div className="donationMainConatiner">
        <div className="firstHeadingOfDonation">
          <Image
            className="donationBackgoundImage"
            src="/Images/image1.png"
            alt="Background"
            width={500} height={300}
          />
          <div className="headingDonation">
            <div></div>
            <div className="supportFuture">
              <h1>Support a Cleaner Future</h1>
              <p>Donate to Waste Management Initiatives Today!</p>
            </div>
          </div>
        </div>

        <div className="donation">
          <div>
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name.." />

              <label htmlFor="number">Phone Number</label>
              <input type="number" id="number" name="Phone Number" placeholder="Phone Number" />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email" />

              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" name="amount" placeholder="Amount" />

              <label htmlFor="payment">Choose your Payment</label>
              <div className="secure">
                <p>Secure</p>
              </div>
              <div className="payment">
                <div>
                  <Image src="/Images/gpay.png" alt="Google Pay" width={500} height={100}/>
                  <p>Google Pay</p>
                </div>
                <div>
                  <Image src="/Images/phnpe.png" alt="Phonepe" width={500} height={100} />
                  <p>Phonepe</p>
                </div>
                <div>
                  <Image src="/Images/Upi.png" alt="Other UPI" width={500} height={100}/>
                  <p>Other UPI</p>
                </div>
                <div>
                  <Image src="/Images/credit.png" alt="Credit Card" width={500} height={100}/>
                  <p>Credit/Debit Card</p>
                </div>
              </div>
            </form>
          </div>

          <div className="donationImage">
            <div className="donationCircularImage">
              <Image src="/Images/image 20.png" alt="Donation Info" width={500} height={500} />
            </div>
            <div className="rectangle-270">
              <p>
                By donating to our cause, you directly contribute to vital projects that address
                waste reduction, recycling, education, and community engagement. Together, we can
                tackle the pressing challenges of waste management and build a brighter future for
                generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Donation;
