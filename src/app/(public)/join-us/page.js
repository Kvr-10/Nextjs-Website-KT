'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

// CSS
import '@/app/styles/JoinUs.css';
import '@/app/styles/App.css';

// Components
import Navbar from '@/components/Navbar';
import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';
import JoinUsComponent from '@/app/(public)/join-us/JoinUsComponent';

// Join Us Details
import { JoinUsDetails } from '@/app/(public)/join-us/JoinUsDetails';

// Optional API URL (commented out)
import { apiUrl } from '@/lib/Private';

const JoinUs = () => {
  const [joinUsDetails, setJoinUsDetails] = useState(JoinUsDetails);
  const [happyTeamMember, setHappyTeamMember] = useState([]);

  // Fetch team member data
  useEffect(() => {
    axios
      .get(`${apiUrl}/v3/WebsiteContent/working-team-members/`)
      .then((response) => {
        setHappyTeamMember(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Toggle join us detail accordion
  const openClose = (index) => {
    const updated = joinUsDetails.map((detail, i) => ({
      ...detail,
      isOpen: i === index ? !detail.isOpen : false,
    }));
    setJoinUsDetails(updated);
  };

  return (
    <>

      <div className="main__section">
        <div className="join__us__top__banner">
          <h1>JOIN OUR TEAM</h1>
          <p>
            "Alone, we can do so little...
            <br />
            Together, we can do so much"
          </p>
          <span>~ Helen Keller</span>
        </div>

        <div className="join__us__section" id="joinourteam">
          {joinUsDetails.map((detail, index) => (
            <JoinUsComponent
              key={index}
              title={detail.title}
              headline={detail.headline}
              description={detail.description}
              disclaimer={detail.disclaimer}
              component={detail.component}
              isOpen={detail.isOpen}
              openClose={() => openClose(index)}
            />
          ))}
        </div>

        <div className="main__section__carousel">
          <h1>Our Happy Members</h1>
          {happyTeamMember.length > 0 && (
            <div className="carousel__section">
              <Splide
                className="main__carousel"
                options={{
                  type: 'loop',
                  gap: '1rem',
                  autoplay: true,
                  pauseOnHover: false,
                  resetProgress: false,
                  pagination: false,
                  arrows: false,
                }}
              >
                {happyTeamMember.reverse().map((member, idx) => (
                  <SplideSlide key={idx} className="carousel">
                    <img src={member.dp} alt={member.name} />
                    <div>
                      <h1>{member.feedback}</h1>
                      <p>{member.name}</p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          )}
        </div>
      </div>

    
    </>
  );
};

export default JoinUs;
