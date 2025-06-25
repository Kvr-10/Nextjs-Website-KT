'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import axios from 'axios';

// CSS
import '@/app/styles/DealerDocumentUpload.css';

// API URL
import { apiUrl } from '@/lib/Private';

const CollectorDocumentUpload = () => {
  const router = useRouter();

  const [uploadedImage, setUploadedImage] = useState({
    adhaar: '',
    photo: '',
    other: '',
    gst: '',
    adhaar__status: '/Image/upload__document.png',
    photo__status: '/Image/upload__document.png',
    other__status: '/Image/upload__document.png',
    gst__status: '/Image/upload__document.png',
  });

  const apiKey = JSON.parse(typeof window !== 'undefined' && localStorage.getItem('KTMauth'));

  const uploadImage = (e, filetype) => {
    const attribute = `${e.target.name}__status`;
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidImage = filetype === 'image' && file.size <= 1024 * 200;
    const isValidPdf = filetype === 'pdf' && file.size <= 1024 * 150;

    if (isValidImage || isValidPdf) {
      setUploadedImage((prev) => ({
        ...prev,
        [e.target.name]: file,
        [attribute]: filetype === 'image' ? '/Image/tick__image.png' : '/Image/pdf__image.png',
      }));
    } else {
      Swal.fire({
        title: `Please upload ${filetype === 'image' ? 'images under 200KB' : 'PDFs under 150KB'}`,
        confirmButtonColor: '#56b124',
      });
    }
  };

  const submitDocument = async (e) => {
    e.preventDefault();

    if (uploadedImage.adhaar && uploadedImage.photo && uploadedImage.gst) {
      const data = new FormData();
      data.append('dealer_id', apiKey?.id || '');
      data.append('Aadhar_card', uploadedImage.adhaar);
      data.append('Pic', uploadedImage.photo);
      data.append('GSTcertificate', uploadedImage.gst);
      if (uploadedImage.other) {
        data.append('OtherDocuments', uploadedImage.other);
      }

      try {
        await axios.post(`${apiUrl}/dealer_details/add_documents/`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        Swal.fire({
          title: 'Documents uploaded',
          confirmButtonColor: '#56b124',
        });
        router.push('/dealer/settings');
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: 'Upload failed. Check file format.',
          confirmButtonColor: '#56b124',
        });
      }
    } else {
      Swal.fire({
        title: 'Please upload all the required documents',
        confirmButtonColor: '#56b124',
      });
    }
  };

  return (
    <form className="dealer__document__upload" onSubmit={submitDocument}>
      <div className="document__upload">
        {/* Adhaar */}
        <input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          id="adhaar"
          name="adhaar"
          onChange={(e) => uploadImage(e, 'pdf')}
          onClick={(e) => (e.target.value = null)}
        />
        <div>
          <Image src={uploadedImage.adhaar__status} alt="Adhaar status" width={50} height={50} />
          <label htmlFor="adhaar">Select Adhaar Card</label>
          <span>Required</span>
        </div>

        {/* Photo */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="photo"
          name="photo"
          onChange={(e) => uploadImage(e, 'image')}
          onClick={(e) => (e.target.value = null)}
        />
        <div>
          <Image src={uploadedImage.photo__status} alt="Photo status" width={50} height={50} />
          <label htmlFor="photo">Select Your Photo</label>
          <span>Required</span>
        </div>

        {/* GST */}
        <input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          id="gst"
          name="gst"
          onChange={(e) => uploadImage(e, 'pdf')}
          onClick={(e) => (e.target.value = null)}
        />
        <div>
          <Image src={uploadedImage.gst__status} alt="GST status" width={50} height={50} />
          <label htmlFor="gst">GST Certificate</label>
          <span>Required</span>
        </div>

        {/* Other */}
        <input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          id="other"
          name="other"
          onChange={(e) => uploadImage(e, 'pdf')}
          onClick={(e) => (e.target.value = null)}
        />
        <div>
          <Image src={uploadedImage.other__status} alt="Other status" width={50} height={50} />
          <label htmlFor="other">Other Documents</label>
        </div>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default CollectorDocumentUpload;
