'use client';

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// styles
import "@/app/styles/SellItem.css";
import "@/app/styles/App.css";
import "@/app/styles/MarketPlaceRishita.css";

// components
import Navbar from "@/components/Navbar";
import UserProfileSearchbar from "@/components/UserProfileSearchbar";
import ChangePincode from "@/components/ChangePincode";
import MarketPlaceSellCard from "@/components/MarketPlace/MarketPlaceSellCard";
import DealerContactCard from "@/components/SellItemPage/DealerContactCard";
import MainFooter from "@/components/Footer/MainFooter";
import TermFooter from "@/components/Footer/TermFooter";

// mui
import { Button, Menu, MenuItem } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

// api
import { apiUrl } from "@/lib/Private";

const MarketPlaceSell = ({ params }) => {
  const { id: ktid } = params;

  const [pincodeData, setPincodeData] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [modalPincode, setModalPincode] = useState("");
  const [sellItemData, setSellItemData] = useState([]);
  const [dealerContactData, setDealerContactData] = useState([]);

  const [dealerid, setDealerid] = useState(0);
  const [pincodeDataDealer, setPincodeDataDealer] = useState([]);
  const [sellItemName, setSellItemName] = useState("all");
  const [pincode, setPincode] = useState("201001");

  const apiKey = typeof window !== "undefined" ? localStorage.getItem("KTMauth") : null;
  const gAuth = typeof window !== "undefined" ? localStorage.getItem("KTMgauth") : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/marketplace/get-marketplace/${ktid}/`)
      .then((res) => {
        if (res.data?.length) {
          const id = res.data[0].dealer_id;
          setDealerid(id);
          localStorage.setItem("dealer_id", id);

          axios.get(`${apiUrl}/dealer_details/get_all_pincodes/${id}/`)
            .then((res) => {
              const temp = [
                res.data["Pincode 1"],
                res.data["Pincode 2"],
                res.data["Pincode 3"],
                res.data["Pincode 4"],
                res.data["Pincode 5"],
              ].filter(Boolean);
              setPincodeDataDealer(temp);
            }).catch(console.log);
        }
      }).catch(console.log);
  }, [ktid]);

  const nextStep = (pin) => {
    setModalPincode(pin);
    setPincode(pin);
    axios.get(`${apiUrl}/dealer_details/get-price/${dealerid}/`)
      .then((res) => setSellItemData(res.data))
      .catch(console.log);
    setIsOpen(false);
  };

  useEffect(() => {
    axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => setPincodeData(res.data))
      .catch(console.log);
  }, [pincode]);

  const changePincode = () => {
    if (modalPincode !== "") {
      axios.get(`https://api.postalpincode.in/pincode/${modalPincode}`)
        .then((res) => {
          if (res.data[0].Status === "Success") {
            localStorage.setItem("KTMpincode", modalPincode);
            setModalPincode("");
            setIsOpen(false);
          } else {
            setModalPincode("");
            setIsOpen(false);
            Swal.fire({
              title: "Invalid pincode",
              confirmButtonColor: "#56b124",
            });
          }
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    axios.get(`${apiUrl}/dealer/api/getdealers/${pincode}`)
      .then((res) => {
        if (res.status === 200) {
          setDealerContactData(res.data.data?.dealers || []);
        }
      }).catch(console.log);
  }, [pincode, sellItemName]);

  // ---------- filter menu ----------
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filter = (category) => {
    localStorage.setItem("KTMsellItemName", category.toLowerCase());
    setSellItemName(category.toLowerCase());
    setAnchorEl(null);
  };
  // ---------------------------------

  return (
    <>
      <Navbar />
      {apiKey || gAuth ? <UserProfileSearchbar /> : null}

      <div className="sell__item__section">
        <div className="sell__item__header">
          {sellItemData.length > 0 && sellItemData[0].id > 0 ? (
            <h1>{sellItemName.charAt(0).toUpperCase() + sellItemName.slice(1)} Category</h1>
          ) : dealerContactData.length ? (
            <h1>Dealer Contact Details</h1>
          ) : (
            <h1>No Service</h1>
          )}

          <ChangePincode openModal={() => setIsOpen(true)} pincode={pincode} />

          {pincodeData && (
            <div className="sell__item__area">
              <p>
                Selected area:
                <span>
                  {pincodeData[0].PostOffice[0].Block},{" "}
                  {pincodeData[0].PostOffice[0].District},{" "}
                  {pincodeData[0].PostOffice[0].State} -{" "}
                  {pincodeData[0].PostOffice[0].Pincode}
                </span>
              </p>
            </div>
          )}

          <div className="filter">
            <Button onClick={handleClick}>
              Filter <TuneIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              {["All", "Paper", "Glass", "Plastic", "Metal", "E-waste", "Other"].map(cat => (
                <MenuItem key={cat} onClick={() => filter(cat)}>{cat}</MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {sellItemData.length && sellItemData[0].id > 0 ? (
          <div className="sell__item">
            {sellItemData.map((item, index) =>
              item.pincode === pincode && (
                <MarketPlaceSellCard
                  key={index}
                  img={item.subcategory_img}
                  name={item.subcategory_name}
                  price={item.price}
                />
              )
            )}
          </div>
        ) : dealerContactData.length ? (
          <div className="dealer__contact__section">
            {dealerContactData.map((dealer) => (
              <DealerContactCard
                key={dealer.id}
                dealerId={dealer.id}
                Name={dealer.name}
                Contact={dealer.mobile}
                Dealing={dealer.dealing_in}
                Minimum={dealer.min_qty}
                Maximum={dealer.qty}
              />
            ))}
          </div>
        ) : (
          <p className="no__service">
            This service is not available in your area.<br />
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
          <h1>Select your pincode</h1>
          {pincodeDataDealer.map((pin, idx) => (
            <button key={idx} className="pin__btns" onClick={() => nextStep(pin)}>{pin}</button>
          ))}
        </Modal>
      </div>

      <MainFooter />
      <TermFooter />
    </>
  );
};

export default MarketPlaceSell;
