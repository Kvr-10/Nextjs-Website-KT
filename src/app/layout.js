import './styles/globals.css';
import AppClientWrapper from '@/components/AppClientWrapper';
import Script from 'next/script'; // ✅ Import Script

export const metadata = {
  title: 'Kabadi Techno',
  description: 'Kabadi Techno - Your Trusted Partner in Waste Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add other head tags if needed */}
      </head>
      <body>
        <AppClientWrapper>{children}</AppClientWrapper>

        {/* ✅ Tawk.to Script */}
        <Script
          id="tawk-to-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/685460452da696190ad853a1/1iu4pg44o';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}