import React, { useState } from 'react';

const Cptest = () => {
  const [files, setFiles] = useState({ file1: null, file2: null });
  const [pages, setPages] = useState({ pages1: '', pages2: '' });
  const [colouredpages, setColouredPages] = useState({ colouredpages1: '', colouredpages2: '' });

  const handleFileChange = (fileNumber, event) => {
    const newFiles = { ...files, [`file${fileNumber}`]: event.target.files[0] };
    setFiles(newFiles);
  };

  const handlePagesChange = (pageNumber, event) => {
    const newPages = { ...pages, [`pages${pageNumber}`]: event.target.value };
    setPages(newPages);
  };

  const handleColouredPagesChange = (pageNumber, event) => {
    const newColouredPages = { ...colouredpages, [`colouredpages${pageNumber}`]: event.target.value };
    setColouredPages(newColouredPages);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      const file = files[key];
      const pageKey = key.replace('file', 'pages');
      const pagesValue = pages[pageKey];
      const colouredPageKey = key.replace('file', 'colouredpages');
      const colouredPagesValue = colouredpages[colouredPageKey];

      if (file) {
        formData.append('files', file);
        formData.append('pages', pagesValue);
        formData.append('colouredpages', colouredPagesValue);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/stationery/calculate-cost/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Stationery Cost Calculator</h2>
      <form>
        {/* File input tags */}
        <label htmlFor="file1">File 1:</label>
        <input
          type="file"
          id="file1"
          onChange={(e) => handleFileChange(1, e)}
        /><br />

        <label htmlFor="file2">File 2:</label>
        <input
          type="file"
          id="file2"
          onChange={(e) => handleFileChange(2, e)}
        /><br />

        {/* Text input tags for pages */}
        <label htmlFor="pages1">Pages for File 1:</label>
        <input
          type="text"
          id="pages1"
          value={pages.pages1}
          onChange={(e) => handlePagesChange(1, e)}
        /><br />

        <label htmlFor="pages2">Pages for File 2:</label>
        <input
          type="text"
          id="pages2"
          value={pages.pages2}
          onChange={(e) => handlePagesChange(2, e)}
        /><br />

        {/* Text input tags for coloured pages */}
        <label htmlFor="colouredpages1">Pages for coloured File 1:</label>
        <input
          type="text"
          id="colouredpages1"
          value={colouredpages.colouredpages1}
          onChange={(e) => handleColouredPagesChange(1, e)}
        /><br />

        <label htmlFor="colouredpages2">Pages for coloured File 2:</label>
        <input
          type="text"
          id="colouredpages2"
          value={colouredpages.colouredpages2}
          onChange={(e) => handleColouredPagesChange(2, e)}
        /><br />

        <button type="button" onClick={handleSubmit}>Calculate Cost</button>
      </form>
    </div>
  );
};

export default Cptest;
