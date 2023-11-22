import { createContext, useState } from 'react';

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [networks, setNetworks] = useState([]);

  return (
    <NetworkContext.Provider value={{ networks, setNetworks }}>
      {children}
    </NetworkContext.Provider>
  );
};