import React, { createContext, useContext, useState } from 'react';

const PrintoutContext = createContext();

export const usePrintoutContext = () => useContext(PrintoutContext);

export const PrintoutProvider = ({ children }) => {
  const [printoutData, setPrintoutData] = useState({
    cost: null,
    file: null,
    fileMeta: null,
    colouredPages: '',
    blackAndWhitePages: '',
  });

  const setPrintout = (data) => {
    setPrintoutData(data);
  };

  return (
    <PrintoutContext.Provider value={{ printoutData, setPrintout }}>
      {children}
    </PrintoutContext.Provider>
  );
};
