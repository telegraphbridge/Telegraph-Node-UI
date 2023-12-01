import React, { useState, useContext, createContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  return (
    <ModalContext.Provider value={{
      visibility,
      setVisibility,
      modalContent,
      setModalContent,
      modalTitle,
      setModalTitle,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

const NetworkForm = ({ handleCreateNetwork }) => {

  const { visibility, setVisibility, modalContent, setModalContent, modalTitle, setModalTitle } = useContext(ModalContext);

  // Chain preset values 
  // You may replace the demo chain id and contract addresses
  const defaultNetwork = [
    {
      chainname: 'ETH',
      chainid: 1,
      chaintype: 'EVM',
      contractaddress: '0x27E66e0ea5Abf34d412e21FDADB83B32080A255e',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'ETH-Sepolia',
      chainid: 11155111,
      chaintype: 'EVM',
      contractaddress: '0x40A424C6e75eB7eCCE1A6Bc44F3b440d26FA7FD2',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'BSC',
      chainid: 56,
      chaintype: 'EVM',
      contractaddress: '0xC53E47898620119d23e8E71c17d19343D5Ff1794',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'BSC Testnet',
      chainid: 97,
      chaintype: 'EVM',
      contractaddress: '0xC53E47898620119d23e8E71c17d19343D5Ff1794',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'HECO',
      chainid: 128,
      chaintype: 'EVM',
      contractaddress: '0x1e3A0834Cb8B9ce7e9D10626472Da68E247b4584',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'Polygon',
      chainid: 137,
      chaintype: 'EVM',
      contractaddress: '0x1e3A0834Cb8B9ce7e9D10626472Da68E247b4584',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'Polygon Mumbai Testnet',
      chainid: 80001,
      chaintype: 'EVM',
      contractaddress: '0xC53E47898620119d23e8E71c17d19343D5Ff1794',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'Avalanche',
      chainid: 43114,
      chaintype: 'EVM',
      contractaddress: '0xC53E47898620119d23e8E71c17d19343D5Ff1794',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
    {
      chainname: 'Avalanche Fuji Testnet',
      chainid: 43113,
      chaintype: 'EVM',
      contractaddress: '0xC53E47898620119d23e8E71c17d19343D5Ff1794',
      EVMHttpURL: '',
      EVMWssURL: '',
    },
  ];

  const [networks, setNetworks] = useState(defaultNetwork);

  const isNetworkDone = (network) => (network.EVMHttpURL !== '' && network.EVMWssURL !== '');

  const handleChange = (i, event) => {
    const { name, value } = event.target;
    setNetworks(networks => networks.map((network, index) => index === i ? { ...network, [name]: value } : network));
  };

  const saveNetwork = (event) => {
    event.preventDefault();
    setModalContent(null);
    setVisibility(false);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateNetwork(networks);
  };

  const handleNetworkSelect = index => {
    setModalTitle(`Edit ${networks[index].chainname} Network`);
    setModalContent(
      <form onSubmit={saveNetwork}>
        {Object.keys(networks[index]).map(key =>
          key === 'EVMHttpURL' || key === 'EVMWssURL' ? (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                autoComplete="off"
                className="blockchain-input"
                type="text"
                id={key}
                name={key}
                placeholder={networks[index][key]}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          ) : (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                autoComplete="off"
                className="blockchain-input"
                type="text"
                id={key}
                name={key}
                value={networks[index][key]}
                readOnly
              />
            </div>
          )
        )}
        <button type="submit" className="next-button">Save</button>
        <button type="button" className="cancel-button" onClick={() => setModalContent(null)}>Cancel</button>
      </form>
    );
    setVisibility(true);
  };

  return (
    <div className="networks">
      {networks.map((network, index) => (
        <div
          key={index}
          className={`network-box ${isNetworkDone(network) ? 'done' : ''}`}
          onClick={() => handleNetworkSelect(index)}
        >
          {network.chainname}
          {isNetworkDone(network) && <div className="done-mark"></div>}
        </div>
      ))}
      {networks.every(isNetworkDone) && <button className='next-button' onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

const App = ({handleCreateNetwork}) => (
  <ModalProvider>
    <NetworkForm handleCreateNetwork={data => handleCreateNetwork(data)} />
    <Modal />
  </ModalProvider>
);

const Modal = () => {
  const { visibility, setVisibility, modalContent, modalTitle } = useContext(ModalContext);

  const handleClick = () => {
    setVisibility(false);
  };

  if (!visibility) return null;

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{modalTitle}</h3>
        {modalContent}
      </div>
    </div>
  );
};

export default App;