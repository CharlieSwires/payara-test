// src/WeightsInputScreen.js
import React from 'react';

function WeightsInputScreen({ weightsList, onWeightsChange, onWeightsSubmit }) {
  const handleSubmit = (personWeights) => {
    onWeightsSubmit(personWeights);
  };

  return (
    <div>
      <h1>Enter Weights for Each Person</h1>
      {weightsList.map((personWeights, personIndex) => (
        <div
          key={personIndex}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
        >
          <span style={{ marginRight: '10px' }}>Person {personIndex + 1}:</span>
          {personWeights.map((weight, weightIndex) => (
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
            onClick={() => handleSubmit(weightsList[personIndex])}
            style={{ marginLeft: '10px' }}
          >
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}

export default WeightsInputScreen;
