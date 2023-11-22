import React, { useState } from 'react';

const WalletInfo = ({ wallet }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const togglePrivateKey = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  return (
    <div>
      <p>Public Key: {wallet.publicKey}</p>
      <button className="show-hide-button" onClick={togglePrivateKey}>
        {showPrivateKey ? "Hide" : "Show"} Private Key
      </button>
      {showPrivateKey && <p>Private Key: {wallet.privateKey}</p>}
    </div>
  );
};

export default WalletInfo;