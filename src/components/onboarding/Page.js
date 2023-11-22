import React from 'react';

const Page = ({ title, placeholder }) => (
  <>
    <h2>{title}</h2>
    <p className="placeholder-text">{placeholder}</p>
  </>
);

export default Page;