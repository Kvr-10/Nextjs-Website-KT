'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Tooltip } from 'react-tooltip'; // Correct usage
import 'react-tooltip/dist/react-tooltip.css';

import '../app/styles/Navbar.css';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem("KTMauth") : null;

  const navLinks = [
    { href: '/', label: 'ABOUT' },
    { href: '/join-us', label: 'JOIN US' },
    { href: '/sell', label: 'SELL' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/sign-in', label: 'SIGN IN' },
  ];

  return (
    <div className="navbar">
      <div>
        <Link href="/" className="logo">
          <Image src="/Image/kabadi__techno__logo.png" alt="Kabadi Techno" width={120} height={40} />
        </Link>

        <ul className={isOpen ? "navlist navlist__active" : "navlist"}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`navlink ${pathname === href ? 'active__navlink' : ''}`}
                onClick={() => setIsOpen(false)}
                data-tooltip-id={label === 'SIGN IN' && apiKey ? 'signedin-tip' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
          {apiKey && (
            <Tooltip
              id="signedin-tip"
              content="You are Signed In"
              place="bottom"
              style={{ backgroundColor: "#44aa0e", color: "#fff" }}
            />
          )}
        </ul>

        <div className="menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
