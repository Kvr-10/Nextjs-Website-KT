'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

// CSS
import '@/app/styles/About.css';
import '@/app/styles/App.css';


// Components
import Navbar from '@/components/Navbar';
import AboutWorkCard from '@/app/(public)/About/AboutWorkCard';
import { AboutWorkDetails } from '@/app/(public)/About/AboutWorkDetails';

import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';


// API
import { apiUrl } from '@/lib/Private'; // ✅ Updated path

const Home = () => {
  const [aboutWorkDetails] = useState(AboutWorkDetails);
  const [teamMember, setTeamMember] = useState([]);

  const [numVotes, setnumVotes] = useState(0);
  const [numYes, setnumYes] = useState(0);
  const [numNo, setnumNo] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/v3/WebsiteContent/team-members/`)
      .then((response) => setTeamMember(response.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getVote();
  }, []);

  const getVote = async () => {
    try {
      const response = await axios.get(`${apiUrl}/votes/get-votes/1/`);
      const data = response.data;
      setnumVotes(Number(data["yes_count"] + Number(data["no_count"])));
      setnumNo(Number(data["no_count"]));
      setnumYes(Number(data["yes_count"]));
    } catch (error) {
      console.error(error);
    }
  };

  const postVote = async (e, votes) => {
    setIsOpen(true);
    try {
      const ip = await axios.get(`https://api.ipify.org/?format=json`);
      const votedata = {
        vote: 1,
        status: votes,
        ip: ip.data.ip,
      };

      const response = await axios.post(`${apiUrl}/votes/post-votes/`, votedata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const voteMsg = response.data["Your Voting Choice was : "];
      Swal.fire({
        title: voteMsg
          ? `${response.data.unsuccessful}\nYour Voting Choice was: ${voteMsg}`
          : "Thank you for voting.",
        title: "Thank you for voting111.", // Something is worng here
        confirmButtonColor: "#56b124",
      });
    } catch (error) {
      Swal.fire({
        title: "There was an error posting your vote. Please try again later.",
        confirmButtonColor: "#56b124",
      });
    }
  };

  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const voteSuggestion = async () => {
    const { name, email, phone, message } = inputValue;
    if (
      name &&
      email &&
      phone &&
      phone.length === 10 &&
      !isNaN(phone) &&
      message
    ) {
      try {
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("phone", phone);
        data.append("message", message);

        await axios.post(`${apiUrl}/v3/WebsiteContent/suggestion-form/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setInputValue({ name: "", email: "", phone: "", message: "" });
        setIsOpen(false);
      } catch (err) {
        Swal.fire({
          title: "Please enter a valid email.",
          confirmButtonColor: "#56b124",
        });
      }
    } else {
      Swal.fire({
        title: "Please enter valid fields.",
        confirmButtonColor: "#56b124",
      });
    }
  };

  return (
    <>


      <div className="main__section">
        <div className="about__top__banner">
          <h1>ABOUT US</h1>
          <p> We are a hyperlocal platform to connect the waste producers to the
            waste collectors. Individuals, households, organisations, and
            dealers like Kabadiwalas, collectors, and recyclers all come
            together on a unified online platform. Here, a customer can easily
            find their nearest Kabadiwala and place an order for doorstep waste
            pickup.</p>
          <p> By leveraging AI, IoT, and IT in the waste management sector, We aim
            to help small local Kabadiwalas grow their businesses with the help
            of technology. By offering a modern solution to treat & manage
            waste, we enable our partners to collect waste efficiently with
            fewer resources.</p>
        </div>

        <div className="goal__section">
          <div className="goal" id="ourvision">
            <h1>Our Vision</h1>
            <p> Our vision is a world of sustainable consumption and a circular
              economy. We envision becoming a global one-stop shop for the
              recycling and upcycling industry.</p>
          </div>
          <div className="goal" id="ourmission">
            <p> Our mission is to establish a sustainable recyclable waste
              management system and a clean and pollution-free country by
              creating a hyperlocal platform connecting waste producers and
              waste collectors.</p>
            <h1>Our Mission</h1>
          </div>
        </div>

        <div className="certificate__section">
          <h1>Startup India Certificate</h1>
          <img className="certificate" src="/Image/certificate_new.svg" alt="Certificate" />
        </div>

        <div className="work__section" id="whatwedo">
          <h1>What We Do?</h1>
          <div className="work">
            {aboutWorkDetails.map((eachDetail, index) => (
              <AboutWorkCard key={index} {...eachDetail} />
            ))}
          </div>
        </div>

        <div className="voting__section">
          <h1>Your Vote is Valuable</h1>
          <div className="voting">
            <h1>
               We’d love to hear your valuable suggestions! If you feel our
              service adds value to your life, please click on “Yes, I need this
              service”. If you feel you don’t require our services, please click
              on “No, I don’t need this service”. Your response will help us
              understand your requirements better. Please note that we don’t
              collect email addresses by default. Please leave your contact
              details or your suggestions after voting if you’re interested!
            </h1>
            <div className="vote__section">
              <div className="vote">
                <button onClick={(e) => postVote(e, "Yes")}>Yes, I need this service</button>
                <p>{numYes}</p>
              </div>
              <h1>
                Total Vote<br /><span>{numVotes}</span>
              </h1>
              <div className="vote">
                <button onClick={(e) => postVote(e, "No")}>No, I don't need this service</button>
                <p>{numNo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="join__team__section">
          <div className="left__side">
            <h1>Join Our Team</h1>
          </div>
          <div className="right__side">
            <h1>J  Join us on our mission to revolutionise the waste management
              industry</h1>
            <Link href="/joinus" className="join__team__button">More Info</Link>
          </div>
        </div>

        <div className="team__member__section" id="ourteam">
            <h1>Our Team Members</h1>
            {teamMember.length > 0 && (
              <div className="about__carousel__section">
                <Splide
                  className="team__member"
                  options={{
                    type: "loop",
                    gap: "1rem",
                    autoplay: true,
                    pauseOnHover: false,
                    resetProgress: false,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {teamMember.map((member, index) => (
                    <SplideSlide className="member" key={index}>
                      <img src={member.dp} alt={member.name} />
                      <div>
                        <h1>{member.name}</h1>
                        <p>({member.title})</p>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            )}
          </div>


        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Any suggestion for us?</h1>
          <input type="text" placeholder="Name" name="name" value={inputValue.name} onChange={getInputValue} />
          <input type="email" placeholder="Email" name="email" value={inputValue.email} onChange={getInputValue} />
          <input type="text" placeholder="Phone" name="phone" value={inputValue.phone} onChange={getInputValue} />
          <input type="text" placeholder="Message" name="message" value={inputValue.message} onChange={getInputValue} />
          <div>
            <button onClick={voteSuggestion}>Done</button>
            <button onClick={() => { setInputValue({ name: "", email: "", phone: "", message: "" }); setIsOpen(false); }}>Skip</button>
          </div>
        </Modal>
      </div>

    </>
  );
};

export default Home;
