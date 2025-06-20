// src/components/AppClientWrapper.jsx
'use client'

import ReduxProvider from '@/lib/redux-provider'
import ClientLayout from './ClientLayout'

export default function AppClientWrapper({ children }) {
  return (
    <ReduxProvider>
      <ClientLayout>{children}</ClientLayout>
    </ReduxProvider>
  )
}
