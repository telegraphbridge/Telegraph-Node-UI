import React, { useState } from 'react';
import './NumberedRows.css';

const NumberedRows = ({ onStepCompleted, pubKey }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [stepOneCompleted, setStepOneCompleted] = useState(false);
    const [stepTwoCompleted, setStepTwoCompleted] = useState(false);
    const [myPubKey, setMyPubKey] = useState(pubKey);

    console.log(myPubKey)

    const copyToClipboard = (e, step) => {
        const input = e.target;
        input.select();
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        if (step === 1) {
            setStepOneCompleted(true);
        } else {
            setStepTwoCompleted(true);
            if (typeof onStepCompleted === 'function') {
                onStepCompleted();
            }
        }
    };

    return (
        <div className="numbered-rows-container">
            <div className="row">
                <div className="circle">1</div>
                <div className="text-container">
                    <p className="row-text">Send 0.123 Hokk Finance to this address</p>
                    <p className="row-text">P.S. It's your node's public key</p>
                    <input
                        type="text"
                        onClick={(e) => copyToClipboard(e, 1)}
                        readOnly
                        value={myPubKey}
                        className="eth-address"
                    />
                    {isCopied && <div className="copied-popup">Copied</div>}
                </div>
            </div>
            <div className={`row ${stepOneCompleted ? '' : 'step-two-inactive'}`}>
                <div className={`circle ${stepOneCompleted ? '' : 'circle-inactive'}`}>2</div>
                <div className="text-container">
                    <p className="row-text">Send 0.123 ETH to this address</p>
                    <input type="text" onClick={(e) => copyToClipboard(e)} readOnly value={myPubKey} className="eth-address" />
                    {isCopied && <div className="copied-popup">Copied</div>}
                </div>
            </div>
        </div>
    );
};

export default NumberedRows;