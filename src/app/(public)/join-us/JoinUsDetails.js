// src/app/(public)/join-us/JoinUsDetails.js

'use client';

import dynamic from 'next/dynamic';

// Dynamically import the form components (optional for performance)
const JoinUsInternForm = dynamic(() => import('./JoinUsInternForm'));
const JoinUsMentorForm = dynamic(() => import('./JoinUsMentorForm'));
const JoinUsInvestorForm = dynamic(() => import('./JoinUsInvestorForm'));

export const JoinUsDetails = [
  {
    title: `Join Our Team \n as Intern`,
    headline:
      "Grab the opportunity to work with a dynamic, fast paced and diverse team to gain valuable experience in the startup ecosystem!",
    description:
      "Many interns want to take real-life project experience before completing their graduation and post-graduation. All of them are welcomed to join our internship program and become a part of our startup. You have the flexibility to choose whichever field you want to work on, and we will provide you with the expertise and experience you need. Excellent performers among the interns will be given several opportunities to work in the company.",
    disclaimer:
      "Disclaimer: We do not charge any amount from our interns during the selection process or while inviting students for an interview.",
    component: JoinUsInternForm,
    isOpen: false,
  },
  {
    title: `Join Our Team \n as Mentor`,
    headline:
      "We are in search of a mentor who can inspire us to do better than we know how.",
    description:
      "Kabadi Techno was established on 26 April 2018. Our team members are passionately and dedicatedly working to solve the waste management problem using all the possible technology available. We have a dedicated research and development team to meet this purpose. We are in search of mentors to boost and scale up our startup, help train our employees, and bring in innovative ideas to solve the problem of waste management.",
    disclaimer:
      "Area of Expertise: 1. Finance 2. Marketing 3. IT Management 4. Chemicals 5. IoT System 6. Accounting (CA/CS) 7. Operations 8. Graphics Design",
    component: JoinUsMentorForm,
    isOpen: false,
  },
  {
    title: `Join Our Team \n as Investor`,
    headline:
      "Join our team as an investor to help ensure a hyperlocal waste management community is present in every city.",
    description:
      "Our team is in search of Angel investors, Venture capitalists, and Crowdfunding partners to scale up our startup mission. Our startup was established on 26 April 2018. Our team is passionately working to solve the waste management problem using all possible technology. We are recognized by Startup India and have a dedicated R&D team to meet this purpose.",
    component: JoinUsInvestorForm,
    isOpen: false,
  },
];
