'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// css
import '@/app/styles/DealerSettings.css';
import '@/app/styles/App.css';

// component
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';


// icons (Material UI)
import DescriptionIcon from '@mui/icons-material/Description';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const DealerSettings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="dealer__settings__section similar__section">
        <h1 className="similar__section__heading">Complete Your Profile</h1>
        <div className="settings__section">
          <Link className="settings__link" href="/dealer/settings/documents">
            <span>
              <DescriptionIcon />
              <p>Documents Upload</p>
            </span>
          </Link>

          <Link className="settings__link" href="/dealer/settings/area">
            <span>
              <AddLocationIcon />
              <p>Add Area Pincode</p>
            </span>
          </Link>

          <Link className="settings__link" href="/dealer/settings/setprice">
            <span>
              <CreditCardIcon />
              <p>Add Your Price</p>
            </span>
          </Link>

          <Link className="settings__link" href="/dealer/settings/DealerRequestCategory">
            <span>
              <AddToPhotosIcon />
              <p>
                Request to
                <br />
                Add Category
              </p>
            </span>
          </Link>

          <Link className="settings__link" href="/dealer/settings/addemployee">
            <span>
              <PersonAddAltIcon />
              <p>Add Employee</p>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DealerSettings;
