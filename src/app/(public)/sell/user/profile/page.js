'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// components

import UserProfileSearchbar from "@/components/UserProfileSearchbar";
import UserProfileNavbar from "@/components/User/UserProfileNavbar";
import MainFooter from "@/components/Footer/MainFooter";
import TermFooter from "@/components/Footer/TermFooter";

// styles
import "@/app/styles/UserDealerProfile.css";
import "@/app/styles/App.css";

// image fallback
const defaultProfileImage = "/Image/customer__profile__img.PNG";

// api
import { apiUrl } from "@/lib/Private";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    ProfilePic: defaultProfileImage,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const apiKey = JSON.parse(localStorage.getItem("KTMauth"));
    const profileUrl = `${apiUrl}/v3/api/view-profile/customer/${apiKey?.tokens?.refresh}`;

    axios
      .get(profileUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${apiKey?.tokens?.refresh}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <UserProfileSearchbar />
      <UserProfileNavbar />

      {userData && (
        <div className="user__dealer__profile">
          <div className="left__side">
            <img src={userData.ProfilePic || defaultProfileImage} alt="Profile" />
            <Link href="/sell/user/profile/profileedit" className="user__dealer__profile__edit__link">
              Edit
            </Link>
          </div>
          <div className="right__side">
            <p>Email ID: <span>{userData.email}</span></p>
            <p>Mobile Number: <span>{userData.mobile_number}</span></p>
            <p>Account Type: <span>{userData.account_type}</span></p>
            <p>
              Address:{" "}
              <Link href="/sell/user/address" className="view__address">
                View your address
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
