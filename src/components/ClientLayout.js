// src/components/ClientLayout.jsx
// 'use client'

// import { usePathname } from 'next/navigation'
// import Navbar from './Navbar'
// import MainFooter from './Footer/MainFooter'
// import TermFooter from './Footer/TermFooter'
// import Chatbot from './Chatbot'
// import ReduxProvider from '@/lib/redux-provider'

// const ClientLayout = ({ children }) => {
//   const pathname = usePathname()
//   const showTermFooter = pathname.includes('/termscondition') || pathname.includes('/privacypolicy')

//   return (
//     <>
//       <Navbar />
//       <main>{children}</main>
//       <Chatbot />
//       {showTermFooter ? <TermFooter /> : <MainFooter />}
//     </>
//   )
// }

// export default ClientLayout

'use client'

import Navbar from './Navbar'
import MainFooter from './Footer/MainFooter'
import ReduxProvider from '@/lib/redux-provider'

const ClientLayout = ({ children }) => {

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <MainFooter /> {/* Always show MainFooter */}
    </>
  )
}

export default ClientLayout