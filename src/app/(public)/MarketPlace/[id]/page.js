'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/skyblue";

import Button from "@mui/material/Button";
import { Paper, TextField } from "@mui/material";

// Components
import Nav from "@/components/Navbar";
import MainFooter from "@/components/Footer/MainFooter";
import TermFooter from "@/components/Footer/TermFooter";

// Assets and Styles
import "@/app/styles/MarketPlaceNew.css";
import recycle from "@/public/Images/image2.png";
import plastic from "@/public/Images/plastic.png";
import metal from "@/public/Images/metal.png";
import image6 from "@/public/Images/image6.png";
import image7 from "@/public/Images/image7.png";
import image8 from "@/public/Images/image8.png";
import image10 from "@/public/Images/IMAGE10.png";
import image11 from "@/public/Images/IMAGE11.png";
import image12 from "@/public/Images/IMAGE12.png";
import image13 from "@/public/Images/IMAGE13.png";

import { apiUrl } from "@/lib/config";

const MarketPlaceNew = () => {
  const params = useParams();
  const dealer_id = params?.num?.[4];

  const [dealer, setDealer] = useState(null);
  const [pincodes, setPincode] = useState([]);
  const [userpincode, setUserPincode] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Get dealer info
  useEffect(() => {
    if (!dealer_id) return;
    axios
      .get(`${apiUrl}/v3/api/dealer-data/${dealer_id}`)
      .then((res) => {
        setDealer(res.data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, [dealer_id]);

  // Get dealer pincodes
  useEffect(() => {
    if (!dealer_id) return;
    axios
      .get(`${apiUrl}/dealer_details/get_all_pincodes/${dealer_id}/`)
      .then((res) => {
        delete res.data.dealer_id;
        setPincode(Object.values(res.data));
      })
      .catch(() => setPincode([]));
  }, [dealer_id]);

  // Handle pincode selection
  useEffect(() => {
    if (!dealer_id) return;
    axios
      .get(`${apiUrl}/dealer_details/get-price/${dealer_id}/`)
      .then((res) => {
        if (userpincode) {
          setProductItem(res.data.filter((item) => item.pincode === userpincode));
        } else {
          setProductItem(res.data);
        }
      })
      .catch(console.error);
  }, [userpincode, dealer_id]);

  if (error) return <div>Error loading dealer information.</div>;
  if (loading || !dealer) return <div>Loading...</div>;
  if (!dealer.is_active) return <div>This dealer is inactive.</div>;

  return (
    <div className="market_place">
      <div className="marketplace__page1">
        <Nav />
        <div className="hero__section__">
          <div className="mp_container__Hero__section__page1">
            <div className="mp_leftsection__Hero__section__">
              <div className="mp_rightsection__Hero__section__page1">
                <h1 className="mp_heading__Hero__section__">Hello,</h1>
                <h1 className="mp_heading__Hero__section__">
                  I am {dealer.username.charAt(0).toUpperCase() + dealer.username.slice(1)}
                </h1>
                <blockquote className="mp_quote__Hero__section__">
                  “Don’t Waste the Waste”
                </blockquote>
                <br />
                <button className="mp_btn__Hero__section__">Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="area__section__ area__section__page1">
        <div className="container_area__section__ container_area__section__page1">
          <div className="firstContainer_container_area__section__">
            <div className="inner_firstContainer_container_area__section__">
              <div className="innerContainerImage">
                <img src={recycle.src} alt="Dustbin Image" />
              </div>
              <div className="inner_firstContainer_selectArea">
                <div className="heading_inner_firstContainer">
                  <h1 className="selectArea_Heading">Select Your Area</h1>
                  <div className="underline_Block_selectarea__">
                    <div className="underline" />
                  </div>
                </div>
                <div className="third_box_selectArea">
                  <div className="outerButton">
                    <div className="innerButton">
                      <select
                        name="SelectPincode"
                        id="SelectPincode"
                        className="select_Pincode"
                        onChange={(e) => setUserPincode(e.target.value)}
                      >
                        <option value="">Pincodes</option>
                        {pincodes.map((pin) => (
                          <option key={pin} value={pin}>{pin}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="priceVary__">*price may vary according to areas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ourRange_container_area__section__">
            <h1 className="heading_ourRange_Container">Our Range</h1>
            <div className="verticle_line__" />
            <p className="ourRange_para">
              The team from Kabadiwala Online arrived promptly at the scheduled
              time. They were friendly, professional, and handled the pickup
              with great care.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MarketPlaceNew;
