'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import '../../app/styles/Footer.css';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import TermFooter from './TermFooter'; // ✅ Import TermFooter

const MainFooter = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="main__footer">
        {/* Link section */}
        <div className="link__section">
          {/* About us links */}
          <ul>
            <h1 className="footer__header">ABOUT US</h1>
            <li><Link href="/#ourvision" className="footer__link">Our Vision</Link></li>
            <li><Link href="/#ourmission" className="footer__link">Our Mission</Link></li>
            <li><Link href="/#ourteam" className="footer__link">Our Team</Link></li>
            <li><Link href="/#whatwedo" className="footer__link">What We do?</Link></li>
          </ul>

          {/* Important links */}
          <ul>
            <h1 className="footer__header">IMPORTANT LINKS</h1>
            <li><Link href="/sell#sellyourscrap" className="footer__link">Sell Your Scrap</Link></li>
            <li><Link href="/join-us#joinourteam" className="footer__link">Join Our Team</Link></li>
            <li><Link href="/termsconditions" className="footer__link">Terms & Conditions</Link></li>
            <li><Link href="/privacypolicy" className="footer__link">Privacy Policy</Link></li>
          </ul>

          {/* Contact us */}
          <ul>
            <h1 className="footer__header">CONTACT US</h1>
            <li>
              <p className="footer__link">
                <LocationOnIcon className="footer__link__icon" />
                16, South Arjun Nagar Agra
              </p>
            </li>
            <li>
              <p className="footer__link">
                <EmailIcon className="footer__link__icon" />
                Info@kabaditechno.com
              </p>
            </li>
            <li>
              <p className="footer__link">
                <PhoneIcon className="footer__link__icon" />
                +91 7503386621
                <br />
                +91 9773857717
              </p>
            </li>
          </ul>
        </div>

        {/* Social section */}
        <div className="social__section">
          <h1 className="footer__header">CONNECT WITH US</h1>
          <div className="social__link">
            <a href="https://www.facebook.com/kabaditechno/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="social__link__icon" />
            </a>
            <a href="https://www.instagram.com/kabaditechno/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="social__link__icon" />
            </a>
            <a href="https://www.linkedin.com/company/kabadi-techno" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="social__link__icon" />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Add TermFooter below main footer */}
      <TermFooter />
    </>
  );
};

export default MainFooter;
