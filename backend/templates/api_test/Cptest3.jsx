import React, { useState } from 'react';

const Cptest3 = () => {
  const [images, setImages] = useState([]);
  const [picsPerPage, setPicsPerPage] = useState(2); // Default value is 2
  const [pdfUrl, setPdfUrl] = useState('');

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handlePicsPerPageChange = (event) => {
    setPicsPerPage(parseInt(event.target.value));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('pics_per_page', picsPerPage);

    try {
      const response = await fetch('http://panel.mait.ac.in:8005/stationery/img-to-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Image to PDF Converter</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" multiple onChange={handleImageChange} />
        <label>
          Pictures per page:
          <input type="number" value={picsPerPage} onChange={handlePicsPerPageChange} />
        </label>
        <button type="submit">Convert to PDF</button>
      </form>
      {pdfUrl && (
        <div>
          <h2>PDF Generated Successfully!</h2>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        </div>
      )}
    </div>
  );
};

export default Cptest3;
