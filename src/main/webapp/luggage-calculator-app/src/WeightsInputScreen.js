// src/WeightsInputScreen.js
import React from 'react';

function WeightsInputScreen({ peopleList, onWeightsChange, onWeightsSubmit }) {
  const handleSubmit = (personIndex) => {
    onWeightsSubmit(personIndex);
  };

  return (
    <div>
      <h1>Enter Weights for Each Person</h1>
      {peopleList.map((person, personIndex) => (
        <div
          key={personIndex}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
        >
          <span style={{ marginRight: '10px' }}>Person {personIndex + 1}:</span>
          {person.weights.map((weight, weightIndex) => (
            <input
              key={weightIndex}
              type="number"
              value={weight}
              onChange={(e) =>
                onWeightsChange(personIndex, weightIndex, e.target.value)
              }
              style={{ marginRight: '5px', width: '60px' }}
            />
          ))}
          <button
            onClick={() => handleSubmit(personIndex)}
            style={{ marginLeft: '10px' }}
          >
            Submit
          </button>
          {/* Display Amount Paid */}
          <input
            type="text"
            value={person.amountPaid}
            readOnly
            placeholder="Amount Paid"
            style={{ marginLeft: '10px', width: '100px' }}
          />
          {/* Display Transaction ID */}
          <input
            type="text"
            value={person.transactionId}
            readOnly
            placeholder="Transaction ID"
            style={{ marginLeft: '10px', width: '200px' }}
          />
        </div>
      ))}
    </div>
  );
}

export default WeightsInputScreen;
