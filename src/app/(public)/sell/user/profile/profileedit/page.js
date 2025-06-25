'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

// components
import Navbar from "@/components/Navbar";
import UserProfileSearchbar from "@/components/UserProfileSearchbar";
import UserProfileNavbar from "@/components/User/UserProfileNavbar";
import MainFooter from "@/components/Footer/MainFooter";
import TermFooter from "@/components/Footer/TermFooter";

// css
import "@/app/styles/UserDealerProfileEdit.css";
import "@/app/styles/App.css";

// image
const defaultProfileImg = "/Image/customer__profile__img.PNG";

// api
import { apiUrl } from "@/lib/Private";

const UserProfileEdit = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({ ProfilePic: defaultProfileImg });
  const [uploadedImage, setUploadedImage] = useState({ photo: defaultProfileImg });

  const apiKey = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("KTMauth")) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    axios
      .get(`${apiUrl}/v3/api/view-profile/customer/${apiKey.id}/`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getInputValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Cid", apiKey.id);
      data.append("mobile_number", userData.mobile_number);
      data.append("account_type", apiKey.account_type);
      data.append("account_category", apiKey.account_category);

      await fetch(`${apiUrl}/v3/api/update-attrs/customer/`, {
        method: "POST",
        body: data,
      });

      Swal.fire({
        title: "Profile Updated",
        confirmButtonColor: "#56b124",
      });

      router.push("/sell/user/profile");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Profile not updated",
        confirmButtonColor: "#56b124",
      });
    }
  };

  const updatePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadedImage({ ...uploadedImage, [e.target.name]: reader.result });
      }
    };
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append("ProfilePic", file);

    fetch(`${apiUrl}/v3/api/update-profilepic/customer/${apiKey.id}/`, {
      method: "POST",
      body: data,
    });

    Swal.fire({
      title: "Profile Pic changed successfully",
      confirmButtonColor: "#56b124",
    });
  };

  return (
    <>
      <Navbar />
      <UserProfileSearchbar />
      <UserProfileNavbar />

      {userData && (
        <div className="user__dealer__profile__edit similar__section">
          <h1 className="similar__section__heading">Edit your profile</h1>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="photo"
            name="photo"
            onChange={updatePhoto}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
          <label htmlFor="photo" className="change__pic__label">
            Select Profile Pic
          </label>

          <form onSubmit={updateUserProfile}>
            <input
              type="text"
              placeholder="Name"
              value={userData.username}
              name="username"
              onChange={getInputValue}
              disabled
            />
            <input
              type="email"
              placeholder="Email ID"
              disabled
              value={userData.email}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={userData.mobile_number}
              name="mobile_number"
              onChange={getInputValue}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <MainFooter />
      <TermFooter />
    </>
  );
};

export default UserProfileEdit;
