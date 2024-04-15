import React, { useState } from 'react';

const Cptest = () => {
  const [files, setFiles] = useState({ file1: null, file2: null });
  const [pages, setPages] = useState({ pages1: '', pages2: '' });
  const [colouredpages, setColouredPages] = useState({ colouredpages1: '', colouredpages2: '' });
  const [costs, setCosts] = useState({ cost1: '', cost2: '' });
  const [printOnOneSide, setPrintOnOneSide] = useState({ print1: false, print2: false });
  const [customMessages, setCustomMessages] = useState({ message1: '', message2: '' });

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

  const handleCostsChange = (costNumber, event) => {
    const newCosts = { ...costs, [`cost${costNumber}`]: event.target.value };
    setCosts(newCosts);
  };

  const handlePrintOnOneSideChange = (pageNumber, event) => {
    const newPrintOnOneSide = { ...printOnOneSide, [`print${pageNumber}`]: event.target.checked };
    setPrintOnOneSide(newPrintOnOneSide);
  };

  const handleCustomMessagesChange = (messageNumber, event) => {
    const newCustomMessages = { ...customMessages, [`message${messageNumber}`]: event.target.value };
    setCustomMessages(newCustomMessages);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      const file = files[key];
      const pageKey = key.replace('file', 'pages');
      const pagesValue = pages[pageKey];
      const colouredPageKey = key.replace('file', 'colouredpages');
      const colouredPagesValue = colouredpages[colouredPageKey];
      const costKey = key.replace('file', 'cost');
      const costValue = costs[costKey];
      const printKey = key.replace('file', 'print');
      const printValue = printOnOneSide[printKey];
      const messageKey = key.replace('file', 'message');
      const messageValue = customMessages[messageKey];

      if (file) {
        formData.append('files', file);
        formData.append('pages', pagesValue);
        formData.append('colouredpages', colouredPagesValue);
        formData.append('costs', costValue);
        formData.append('print_on_one_side_list', printValue);
        formData.append('custom_messages', messageValue);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/stationery/create-printout/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzODA0OTEwLCJpYXQiOjE3MTEyMTI5MTAsImp0aSI6IjZmOWEzOWQ4NDhlODQ2M2VhMTA4NGYyMTlkMWQ5NDBiIiwiZW1haWwiOiJjaGFubWVldHNpbmdoc2FobmlAZ21haWwuY29tIn0.eM5MsmiZIiSk3pAy5X4wITIlxnSjNkQ2hm40boKu54g'
        }
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

        {/* Text input tags for costs */}
        <label htmlFor="cost1">Cost for File 1:</label>
        <input
          type="text"
          id="cost1"
          value={costs.cost1}
          onChange={(e) => handleCostsChange(1, e)}
        /><br />

        <label htmlFor="cost2">Cost for File 2:</label>
        <input
          type="text"
          id="cost2"
          value={costs.cost2}
          onChange={(e) => handleCostsChange(2, e)}
        /><br />

        {/* Checkbox input tags for print on one side */}
        <label htmlFor="print1">Print on one side for File 1:</label>
        <input
          type="checkbox"
          id="print1"
          checked={printOnOneSide.print1}
          onChange={(e) => handlePrintOnOneSideChange(1, e)}
        /><br />

        <label htmlFor="print2">Print on one side for File 2:</label>
        <input
          type="checkbox"
          id="print2"
          checked={printOnOneSide.print2}
          onChange={(e) => handlePrintOnOneSideChange(2, e)}
        /><br />

        {/* Text input tags for custom messages */}
        <label htmlFor="message1">Custom message for File 1:</label>
        <input
          type="text"
          id="message1"
          value={customMessages.message1}
          onChange={(e) => handleCustomMessagesChange(1, e)}
        /><br />

        <label htmlFor="message2">Custom message for File 2:</label>
        <input
          type="text"
          id="message2"
          value={customMessages.message2}
          onChange={(e) => handleCustomMessagesChange(2, e)}
        /><br />

        <button type="button" onClick={handleSubmit}>Calculate Cost</button>
      </form>
    </div>
  );
};

export default Cptest;