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


import { apiUrl } from "@/lib/Private";

// product
const product = [
  {
    image: '/Images/plastic.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/metal.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/plastic.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/metal.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/plastic.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/metal.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/plastic.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/metal.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/plastic.png',
    rupees: "Rs. 10/kg",
  },
  {
    image: '/Images/metal.png',
    rupees: "Rs. 10/kg",
  },
];

// review

const values = [
  {
    number: "41+",
    about: "HAPPY CUSTOMERS",
    class: "happy",
  },
  {
    number: "20 %",
    about: "CUSTOMERS SATISFACTION",
    class: " satisfaction",
  },
  {
    number: "2,080 Kg",
    about: "TOTAL SCRAP RECYCLED",
    class: "scrap",
  },
  {
    number: "2 +",
    about: "YEARS OF BUSINESS",
    class: "year",
  },
];

// initiative
const steps = [
  {
    image: 'Image/tetra-pak_initiative.png',
    heading: "Tetra Pak Initiative",
    para: "The Kabadiwala collaborated with TetraPak India (World’s Leading Beverage Carton Manufacturer) to increase the collection of used beverage cartons (UBC’s) for recycling and diverting them from landfills.",
  },
  {
    image: 'Image/mattress_circular_journey.png',
    heading: "Mattress Circular Journey",
    para: "ISPF, IPUA and The Kabadiwala came together to initiate India’s first mattress recycling campaign which is named as ‘Feko Nahi Recycle Karo’. The objective is to encourage the community to practise sustainable disposal of Mattress.",
  },
  {
    image: 'Image/tree_plantation.png',
    heading: "Tree Plantation Initiative",
    para: "Since the last two years, The Kabadiwala has been following a tradition of planting trees on the occasion of Mahatma Gandhi's Birthday. In which, our customers also take part in our mission to turn Bhopal greener.",
  },
  {
    image: 'Image/kitab_ghar.png',
    heading: "Kitab Ghar",
    para: "Kitab Ghar initiative is a combined effort of The Kabadiwala & Bhopal Municipal Corporation that aims at providing second hand books to the underprivileged children by acquiring them from the people who no longer need them.",
  },
];

 const MarketPlaceNew = () => {

 const { id } = useParams();
const dealer_id = id;

  const [pincodes, setPincode] = useState([]); //Dealer pincodes
  const [userpincode, setUserPincode] = useState(""); //Selected by user
  const [productItem, setProductItem] = useState([]); //product item

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dealer, setDealer] = useState([]); //dealer data

  const [rating, setRating] = useState(""); //Rating
  const [ratingReview, setratingReview] = useState(""); //feedback cmnt
  const [initiative, setInitiative] = useState([]); //initiative array
  const [contactValue, setcontactValue] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  }); //contact form//

  // *****************UserName of Dealer***********//
  useEffect(() => {
    axios
       .get(`${apiUrl}/v3/api/dealer-data/${dealer_id}`)
      .then((response) => {
        setLoading(true);
        setDealer(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true)
      });
  }, [dealer_id]);


  /*----------------------PINCODES---------------------------*/
  useEffect(() => {
    axios
      .get(
        `${apiUrl}/dealer_details/get_all_pincodes/${dealer_id}/`
      )
      .then((response) => {
        delete response.data.dealer_id;
        setPincode(Object.values(response.data));
      })
      .catch((err) => {
        setPincode([]);
        console.log(err);
      });
  }, [dealer_id]);

  /*----------------AREA PINCODE SELECTION (PRODUCT ITEM)--------------------*/
  const getPincodeValue = (e) => {
    setUserPincode(e.target.value);
  };

  useEffect(() => {
    axios
       .get(`${apiUrl}/dealer_details/get-price/${dealer_id}/`)
      .then((response) => {
        console.log(response.data.filter((list) => list.pincode === userpincode))
        if (userpincode !== "") {
          setProductItem(
            response.data.filter((list) => list.pincode === userpincode)
          );
        } else {
          setProductItem(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userpincode, dealer_id]);

  const [requestValue, setRequestValue] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    stateCountry: "",
    address: "",
    dateTime: "",
  }); //request array

    /*----------------------REQUEST FORM------------------------- */
  // input value
  const requestInputForm = (e) => {
    setRequestValue({ ...requestValue, [e.target.name]: e.target.value });
  };

  // After submitting the request form
  const requestForm = async (e) => {
    e.preventDefault();
    try{
      if (
        requestValue.name !== "" &&
        requestValue.email !== "" &&
        requestValue.phone.length >= 10  &&
        requestValue.pincode.length == 6 &&
        requestValue.stateCountry !== "" &&  
        requestValue.address !== ""
      )  {
        
        const requestUrl = `${apiUrl}/api3/schedule_pickup/schedule_pickup/`;

        const data = new FormData();

        // ---------------Dealer Details-------------------------//
        data.append("dealer_id", dealer_id);
        data.append("dealer_account_type", dealer["account_type"]);
        data.append("deale_name", dealer["username"]);

        // -----------date and time(dummy value)-------

        data.append("select_date", "2023-12-18");
        data.append("select_time", "19:10:00");

        // ----------------Form Details------------------------//
        data.append("name", requestValue.name);
        data.append("email", requestValue.email);
        data.append("phone_number", requestValue.phone);
        data.append("pincode", requestValue.pincode);
        data.append("state_n_country", requestValue.stateCountry);
        data.append("address", requestValue.address);

        const headers = { "Content-Type": "application/json" };
        await axios.post(requestUrl, data, headers);

        setRequestValue({
          name: "",
          email: "",
          phone: "",
          pincode: "",
          stateCountry: "",
          address: "",
          dateTime: "",
        });

        Swal.fire({
          title: "We recieved your message.\n Thank You!",
          confirmButtonColor: "#56b124",
        });
      } 
      else {
        Swal.fire({
          title: "Please fill the form correctly!",
          confirmButtonColor: "#56b124",
        });
      }
    }
     catch (err) {
      Swal.fire({
        title: "Can't schedule your request! Sorry for inconvenience",
        confirmButtonColor: "#56b124",
      });
    }
  };

   /*-------------------- RATING --------------------------- */
   const feedbackValue = (e) => {
    console.log(e.target.value);
    setratingReview(e.target.value);
  };
  const ratingValue = (e) => {
    setRating(e.target.value * 1);
  };
  const feedbackForm = async (e) => {
    try {
      if (rating !== "") {
        const data = new FormData();
        // ---------------Dealer Details-------------------------//
        data.append("dealer_id", dealer_id);
        data.append("dealer_account_type", dealer["account_type"]);
        data.append("deale_name", dealer["username"]);

        // ----------------Rating-------------------------//
        data.append("rating", rating);
        if (ratingReview === "") {
          data.append("rate_count", "N/A");
        } else {
          data.append("rate_count", ratingReview);
        }
        const headers = { "Content-Type": "application/json" };
        await axios.post(
          `${apiUrl}/api3/dealer_rating/dealer_rating/`,
          data,
          headers
        );

        setRating("");
        setratingReview("");

        Swal.fire({
          title: "ThankYou For Your Feedback",
          confirmButtonColor: "#56b124",
        });
      } else {
        Swal.fire({
          title: "Please Write us Review",
          confirmButtonColor: "#56b124",
        });
      }
    } catch (error) {
      console.log("Error Occcured");
      Swal.fire({
        title: "Sorry Please Try again",
        confirmButtonColor: "#56b124",
      });
    }
  };

  /*------------------- INITIATIVE----------------------------*/
  useEffect(() => {
    axios
      .get(`${apiUrl}/api3/dealer_initiatives/dealer_initiatives/`)
      .then((response) => {
        setInitiative(
          response.data.filter((initiative) => initiative.dealer_id === dealer_id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dealer_id]);

  /*--------------------- CONTACT US --------------------*/
  // get input value
  const getInputValue = (e) => {
    setcontactValue({ ...contactValue, [e.target.name]: e.target.value });
  };

  // After submitting the contact form
  const contactUs = async (e) => {
    e.preventDefault();

    try {
      if (
        contactValue.phone.length >= 10 &&
        contactValue.name !== "" &&
        contactValue.email !== "" &&
        contactValue.message !== "" 
        )  {
        const contactUrl = `${apiUrl}/api3/reach_us/reach_us/`;
        const data = new FormData();

        // ---------------Dealer Details-------------------------//
        data.append("dealer_id", dealer_id);
        data.append("dealer_account_type", dealer["account_type"]);
        data.append("deale_name", dealer["username"]);
        data.append("subject", "N/A");

        // ----------------Form Details------------------------//
        data.append("name", contactValue.name);
        data.append("email", contactValue.email);
        data.append("phone_number", contactValue.phone);
        data.append("message", contactValue.message);

        const headers = { "Content-Type": "application/json" };
        await axios.post(contactUrl, data, headers);

        setcontactValue({ name: "", email: "", phone: "", message: "" });
        Swal.fire({
          title: "We recieved your message.\n Thank You!",
          confirmButtonColor: "#56b124",
        });
      }
      else
      {
        Swal.fire({
          title: "Please fill the valid Entry",
          confirmButtonColor: "#56b124",
        });
      }
    } catch (err) {
      console.log("error Occured");
      Swal.fire({
        title: "Sorry please try again",
        confirmButtonColor: "#56b124",
      });
    }
  };

  return (
    <>
    {!error ? (
        <>
          {!loading ? (
            <>
              {dealer.is_active ? (

    <div className="market_place">
      <div className="marketplace__page1">
        {/* NAVBAR */}
        <Nav />

        {/* HERO SECTION */}
        <div className="hero__section__">
          <div className="mp_container__Hero__section__page1">
            <div className="mp_leftsection__Hero__section__">
              <div className="mp_rightsection__Hero__section__page1">
                <h1 className="mp_heading__Hero__section__">Hello,</h1>

                <h1 className="mp_heading__Hero__section__">
                  I am {dealer.username.charAt(0).toUpperCase() + dealer.username.slice(1).toLowerCase()}
                </h1>
                <quote className="mp_quote__Hero__section__">
                  “Don’t Waste the Waste”
                </quote>
                <br />
                <button className="mp_btn__Hero__section__">Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*AREA SECTION*/}
      <div className="area__section__ area__section__page1">
        <div className="container_area__section__ container_area__section__page1">
          <div className="firstContainer_container_area__section__">
            <div className="inner_firstContainer_container_area__section__">
              <div className="innerContainerImage">
                <img src={recycle} alt="Dustbin Image" />
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
                                    onChange={getPincodeValue}
                                  >
                                    <option value="">Pincodes</option>
                                    {pincodes.map((btn) => {
                                      return <option value={btn}>{btn}</option>;
                                    })}
                                  </select>
                    </div>
                  </div>
                  <p className="priceVary__">
                    *price may vary according to areas
                  </p>
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

      {/* PRODUCT SECTION */}
      <div className="mp_sell">
        <div className="mp_products">
          {productItem.map((list) => {
            return (
              <div className="mp_sell_container">
                <img src={list.subcategory_image} />
                {/* <img src={plastic} /> */}
                <p>Rs. {list.price}/Kg</p>
                <a href="">Add to cart</a>
              </div>
            );
          })}
        </div>
      </div>

      {/*REQUEST FORM */}
      <div className="mp_schedule">
        <div className="mp_image">
          <img className="mp_image3" src={image3} />
          <img className="mp_image4" src={image4} />
        </div>
        <div className="mp_heading">
          <svg
            className="mp_scheduleSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="50" fill="#E17F0B" />
          </svg>
          <h1>Schedule Your Request</h1>
        </div>
        <div className="mp_main_hero_schedule_section">
          <div className="mp_main_schedule">
            <div className="mp_left_schedule">
              <img src={aman2} />
            </div>
            <div className="mp_right_schedule">
            <form
                            className="mp_right_schedule_form"
                            onSubmit={requestForm}
                          >
                            <TextField
                              aria-required="true"
                              type="text"
                              className="mp_right_schedule_form_tf"
                              id="outlined-basic"
                              label="Name"
                              variant="outlined"
                              name="name"
                              value={requestValue.name}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf mp_half_width"
                              aria-required="true"
                              id="outlined-basic"
                              label="Phone Number"
                              variant="outlined"
                              type="Number"
                              name="phone"
                              value={requestValue.phone}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf mp_half_width"
                              aria-required="true"
                              id="outlined-basic"
                              label="Email"
                              type="email"
                              variant="outlined"
                              name="email"
                              value={requestValue.email}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf mp_half_width"
                              aria-required="true"
                              id="outlined-basic"
                              label="Pincode"
                              variant="outlined"
                              type="Number"
                              name="pincode"
                              value={requestValue.pincode}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf mp_half_width"
                              aria-required="true"
                              id="outlined-basic"
                              label="State and Country"
                              variant="outlined"
                              type="text"
                              name="stateCountry"
                              value={requestValue.stateCountry}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf"
                              aria-required="true"
                              id="outlined-basic"
                              label="Complete Address"
                              variant="outlined"
                              type="text"
                              name="address"
                              value={requestValue.address}
                              onChange={requestInputForm}
                            />
                            <TextField
                              className="mp_right_schedule_form_tf mp_half_width"
                              id="outlined-basic"
                              variant="outlined"
                              type="datetime-local"
                              name="dateTime"
                              value={requestValue.dateTime}
                              onChange={requestInputForm}
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              color="success"
                              className="mp_half_width_btn mp_half_width "
                            >
                              Submit
                            </Button>
                          </form>
            </div>
          </div>
        </div>
      </div>

      {/*REVIEW OR RATING SECTION */}
      <div className="mp_rating">
                    <div className="mp_services">
                      <div className="mp_left_services">
                        <h1>
                          Rated By
                          <br className="br" />
                          Clients on
                          <br className="br" />
                          Our Services
                        </h1>
                        <div className="mp_customers">
                          <img
                            className="mp_recycle_dustbin recycle_dustbin_page1"
                            src={dustbin}
                          />
                          <div className="mp_Review_button">
                            {/* Rating Popup */}
                            <Popup
                              trigger={
                                <button
                                  btns=""
                                  className="mp_btns mp_Write_review"
                                >
                                  Write us a Review
                                </button>
                              }
                              modal
                              nested
                            >
                              {(close) => (
                                <div className="modal">
                                  <div className="rating_popup">
                                    <fieldset class="rating">
                                      <input
                                        type="radio"
                                        id="star5"
                                        name="rating"
                                        value="5.0"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="full"
                                        for="star5"
                                        title="Awesome - 5 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star4half"
                                        name="rating"
                                        value="4.5"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="half"
                                        for="star4half"
                                        title="Pretty good - 4.5 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star4"
                                        name="rating"
                                        value="4.0"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="full"
                                        for="star4"
                                        title="Pretty good - 4 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star3half"
                                        name="rating"
                                        value="3.5"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="half"
                                        for="star3half"
                                        title="Meh - 3.5 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star3"
                                        name="rating"
                                        value="3.0"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="full"
                                        for="star3"
                                        title="Meh - 3 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star2half"
                                        name="rating"
                                        value="2.5"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="half"
                                        for="star2half"
                                        title="Kinda bad - 2.5 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star2"
                                        name="rating"
                                        value="2.0"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="full"
                                        for="star2"
                                        title="Kinda bad - 2 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star1half"
                                        name="rating"
                                        value="1.5"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="half"
                                        for="star1half"
                                        title="Meh - 1.5 stars"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="star1"
                                        name="rating"
                                        value="1.0"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="full"
                                        for="star1"
                                        title="Sucks big time - 1 star"
                                      ></label>
                                      <input
                                        type="radio"
                                        id="starhalf"
                                        name="rating"
                                        value="0.5"
                                        onClick={ratingValue}
                                      />
                                      <label
                                        class="half"
                                        for="starhalf"
                                        title="Sucks big time - 0.5 stars"
                                      ></label>
                                    </fieldset>
                                    <textarea
                                      value={ratingReview}
                                      onChange={feedbackValue}
                                      placeholder="We Value Your Input"
                                      rows="5"
                                      cols="30"
                                    ></textarea>
                                    <div className="rating_button__">
                                      <button
                                        className="_rating_button__"
                                        onClick={feedbackForm}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        className="_rating_button__"
                                        onClick={() => close()}
                                      >
                                        close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Popup>
                          </div>
                        </div>
                      </div>
                      <div className="mp_vertical_line__"></div>

                      <div className="mp_right_services">
                        <div className="mp_customer_images">
                          {image.map((image) => {
                            return <img src={image} />;
                          })}
                        </div>
                        <h1>Sumit Agarwal</h1>
                        <p className="mp_customer_name__">Customer</p>
                        <img src={rating_img} />
                        <p className="mp_review_para">
                          The team from Kabadiwala Online arrived promptly at
                          the scheduled time. They were friendly, professional,
                          and handled the pickup with great care.
                        </p>
                      </div>
                    </div>
                    <div className="mp_values">
                      {values.map((value) => {
                        return (
                          <div className="mp_happy_customers_values">
                            <h1 className={value.class}>{value.number}</h1>
                            <p>{value.about}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

      {/*INITIATIVE SECTION */}
      {initiative.length ? (
                    <div className="mp_Initiatives_container">
                      <div className="mp_main_Initiatives_container">
                        <svg
                          className="mp_main_Initiatives_containerSvg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <circle cx="50" cy="50" r="50" fill="#F79625" />
                        </svg>
                        <h1>Their Initiatives</h1>
                      </div>
                      <p>
                        Small steps towards<span> sustainability.</span>
                      </p>

                      <Splide
                        className="mp_small_steps"
                        options={{
                          arrows: false,
                          rewind: true,
                          perPage: 3,
                          gap: "7px",
                          breakpoints: {
                            900: { perPage: 2 },
                            600: { perPage: 1 },
                          },
                        }}
                      >
                        {initiative.map((step) => {
                          return (
                            <SplideSlide
                              className="mp_small_steps_cards"
                              key={step.id}
                            >
                              {step.photo !== null ? (
                                <img src={step.photo} />
                              ) : null}

                              {/*<h4>{step.heading}</h4>*/}
                              <p>{step.message}</p>

                              <div className="mp_learn_more">
                                <a href="">Learn More</a>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="18"
                                  viewBox="0 0 10 18"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_329_2558)">
                                    <path
                                      d="M1.90625 2.93213L8.90625 9.93213L1.90625 16.9321"
                                      stroke="#44B31F"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_329_2558">
                                      <rect
                                        width="9"
                                        height="17"
                                        fill="white"
                                        transform="translate(0.90625 0.9375)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </SplideSlide>
                          );
                        })}
                      </Splide>
                    </div>
                  ) : null}

      {/*CONTACT US SECTION */}
      <div className="mp_main_contact">
        <div className="mp_contact">
          <div className="mp_left_contact">
            <h1>
              Your Waste,
              <br />
              Our Responsibility.
              <br />
              Contact Us Today
            </h1>
            <div className="mp_vector">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="72"
                viewBox="0 0 62 72"
                fill="none"
              >
                <path
                  d="M61.9273 10.2857H43.9167V2.57143C43.9167 1.88944 43.6445 1.23539 43.16 0.753154C42.6756 0.270918 42.0185 0 41.3333 0H20.6667C19.9815 0 19.3244 0.270918 18.84 0.753154C18.3555 1.23539 18.0833 1.88944 18.0833 2.57143V10.2857H0.0726558L0 16.7143H5.32812L8.57182 67.1786C8.65392 68.4836 9.23233 69.7085 10.1894 70.6041C11.1465 71.4997 12.4103 71.9989 13.724 72H48.276C49.5889 71.9998 50.8525 71.5022 51.81 70.6081C52.7676 69.7141 53.3473 68.4907 53.4314 67.1866L56.6719 16.7143H62L61.9273 10.2857ZM18.0833 61.7143L16.6302 20.5714H21.9583L23.4115 61.7143H18.0833ZM33.5833 61.7143H28.4167V20.5714H33.5833V61.7143ZM37.4583 10.2857H24.5417V5.78571C24.5417 5.61522 24.6097 5.4517 24.7308 5.33115C24.8519 5.21059 25.0162 5.14286 25.1875 5.14286H36.8125C36.9838 5.14286 37.1481 5.21059 37.2692 5.33115C37.3903 5.4517 37.4583 5.61522 37.4583 5.78571V10.2857ZM43.9167 61.7143H38.5885L40.0417 20.5714H45.3698L43.9167 61.7143Z"
                  fill="#F8F8F8"
                />
              </svg>
              <div className="mp_horizontal_line"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="107"
                height="77"
                viewBox="0 0 107 77"
                fill="none"
              >
                <path
                  d="M21.5 0.000640177C21.3179 0.000640177 21.5 0.000640177 20 0.000640177C12.9448 1.21656 3.852 9.01443 1.50255 14.7162H53.1357L55.8449 9.24341C53.0219 4.66369 48.2362 2.70739 43 3.00049C39.5623 3.18368 32.5553 5.78572 32.5553 5.78572C32.5553 5.78572 27.4419 -0.0703456 21.5 0.000640177ZM60.7396 14.7162L55.6855 18.8379H37.5411L28.2753 40.5916C33.2838 41.3473 37.7004 43.9577 40.7966 47.6902H60.7396C61.8323 46.3621 63.0845 45.1943 64.4732 44.1867L70.9843 14.7162H60.7396ZM0 18.8379V37.1568L7.08932 39.0116L15.688 18.8379H0ZM15.688 18.8379L7.08932 39.0116L16.9106 41.5992L26.6134 18.8379H15.688ZM26.6134 18.8379L16.9106 41.5992L17.7529 41.8282C19.6698 41.0496 32.6464 40.7748 28.2753 40.5916L37.5411 18.8379H26.6134ZM74.2626 18.8379L69.2313 41.6221C71.4168 40.8206 73.8072 40.3627 76.266 40.3627C85.4406 40.3627 93.2494 46.5682 95.7081 55.0178H107V36.5844L96.4138 33.0351L92.8851 18.8379H84.9853H74.2626ZM78.3149 22.0438H88.7872L91.633 33.4931H75.4691L77.9279 23.6009L78.3149 22.0438ZM25.2702 44.4844C16.3186 44.4844 9.10638 51.7433 9.10638 60.7424C9.10638 69.7416 16.3186 77.0005 25.2702 77.0005C34.2172 77.0005 41.434 69.7416 41.434 60.7424C41.434 51.7433 34.2172 44.4844 25.2702 44.4844ZM76.266 44.4844C67.3189 44.4844 60.1021 51.7433 60.1021 60.7424C60.1021 69.7416 67.3189 77.0005 76.266 77.0005C85.213 77.0005 92.4298 69.7416 92.4298 60.7424C92.4298 51.7433 85.213 44.4844 76.266 44.4844ZM3.27374 51.812L0.450766 66.0091H5.69832C5.24983 64.3375 5.00851 62.5514 5.00851 60.7424C5.00851 57.5366 5.7484 54.514 7.06655 51.812H3.27374ZM43.483 51.812C44.7806 54.514 45.5319 57.5366 45.5319 60.7424C45.5319 62.5514 45.2815 64.3375 44.8489 66.0091H56.6872C56.2547 64.3375 56.0043 62.5514 56.0043 60.7424C56.0043 57.5366 56.7555 54.514 58.0532 51.812H43.483ZM25.2702 53.4149C27.2023 53.4149 29.0553 54.1869 30.4216 55.5611C31.7878 56.9353 32.5553 58.799 32.5553 60.7424C32.5553 62.6858 31.7878 64.5496 30.4216 65.9238C29.0553 67.298 27.2023 68.07 25.2702 68.07C23.3381 68.07 21.4851 67.298 20.1189 65.9238C18.7526 64.5496 17.9851 62.6858 17.9851 60.7424C17.9851 58.799 18.7526 56.9353 20.1189 55.5611C21.4851 54.1869 23.3381 53.4149 25.2702 53.4149ZM76.266 53.4149C78.1981 53.4149 80.0511 54.1869 81.4173 55.5611C82.7835 56.9353 83.5511 58.799 83.5511 60.7424C83.5511 62.6858 82.7835 64.5496 81.4173 65.9238C80.0511 67.298 78.1981 68.07 76.266 68.07C74.3338 68.07 72.4808 67.298 71.1146 65.9238C69.7484 64.5496 68.9809 62.6858 68.9809 60.7424C68.9809 58.799 69.7484 56.9353 71.1146 55.5611C72.4808 54.1869 74.3338 53.4149 76.266 53.4149ZM96.4594 59.1395C96.5049 59.6662 96.5277 60.1929 96.5277 60.7424C96.5277 63.1926 96.0951 65.5283 95.2983 67.7265L107 63.0094V59.1395H96.4594Z"
                  fill="#F8F8F8"
                />
              </svg>
              <div className="mp_horizontal_line"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="73"
                height="70"
                viewBox="0 0 73 70"
                fill="none"
              >
                <g clip-path="url(#clip0_329_2638)">
                  <path
                    d="M34.0559 47.3553L33.4448 62.2627L33.3633 63.1539L16.254 61.9792C15.2763 61.8982 14.3665 61.4728 13.5246 60.7031C12.6827 59.9335 12.0445 59.049 11.61 58.0498C11.3113 57.3206 11.1144 56.5779 11.0193 55.8218C10.9243 55.0656 10.9786 54.1879 11.1823 53.1887C11.386 52.1894 11.5489 51.4468 11.6711 50.9607C11.7933 50.4746 12.0853 49.6104 12.5469 48.3681C13.0086 47.1258 13.2666 46.4101 13.3209 46.2211C15.4392 46.5452 22.3509 46.9232 34.0559 47.3553ZM18.2908 23.6169L25.6234 38.9699L19.6351 35.2431C17.9242 37.1875 16.4101 39.1387 15.093 41.0967C13.7758 43.0546 12.7914 44.7425 12.1396 46.1603C11.4878 47.5781 10.9514 48.8542 10.5305 49.9884C10.1095 51.1227 9.85833 51.9734 9.77685 52.5405L9.61391 53.3912L1.87395 38.9294C1.41227 38.2273 1.16785 37.4711 1.14069 36.6609C1.11354 35.8507 1.19501 35.2161 1.38511 34.757L1.71101 34.0278C2.66153 32.3264 4.20952 29.7878 6.35498 26.4121L0.651855 22.9283L18.2908 23.6169ZM68.4376 44.5602L60.7791 59.103C60.4532 59.8862 59.9576 60.5141 59.2922 60.9867C58.6268 61.4593 58.0362 61.7361 57.5202 61.8171L56.7869 61.9792C54.8587 62.1682 51.8849 62.3303 47.8656 62.4653L48.1915 69.1088L38.8221 54.2419L47.4175 39.5776L47.7026 46.5857C52.3195 47.0178 56.1623 47.0853 59.2311 46.7882C62.2999 46.4911 64.6083 46.0455 66.1563 45.4514L68.4376 44.5602ZM36.4593 7.12964C35.1829 8.83103 31.5845 14.7049 25.6641 24.7512L12.7506 17.1759L11.9766 16.6898L21.1424 2.26853C21.6855 1.43134 22.5003 0.823704 23.5866 0.445617C24.6729 0.067531 25.7592 -0.0674999 26.8455 0.0405248C27.4973 0.0945372 28.1559 0.256574 28.8212 0.526636C29.4866 0.796698 30.0569 1.08026 30.5322 1.37733C31.0074 1.6744 31.5709 2.12 32.2227 2.71414C32.8745 3.30827 33.3633 3.77413 33.6892 4.11171C34.0151 4.44928 34.504 4.98265 35.1558 5.71182C35.8075 6.44099 36.2421 6.9136 36.4593 7.12964ZM63.1418 19.566L71.778 34.2708C72.2668 35.2701 72.4365 36.2963 72.2872 37.3496C72.1378 38.4028 71.7644 39.402 71.1669 40.3472C70.8139 40.8874 70.3658 41.387 69.8226 41.8461C69.2795 42.3052 68.7635 42.6833 68.2746 42.9803C67.7858 43.2774 67.1272 43.5745 66.2989 43.8715C65.4706 44.1686 64.8324 44.3847 64.3843 44.5197C63.9362 44.6547 63.2369 44.8438 62.2863 45.0868C61.3358 45.3299 60.7112 45.4919 60.4125 45.5729C59.4891 43.6285 55.8907 37.7411 49.6173 27.9109L62.3678 20.0116L63.1418 19.566ZM57.3165 10.4109L63.1011 7.04863L54.139 22.1586L37.0704 21.3484L43.2216 17.8646C42.2982 15.461 41.2798 13.2195 40.1664 11.1401C39.0529 9.06059 38.0277 7.39295 37.0907 6.13717C36.1538 4.88138 35.278 3.80113 34.4632 2.89643C33.6485 1.99172 33.0103 1.36383 32.5486 1.01275L31.8561 0.486127L48.3544 0.526636C49.1963 0.445617 49.9839 0.5874 50.7171 0.951983C51.4504 1.31657 51.98 1.7014 52.3059 2.1065L52.754 2.71414C53.8131 4.36151 55.334 6.9271 57.3165 10.4109Z"
                    fill="#F8F8F8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_329_2638">
                    <rect width="73" height="70" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="mp_right_contact">
            <p>How can you reach us?</p>
            <h2>CONTACT US</h2>
            <form onSubmit={contactUs}>
                          <input
                            required
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={contactValue.name}
                            onChange={getInputValue}
                          />
                          <input
                            required
                            type="email"
                            placeholder="Email id"
                            name="email"
                            value={contactValue.email}
                            onChange={getInputValue}
                          />
                          <input
                            required
                            type="tel"
                            placeholder="Phone No."
                            name="phone"
                            pattern="[6789][0-9]{9}"
                            title="Please enter valid phone number"
                            value={contactValue.phone}
                            onChange={getInputValue}
                          />
                          <input
                            required
                            type="text"
                            placeholder="Message"
                            name="message"
                            value={contactValue.message}
                            onChange={getInputValue}
                          />
                          <button
                            className="mp_btns mp_Send_email"
                            type="submit"
                          >
                            Send Email
                          </button>
                        </form>
          </div>
        </div>
      </div>

      <MainFooter />
      <TermFooter />
    </div>
    ) : (
      <h1>Dealer is not active</h1>
    )}
  </>
) : (
  <h1>Loading...</h1>
)}
</>
) : (
<div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#56b124' }}>Marketplace not found for this dealer!</h1>
      <button style={{margin: '10px', padding: '20px' , borderRadius: '20px', borderColor: 'none', backgroundColor:'#56b124'}}>
      <a href="/sell" style={{textDecoration: 'none' , color: "white"}}>Sell your products here</a>
      </button>
      {/* You can add additional content or styling as needed */}
    </div>
)}
</>
  );
};
export default MarketPlaceNew;