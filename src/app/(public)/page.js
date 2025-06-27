'use client';

import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Link from "next/link";
import Image from "next/image";

// Components
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/Footer/MainFooter";
import TermFooter from "@/components/Footer/TermFooter";

// Styles
import "@/app/styles/HomePage.css";


const HomePage = () => {
  const [active, setActive] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [formValuess, setFormValuess] = useState({
    fullName: "",
    number: "",
    email: "",
    company: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plant = [
    {
      id: 1,
      img: '/Images/plant1.png',
      heading: "Vermigold EcoTech",
      para: "One of the top recycling plants in India...",
    },
    {
      id: 2,
      img: '/Images/plant2.png',
      heading: "Let’s Recycle",
      para: "One of the top recycling plants in India...",
    },
    {
      id: 3,
      img: '/Images/plant3.png',
      heading: "Attero",
      para: "One of the top recycling plants in India...",
    },
  ];

  const ideas = [
    {
      id: 1,
      img: '/Images/idea1.png',
      para: "L-G Saxena-headed panel orders to start early morning waste collection in Delhi",
      year: "2019",
    },
       {
      id: 2,
      img: '/Images/idea2.png',
      para: "L-G Saxena-headed panel orders to start early morning waste collection in Delhi",
      year: "2019",
    },
    {
      id: 3,
      img: '/Images/idea3.png',
      para: "L-G Saxena-headed panel orders to start early morning waste collection in Delhi",
      year: "2019",
    },
    // ... same structure
  ];

  const update = [
    {
      id: 1,
      img: '/Images/update1.png',
      para: "Unscientific handling of solid waste in Ludhiana: NGT orders authorities to lift waste within two months, submit action taken report.",
    },
    {
      id: 2,
      img: '/Images/update2.png',
      para: "Unscientific handling of solid waste in Ludhiana: NGT orders authorities to lift waste within two months, submit action taken report.",
    },
    {
      id: 3,
      img: '/Images/update3.png',
      para: "Unscientific handling of solid waste in Ludhiana: NGT orders authorities to lift waste within two months, submit action taken report.",
    },
  ];

  const project = [
    {
      id: 1,
      img: '/Images/project1.png',
      heading: "Project A",
      para: "Young boy from slum takes the waste world by storm...",
    },
    {
      id: 2,
      img: '/Images/project2.png',
      heading: "Project B",
      para: "Read more at mesofindia.indiatimes.com/articleshow/90541213.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppstwaste warriors ",
    },
    {
      id: 3,
      img: '/Images/project1.png',
      heading: "Project C",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ",
    },
  ];

  return (
    <>

      <div className="home_page">
        <div className="heroSection__home_page__">
          <div className="mainSection__home_page__">
            <div className="mainSection_left__home_page__">
              <div>
                <blockquote>
                  Our planet's alarm is going off, and it is time to wake up and take action!
                  <br />
                  <br /> ~Leonardo DiCaprio
                </blockquote>
              </div>
            </div>
            <div className="mainSection_right__home_page__">
              <Link href="/About">
                <span className="button__home_page">About Us</span>
              </Link>
              <Link href="/join-us">
                <button className="button__home_page">More Info</button>
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd6euQZhe1-EvZH9U8IY5bdCDlCl2O82lOYdLRTcRneR46mqA/viewform"
                target="_blank"
              >
                <button className="button__home_page">Survey</button>
              </a>
            </div>
          </div>
        </div>

           {/* MESSAGE FOR KABADIWALA */}
    <div className="Kabadiwala__home_page">
      <div className="mainKabadiwala__home_page">
        <div className="mainKabadiwalaLeft__home_page">
          <div className="KabadiwalaButtons__home_page">
            <div className="button outsideKabadiwalabtn__home_page">
              <button
                className={
                  active
                    ? "btn kabaadiwalabtn__home_page"
                    : "btn collectorbtn__home_page"
                }
                onClick={() => setActive(!active)}
              >
                Kabaadiwaale
              </button>
            </div>
            <div className="button outsideCollectorbtn__home_page">
              <button
                className={
                  active
                    ? "btn collectorbtn__home_page"
                    : "btn kabaadiwalabtn__home_page"
                }
                onClick={() => setActive(!active)}
              >
                Collectors
              </button>
            </div>
          </div>
          <div className="MessageKabadiwala__home_page">
            <div className="headingMessageKabadiwala__home_page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <circle cx="29" cy="29" r="29" fill="#E17F0B" />
              </svg>
              <h1>Message for Kabaadiwaale</h1>
            </div>

            <div className="topMessage__home_page">
              <p>
                Honoring the Unsung Heroes of Waste Management: We're Here to
                Support You
              </p>
              <p>To the Kabaadiwaale of India: Your Dedication Inspires Us</p>
            </div>
            <div className="AboutMessage__home_page">
              <p>
                To the resilient and hardworking Kabaadiwaale of India, we
                extend our heartfelt appreciation for your tireless efforts in
                waste management. Your invaluable contributions play a vital
                role in keeping our neighborhoods clean and sustainable.
                <br /> At Kabadi Techno, we recognize your importance and are
                here to support you every step of the way.
              </p>
            </div>
          </div>
        </div>
        <div className="mainKabadiwalaRight__home_page">
          <div className="kabadiwalaImage__home_page">
            <img

              src="/Images/kabadiwala.png"
              alt="kabadiwala"
            />
          </div>

          <form className="form">
            <label>
              Name <br />
              <input
                type="text"
                placeholder=""
                name="Name"
                value={formValues.fullName}
                onChange={(e) =>
                  setFormValues({ ...formValues, fullName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Phone Number <br />
              <input
                type="number"
                placeholder=""
                name="Number"
                max="9999999999"
                min="1000000000"
                value={formValues.number}
                onChange={(e) =>
                  setFormValues({ ...formValues, number: e.target.value })
                }
                required
              />
            </label>

            <label>
              Email <br />
              <input
                type="email"
                placeholder=""
                name="Email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                required
              />
            </label>

            <label>
              Message
              <br />
              <input
                type="text"
                className="message__home_page"
                placeholder=""
                name="Message"
                value={formValues.message}
                onChange={(e) =>
                  setFormValues({ ...formValues, message: e.target.value })
                }
                required
              />
            </label>
            <div className="button outsideKabadiwalabtn">
              <button className="btn kabaadiwalabtn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* RECYCLING PLANT */}
    <div className="plantsContainer__home_page__">
      <div className="bg_image__home_page__">
        <img

          src="/images/bg_image1.png"
          className="bg_image1"
          alt="AAAAA"
        />
        <img

          src="/images/bg_image2.png"
          className="bg_image2"
          alt="AAAAA"
        />
      </div>
      <div className="main_plantContainer__home_page__">
        <h1>Top Recycling Plants in India</h1>
        <Splide
          className="plantsContainerCards__home_page"
          options={{
            arrows: false,
            perPage: 3,
            gap: "7px",
            // gap: 21,
            // fixedWidth: true,
            // arrows: true,
            pagination: false,
            breakpoints: {
              1200: { perPage: 2, gap: "1rem" },
              600: { perPage: 1 },
            },
          }}
        >
          {plant.map((list) => {
            return (
              <SplideSlide key={list.id}>
                <Link href={`/page5/${list.id}`} className="link">
                  <div className="plantsCards__home_page" key={list.id}>
                    <img
                      className="imagePlantCard__home_Page"
                      src={list.img}
                      alt=""
                    />
                    <h2>{list.heading}</h2>
                    <p>{list.para}</p>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>

    {/*Founder */}
    <div className="founder__home_page">
      <div className="mainFounder__home_page">
        <div className="founder_heading__home_page">
          <p>Message from the founder</p>
          <div className="founder_message__home_page">
            <h1>Mr. Kuldeep </h1>
            <p>
              I am a passionate entrepreneur who handles waste management
              using technology.
            </p>
            <p>
              I recognized a gap in the market and founded the company in
              2018, which was recognized by Startup India and received a DPIIT
              certificate. I have filed provisional patents for my IoT-based
              Collection Vendor Machine (CVM) for E-waste management and
              currently manage a team of 20+ interns in different fields for
              my company.
            </p>
            <p>
              I believe waste management is the second biggest problem in
              India and am dedicated to fighting the poor waste management
              system with technology.
            </p>
          </div>
        </div>
        <div className="founder_image__home_page">

          <Image src="/Images/founder.png" alt="Founder" width={500} height={500} />
        </div>
      </div>
    </div>

    {/*Ideas*/}
    <div className="ideas__home_page">
      <div className="mainIdeas__home_page">
        <h1>Ideas</h1>
        <hr className="horizontalLine__home_page" />
        <Splide
          className="mainIdeaContainer__home_page"
          options={{
            arrows: false,
            autoplay: true,
            perPage: 3,
            gap: "7px",
            breakpoints: {
              900: { perPage: 2, gap: "1rem" },
              600: { perPage: 1 },
            },
          }}
        >
          {ideas.map((idea) => {
            return (
              <SplideSlide key={idea?.id}>
                <Link href={`/page5/${idea.id}`} className="link">
                  <div
                    className="mainIdeaContainerLeft__home_page"
                    key={idea.id}
                  >
                    <img src="/Images/idea.png" alt="idea" />
                    <p>{idea.para}</p>
                    <span>{idea.year}</span>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>

    {/*CLOCK*/}
    <div className="wasteContainer__home_page">
      <div className="mainWasteContainer__home_page">
        <div className="mainheading__home_page">
          <h1>WASTE CLOCK</h1>
        </div>
        <div className="wasteCard__home_page">
          {/*map function */}
          <div className="wasteCards__home_page">
            

            <img src="/Images/plastic.png" />
            <h1>Plastic Waste</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="517"
              height="110"
              viewBox="0 0 517 110"
              fill="none"
            >
              <path
                d="M0.948242 18.4928C0.948242 8.55169 9.00712 0.492798 18.9482 0.492798H498.093C511.446 0.492798 520.151 14.522 514.22 26.4865L478.026 99.5098C474.988 105.639 468.739 109.516 461.898 109.516H18.9482C9.00712 109.516 0.948242 101.457 0.948242 91.5161V18.4928Z"
                fill="#112F34"
              />
            </svg>
          </div>
          <div className="wasteCards__home_page">

            <img src="/Images/plastic.png" />
            <h1>Rock paper scissors</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="517"
              height="110"
              viewBox="0 0 517 110"
              fill="none"
            >
              <path
                d="M0.948242 18.4928C0.948242 8.55169 9.00712 0.492798 18.9482 0.492798H498.093C511.446 0.492798 520.151 14.522 514.22 26.4865L478.026 99.5098C474.988 105.639 468.739 109.516 461.898 109.516H18.9482C9.00712 109.516 0.948242 101.457 0.948242 91.5161V18.4928Z"
                fill="#112F34"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* UPDATES */}
    <div className="newBlog__home_page">
      <div className="main_newBlog__home_page">
        <h1>News, Blogs and Updates</h1>

        <Splide
          className="new_blog_card__home_page"
          options={{
            arrows: false,
            perPage: 2,
            gap: "7px",
            breakpoints: {
              1200: { perPage: 2, gap: "1rem" },
              768: { perPage: 1 },
            },
          }}
        >
          {update.map((update) => {
            return (
              <SplideSlide key={update.id}>
                <Link href={`/page5/${update.id}`} className="link">
                  <div className="new_blog_cards__home_page">
                    <img src={update.img} alt="" />
                    <p>{update.para}</p>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>

    {/*SERVICES */}
    <div className="services__home_page">
      <div className="main_services__home_page">
        <div className="main_services_left__home_page">
          <div className="services_heading__home_page">
            <h1>Consultancy Services</h1>
            <p>
              Unlock Your Waste Management Potential with Kabadi Techno
              Consultancy Services.
            </p>
          </div>
          <div className="services_para__home_page">
            <p>
              Our handpicked agents bring expertise and a passion for positive
              change. From waste reduction to compliance, we cover a wide
              range of areas, staying up-to-date with the latest trends and
              technologies.
            </p>
          </div>
          <img src="/Images/services.png"  alt="Services" />
          <p>
            Contact us today and let our expert consultants propel your
            success!
          </p>
        </div>
        <div className="main_services_right__home_page">
          <p className="services_unlock__home__page">
            Unlock your waste management potential.{" "}
          </p>
          <p className="services_contact_home__page">
            Contact us today and let our expert consultants propel your
            success!
          </p>
          <form>
            <input
              className="ServicesInput"
              type="text"
              placeholder="Name"
              name="Name"
              value={formValuess.fullName}
              onChange={(e) =>
                setFormValuess({ ...formValuess, fullName: e.target.value })
              }
              required
            />

            <input
              className="ServicesInput number__home_page"
              type="number"
              name="Number"
              placeholder="Number"
              value={formValuess.number}
              onChange={(e) =>
                setFormValuess({ ...formValuess, number: e.target.value })
              }
              required
            />

            <input
              className="ServicesInput number__home_page"
              type="email"
              placeholder="Email"
              name="Email"
              value={formValuess.email}
              onChange={(e) =>
                setFormValuess({ ...formValuess, email: e.target.value })
              }
              required
            />

            <input
              className="ServicesInput"
              type="text"
              name="Company"
              placeholder="Company / Organization"
              value={formValuess.company}
              onChange={(e) =>
                setFormValuess({ ...formValuess, company: e.target.value })
              }
              required
            />

            <input
              className="ServicesInput"
              type="text"
              name="City"
              placeholder="City"
              value={formValuess.city}
              onChange={(e) =>
                setFormValuess({ ...formValuess, city: e.target.value })
              }
              required
            />

            <input
              className="ServicesInput message"
              type="text"
              name="Message"
              value={formValuess.message}
              onChange={(e) =>
                setFormValuess({ ...formValuess, message: e.target.value })
              }
              required
            />
            <div>
              <button className="button__home_page">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/*SUPPORT*/}
    <div className="supportContainer__home_page">
      <div className="main_supportContainer__home_page">
        <div className="main_supportContainerLeft__home_page">
          <img src="/Images/servicess.png" />
        </div>
        <div className="main_supportContainerRight__home_page">
          <div className="rightTopMain_supportContainer__home_page">
            <h1>
              Support a Cleaner Future:
              <br />
              <span>Donate to Waste Management Initiatives Today!</span>{" "}
            </h1>
          </div>
          <div className="rightBottomMain_supportContainer__home_page">
            <p>
              By donating to our cause, you directly contribute to vital
              projects that address waste reduction, recycling, education, and
              community engagement. Together, we can tackle the pressing
              challenges of waste management and build a brighter future for
              generations to come.
            </p>
              <div className="support_button__home_page">
                <Link href="/donation" className="button__home_page">
                  Monetary Donation
                </Link>

                <Link href="/Wastedonation" className="button__home_page">
                  Waste Donation
                </Link>
              </div>
            <p>7,803 people have donated!</p>
          </div>
        </div>
      </div>
    </div>

    {/*OUR HEROES */}
    <div className="ourHero__home_page">
      <div className="mainOurHero__home_page">
        <h1>Meet our Heroes</h1>
        <div>
          {project.map((project) => {
            return (
              <Link href={`/page5/${project.id}`} key={project.id}>
                <div className="card">
                  <img src={project.img} alt="" />
                  <div className="card-desc">
                    <h2>{project.heading}</h2>
                    <p>{project.para}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>

      </div>

    </>
  );
};

export default HomePage;
