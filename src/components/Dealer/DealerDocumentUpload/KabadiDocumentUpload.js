'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image';

import '@/app/styles/DealerDocumentUpload.css';
import upload__document from '@/Image/upload__document.png';
import pdf__image from '@/Image/pdf__image.png';
import tick__image from '@/Image/tick__image.png';
import { apiUrl } from '@/lib/Private';

const KabadiDocumentUpload = () => {
  const [uploadedImage, setUploadedImage] = useState({
    adhaar: '',
    photo: '',
    other: '',
    adhaar__status: upload__document,
    photo__status: upload__document,
    other__status: upload__document,
  });

  const router = useRouter();
  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;

  const uploadImage = (e, filetype) => {
    const file = e.target.files[0];
    const attribute = e.target.name + '__status';

    if (!file) return;

    if (filetype === 'image') {
      if (file.size <= 1024 * 200) {
        setUploadedImage({ ...uploadedImage, [e.target.name]: file, [attribute]: tick__image });
      } else {
        Swal.fire({ title: 'Please upload images below 200KB', confirmButtonColor: '#56b124' });
      }
    }

    if (filetype === 'pdf') {
      if (file.size <= 1024 * 150) {
        setUploadedImage({ ...uploadedImage, [e.target.name]: file, [attribute]: pdf__image });
      } else {
        Swal.fire({ title: 'Please upload PDFs below 150KB', confirmButtonColor: '#56b124' });
      }
    }
  };

  const submitDocument = async (e) => {
    e.preventDefault();

    if (uploadedImage.adhaar && uploadedImage.photo) {
      const data = new FormData();
      data.append('dealer_id', apiKey?.id);
      data.append('Aadhar_card', uploadedImage.adhaar);
      data.append('Pic', uploadedImage.photo);
      if (uploadedImage.other) data.append('OtherDocuments', uploadedImage.other);

      try {
        await axios.post(`${apiUrl}/dealer_details/add_documents/`, data, {
          headers: { 'Content-type': 'multipart/form-data' },
        });
        Swal.fire({ title: 'Documents uploaded', confirmButtonColor: '#56b124' });
        router.push('/dealer/settings');
      } catch (err) {
        console.error(err);
        Swal.fire({ title: 'Invalid file format', confirmButtonColor: '#56b124' });
      }
    } else {
      Swal.fire({ title: 'Please upload required documents', confirmButtonColor: '#56b124' });
    }
  };

  return (
    <form className="dealer__document__upload" onSubmit={submitDocument}>
      <div className="document__upload">
        {['adhaar', 'photo', 'other'].map((field) => (
          <React.Fragment key={field}>
            <input
              type="file"
              accept={field === 'photo' ? 'image/*' : '.pdf'}
              style={{ display: 'none' }}
              id={field}
              name={field}
              onChange={(e) => uploadImage(e, field === 'photo' ? 'image' : 'pdf')}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
            <div>
              <Image src={uploadedImage[`${field}__status`]} alt="" width={40} height={40} />
              <label htmlFor={field}>
                Select {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
              </label>
              {field !== 'other' && <span>Required</span>}
            </div>
          </React.Fragment>
        ))}
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default KabadiDocumentUpload;
