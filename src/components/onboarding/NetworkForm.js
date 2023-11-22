import React from 'react';

const NetworkForm = () => {
  const networkQuestions = [
    { label: "Chain Name:", type: "text", id: "chainname", name: "chainname" },
    { label: "Chain ID:", type: "number", id: "chainid", name: "chainid" },
    { label: "EVM Http URL:", type: "url", id: "EVMHttpURL", name: "EVMHttpURL" },
  ];

  return (
    <form>
      {networkQuestions.map(question => (
        <div key={question.id}>
          <label htmlFor={question.id}>{question.label}</label>
          <input type={question.type} id={question.id} name={question.name}  />
        </div>
      ))}
      <button className="next-button">Submit</button>
    </form>
  );
};

export default NetworkForm;