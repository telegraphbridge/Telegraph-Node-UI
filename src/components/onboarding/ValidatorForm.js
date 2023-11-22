import React from 'react';

const ValidatorForm = ({ handleCreateValidator }) => {
  const validatorQuestions = [
    { label: 'Validator Moniker(nickname):', type: 'text', id: 'validatorMoniker', name: 'moniker' },
    { label: 'Domain(site or I.P.):', type: 'text', example: "domain.example.com", id: 'validatorDomain', name: 'domain' },
  ];

  return (
    <form>
      {validatorQuestions.map(question => (
        <div key={question.id}>
          <label htmlFor={question.id}>{question.label}</label>
          <input type={question.type} id={question.id} name={question.name} />
        </div>
      ))}
      <button className="next-button" onClick={(e) => handleCreateValidator(e)}>Create</button>
    </form>
  );
};

export default ValidatorForm;