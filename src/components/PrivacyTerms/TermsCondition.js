'use client'

import { useEffect } from 'react'

// Styles
import '@/app/styles/Privacy&Terms.css'

// Components
import Navbar from '@/components/Navbar'
import MainFooter from '@/components/Footer/MainFooter'
import TermFooter from '@/components/Footer/TermFooter'

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>

      <div className="privacy__terms">
        <h1>Kabadi Techno Pvt. Ltd. Website Standard Terms and Conditions</h1>
        <div className="privacy__terms__section">
          <h1>1. Introduction</h1>
          <p>
            These Website Standard Terms And Conditions (these “Terms” or these “Website Standard Terms And Conditions”) contained herein on this webpage, shall govern your use of this website, including all pages within this website (collectively referred to herein below as this “Website”). These Terms apply in full force and effect to your use of this Website and by using this Website, you expressly accept all terms and conditions contained herein in full. You must not use this Website, if you have any objection to any of these Website Standard Terms And Conditions.
          </p>
          <p>
            This Website is not for use by any minors (defined as those who are not at least 18 years of age), and you must not use this Website if you are a minor.
          </p>

          <h1>2. Intellectual Property Rights</h1>
          <p>
            Kabadi Techno Pvt. Ltd. owns all rights to the intellectual property and material contained in this Website, and all such rights are reserved. You are granted a limited license only, subject to the restrictions provided in these Terms, for purposes of viewing the material contained on this Website.
          </p>

          <h1>3. Restrictions</h1>
          <p>You are expressly and emphatically restricted from all of the following:</p>
          <ul>
            <li>publishing any Website material in any media;</li>
            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
            <li>publicly performing and/or showing any Website material;</li>
            <li>using this Website in any way that is, or may be, damaging to this Website;</li>
            <li>using this Website in any way that impacts user access to this Website;</li>
            <li>using this Website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to the Website, or to any person or business entity;</li>
            <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website, or while using this Website;</li>
            <li>using this Website to engage in any advertising or marketing;</li>
          </ul>
          <p>
            Kabadi Techno Pvt. Ltd. may restrict access of the user to any areas of this Website, at any time, in its sole and absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality of such information.
          </p>

          <h1>4. Your Content</h1>
          <p>
            In these Website Standard Terms And Conditions, “Your Content” shall mean any audio, video, text, images or other material you choose to display on this Website. With respect to Your Content, by displaying it, you grant Kabadi Techno Pvt. Ltd. a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>
          <p>
            Your Content must be your own and must not be infringing on any third party’s rights. Kabadi Techno Pvt. Ltd. reserves the right to remove any of Your Content from this Website at any time, and for any reason, without notice.
          </p>

          <h1>5. No warranties</h1>
          <p>
            This Website is provided “as is,” with all faults, and Kabadi Techno Pvt. Ltd. makes no express or implied representations or warranties, of any kind related to this Website or the materials contained on this Website. Additionally, nothing contained on this Website shall be construed as providing consult or advice to you.
          </p>

          <h1>6. Limitation of liability</h1>
          <p>
            In no event shall Kabadi Techno Pvt. Ltd., nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and Kabadi Techno Pvt. Ltd., including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
          </p>

          <h1>7. Indemnification</h1>
          <p>
            You hereby indemnify to the fullest extent Kabadi Techno Pvt. Ltd. from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these Terms.
          </p>

          <h1>8. Severability</h1>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
          </p>

          <h1>9. Variation of Terms</h1>
          <p>
            Kabadi Techno Pvt. Ltd. is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this Website.
          </p>

          <h1>10. Assignment</h1>
          <p>
            Kabadi Techno Pvt. Ltd. shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification or consent required. However, you shall not be permitted to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
          </p>

          <h1>11. Entire Agreement</h1>
          <p>
            These Terms, including any legal notices and disclaimers contained on this Website, constitute the entire agreement between Kabadi Techno Pvt. Ltd. and you in relation to your use of this Website, and supersede all prior agreements and understandings with respect to the same.
          </p>

          <h1>12. Governing Law & Jurisdiction</h1>
          <p>
            These Terms will be governed by and construed in accordance with the laws of the State of Gujarat, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Ahmedabad for the resolution of any disputes.
          </p>
        </div>
      </div>

    </>
  )
}

export default TermsConditions
