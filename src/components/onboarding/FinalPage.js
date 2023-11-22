import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/check-circle.json';
import './FinalPage.css';

const FinalPage = () => {
  return (
    <div className="final-page-container">
      <h1 className="header">You're good to go!</h1>
      <div className="checkmark-animation">
        <Lottie animationData={animationData} />
      </div>
    </div>
  );
};

export default FinalPage;