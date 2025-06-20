'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// Components
import Navbar from '@/components/Navbar'
import LeftBanner from '@/components/AuthPageBanner/LeftBanner'
import ForgotPasswordStep1 from './ForgotPasswordStep1'
import ForgotPasswordStep2 from './ForgotPasswordStep2'
import TermFooter from '@/components/Footer/TermFooter'

// Styles
import '@/app/styles/Auth.css'

const ForgotPassword = () => {
  const forgotPasswordStep = useSelector(
    (state) => state.stepReducer.forgotPasswordStep
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="auth__section">
        <LeftBanner />
        {forgotPasswordStep === 1 && <ForgotPasswordStep1 />}
        {forgotPasswordStep === 2 && <ForgotPasswordStep2 />}
      </div>
    </>
  )
}

export default ForgotPassword
