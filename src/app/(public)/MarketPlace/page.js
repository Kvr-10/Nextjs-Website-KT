'use client';

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// CSS
import "@/app/styles/SellItem.css";
import "@/app/styles/App.css";

// Components
import UserProfileSearchbar from "@/components/UserProfileSearchbar";
import ChangePincode from "@/components/ChangePincode";
import MarketPlaceCard from "@/components/SellItemPage/MarketPlaceCard";
import DealerContactCard from "@/components/SellItemPage/DealerContactCard";

// MUI
import { Button, Menu, MenuItem } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';

// API
import { apiUrl } from "@/lib/Private";

const MarketPlace = () => {
  const [mounted, setMounted] = useState(false);
  const [pincodeData, setPincodeData] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [modalPincode, setModalPincode] = useState("");
  const [sellItemData, setSellItemData] = useState([]);
  const [dealerContactData, setDealerContactData] = useState([]);
  const [dealersOfficial, setDealersOfficial] = useState([]);
  const [sellItemName, setSellItemName] = useState("all");
  const [pincode, setPincode] = useState("201001");
  const [apiKey, setApiKey] = useState(null);
  const [gAuth, setGAuth] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Wait for client hydration
  useEffect(() => {
    setApiKey(localStorage.getItem("KTMauth"));
    setGAuth(localStorage.getItem("KTMgauth"));
    const storedPincode = localStorage.getItem("KTMpincode") || "201001";
    const storedCategory = localStorage.getItem("KTMsellItemName") || "all";
    setPincode(storedPincode);
    setSellItemName(storedCategory);
    setMounted(true);
  }, []);

  // Scroll to top
  useEffect(() => {
    if (mounted) window.scrollTo(0, 0);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    axios.get(`${apiUrl}/dealer_details/search-subcategory/${pincode}/`)
      .then((res) => setSellItemData(res.data))
      .catch((err) => {
        if (err.response?.status === 302) {
          const data = err.response.data;
          setSellItemData(
            sellItemName === "all" ? data : data.filter(item => item.category_name === sellItemName)
          );
        }
      });
  }, [mounted, pincode, sellItemName]);

  useEffect(() => {
    if (!mounted) return;
    axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        const postOffice = res.data[0]?.PostOffice;
        if (!postOffice) {
          Swal.fire({ title: "Enter valid pincode", confirmButtonColor: "#56b124" });
        } else {
          setPincodeData(res.data);
        }
      })
      .catch(console.error);
  }, [mounted, pincode]);

  useEffect(() => {
    if (!mounted) return;
    axios.get(`${apiUrl}/dealer/api/getdealers/${pincode}`)
      .then((res) => setDealerContactData(res.data.data.dealers))
      .catch(console.error);
  }, [mounted, pincode, sellItemName]);

  useEffect(() => {
    const dealers = new Set();
    sellItemData.forEach((item) => {
      if (item.dealer) dealers.add(item.dealer);
    });
    setDealersOfficial([...dealers]);
  }, [sellItemData]);

  const openModal = () => setIsOpen(true);

  const changePincode = () => {
    if (modalPincode !== "") {
      axios.get(`https://api.postalpincode.in/pincode/${modalPincode}`)
        .then((res) => {
          if (res.data[0].Status === "Success") {
            localStorage.setItem("KTMpincode", modalPincode);
            setPincode(modalPincode);
            setModalPincode("");
            setIsOpen(false);
          } else {
            Swal.fire({ title: "Invalid pincode", confirmButtonColor: "#56b124" });
            setModalPincode("");
            setIsOpen(false);
          }
        })
        .catch(console.error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filter = (category) => {
    const lower = category.toLowerCase();
    localStorage.setItem("KTMsellItemName", lower);
    setSellItemName(lower);
    setAnchorEl(null);
  };

  if (!mounted) return null;

  return (
    <>
      {(apiKey || gAuth) && <UserProfileSearchbar />}

      <div className="sell__item__section">
        <div className="sell__item__header">
          <h1>
            {sellItemData.length > 0 && sellItemData[0]?.id
              ? `${sellItemName[0].toUpperCase()}${sellItemName.slice(1)} Category`
              : dealerContactData.length
              ? "Dealer Contact Details"
              : "No Service"}
          </h1>

          <ChangePincode openModal={openModal} pincode={pincode} />

          {pincodeData && (
            <div className="sell__item__area">
              <p>
                Selected area:{" "}
                <span>
                  {`${pincodeData[0].PostOffice[0].Block}, ${pincodeData[0].PostOffice[0].District}, ${pincodeData[0].PostOffice[0].State} - ${pincodeData[0].PostOffice[0].Pincode}`}
                </span>
              </p>
            </div>
          )}

          <div className="filter">
            <Button onClick={handleClick}>
              Filter <TuneIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              {["all", "paper", "glass", "plastic", "metal", "e-waste", "other"].map((item) => (
                <MenuItem key={item} onClick={() => filter(item)}>
                  {item[0].toUpperCase() + item.slice(1)}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {sellItemData.length > 0 && sellItemData[0]?.id ? (
          <div className="sell__item">
            {dealersOfficial.map((dealer, idx) => (
              <MarketPlaceCard key={idx} dealer_id={dealer} />
            ))}
          </div>
        ) : dealerContactData.length > 0 ? (
          <div className="dealer__contact__section">
            {dealerContactData.map((item) => (
              <DealerContactCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="no__service">
            This service is not available in your area.
            <br />
            <span style={{ color: "#56b124", fontWeight: "bold" }}>
              It will be coming soon.
            </span>
          </p>
        )}

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Change area pincode</h1>
          <input
            type="text"
            placeholder="Pincode"
            value={modalPincode}
            onChange={(e) => setModalPincode(e.target.value)}
          />
          <div>
            <button onClick={changePincode}>Done</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MarketPlace;
