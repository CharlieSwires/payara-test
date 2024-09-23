// src/WeightsInputScreen.js
import React from 'react';

function WeightsInputScreen({ peopleList, onWeightsChange, onWeightsSubmit }) {
  const handleSubmit = (personIndex) => {
    onWeightsSubmit(personIndex);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Enter Weights for Each Person</h1>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {peopleList.map((person, personIndex) => (
          <div
            key={personIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px repeat(5, 80px) 100px 120px 220px',
              alignItems: 'center',
              marginBottom: '10px',
              gap: '10px',
            }}
          >
            <span style={{ textAlign: 'right' }}>Person {personIndex + 1}:</span>
            {person.weights.map((weight, weightIndex) => (
              <input
                key={weightIndex}
                type="number"
                value={weight}
                onChange={(e) =>
                  onWeightsChange(personIndex, weightIndex, e.target.value)
                }
                style={{ width: '60px' }}
              />
            ))}
            <button onClick={() => handleSubmit(personIndex)}>Submit</button>
            {/* Display Amount Paid */}
            <input
              type="text"
              value={person.amountPaid}
              readOnly
              placeholder="Amount Paid"
              style={{ width: '100px' }}
            />
            {/* Display Transaction ID */}
            <input
              type="text"
              value={person.transactionId}
              readOnly
              placeholder="Transaction ID"
              style={{ width: '200px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeightsInputScreen;
