'use client';

import React, { useEffect } from 'react';
import '@/app/styles/DealerDocumentUpload.css';
import '@/app/styles/App.css';

// Components
import DealerProfileSearchbar from '@/components/Dealer/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/Dealer/DealerProfileNavbar';
import KabadiDocumentUpload from '@/components/Dealer/DealerDocumentUpload/KabadiDocumentUpload';
import CollectorDocumentUpload from '@/components/Dealer/DealerDocumentUpload/CollectorDocumentUpload';
import RecyclerDocumentUpload from '@/components/Dealer/DealerDocumentUpload/RecyclerDocumentUpload';


const DealerDocumentUpload = () => {
  const apiKey =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('KTMauth'))
      : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderDocumentUploadComponent = () => {
    if (!apiKey) return null;

    const type = apiKey.account_type;
    if (type === 'Kabadi') return <KabadiDocumentUpload />;
    else if (type === 'Collector') return <CollectorDocumentUpload />;
    else if (type === 'Recycler') return <RecyclerDocumentUpload />;
    return null;
  };

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__document__upload__section similar__section">
        <h1 className="similar__section__heading">Upload Your Documents</h1>
        {renderDocumentUploadComponent()}
      </div>


    </>
  );
};

export default DealerDocumentUpload;
