'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image';

import '@/app/styles/DealerDocumentUpload.css';
import upload__document from '@/Image/upload__document.png';
import tick__image from '@/Image/tick__image.png';
import pdf__image from '@/Image/pdf__image.png';
import { apiUrl } from '@/lib/Private';

const RecyclerDocumentUpload = () => {
  const [uploadedImage, setUploadedImage] = useState({
    pan: '',
    adhaar: '',
    gst: '',
    incorporation: '',
    logo: '',
    other: '',
    pan__status: upload__document,
    adhaar__status: upload__document,
    gst__status: upload__document,
    incorporation__status: upload__document,
    logo__status: upload__document,
    other__status: upload__document,
  });

  const router = useRouter();
  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;

  const uploadImage = (e, filetype) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const statusKey = name + '__status';

    if (!file) return;

    if (filetype === 'image') {
      if (file.size <= 1024 * 200) {
        setUploadedImage({ ...uploadedImage, [name]: file, [statusKey]: tick__image });
      } else {
        Swal.fire({ title: 'Please upload images below 200KB', confirmButtonColor: '#56b124' });
      }
    }

    if (filetype === 'pdf') {
      if (file.size <= 1024 * 150) {
        setUploadedImage({ ...uploadedImage, [name]: file, [statusKey]: pdf__image });
      } else {
        Swal.fire({ title: 'Please upload PDFs below 150KB', confirmButtonColor: '#56b124' });
      }
    }
  };

  const submitDocument = async (e) => {
    e.preventDefault();

    const required = ['pan', 'adhaar', 'gst', 'incorporation', 'logo'];
    const allFilled = required.every((field) => uploadedImage[field]);

    if (allFilled) {
      const data = new FormData();
      data.append('dealer_id', apiKey?.id);
      data.append('CompanyPAN', uploadedImage.pan);
      data.append('Aadhar_card', uploadedImage.adhaar);
      data.append('GSTcertificate', uploadedImage.gst);
      data.append('CompanyIncopration', uploadedImage.incorporation);
      data.append('Pic', uploadedImage.logo);
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
      Swal.fire({ title: 'Please upload all required documents', confirmButtonColor: '#56b124' });
    }
  };

  const fields = [
    { id: 'pan', label: 'Company PAN Card', type: 'pdf' },
    { id: 'adhaar', label: 'Aadhaar Card', type: 'pdf' },
    { id: 'gst', label: 'GST Certificate', type: 'pdf' },
    { id: 'incorporation', label: 'Incorporation Certificate', type: 'pdf' },
    { id: 'logo', label: 'Company Logo', type: 'image' },
    { id: 'other', label: 'Other Documents', type: 'pdf' },
  ];

  return (
    <form className="dealer__document__upload" onSubmit={submitDocument}>
      <div className="document__upload">
        {fields.map(({ id, label, type }) => (
          <React.Fragment key={id}>
            <input
              type="file"
              accept={type === 'image' ? 'image/*' : '.pdf'}
              style={{ display: 'none' }}
              id={id}
              name={id}
              onChange={(e) => uploadImage(e, type)}
              onClick={(e) => {
                e.target.value = null;
                setUploadedImage((prev) => ({
                  ...prev,
                  [id]: '',
                  [id + '__status']: upload__document,
                }));
              }}
            />
            <div>
              <Image src={uploadedImage[id + '__status']} alt={id} width={40} height={40} />
              {uploadedImage[id]?.name && <p>{uploadedImage[id].name}</p>}
              <label htmlFor={id}>{label}</label>
              {id !== 'other' && <span>Required</span>}
            </div>
          </React.Fragment>
        ))}
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default RecyclerDocumentUpload;
