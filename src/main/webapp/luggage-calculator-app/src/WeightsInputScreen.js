// src/WeightsInputScreen.js
import React from 'react';

function WeightsInputScreen({ peopleList, onWeightsChange, onWeightsSubmit }) {
  const handleSubmit = (personIndex) => {
    onWeightsSubmit(personIndex);
  };

  return (
    <div className="container">
      <h1 className="text-center">Enter Weights for Each Person</h1>
      {peopleList.map((person, personIndex) => (
        <div
          key={personIndex}
          className="row"
          style={{ marginBottom: '15px', alignItems: 'center' }}
        >
          <div className="col-sm-1 text-right">
            <label style={{ marginTop: '7px' }}>Person {personIndex + 1}:</label>
          </div>
          {/* Weight Inputs */}
          {person.weights.map((weight, weightIndex) => (
            <div key={weightIndex} className="col-sm-1">
              <input
                type="number"
                className="form-control"
                value={weight}
                onChange={(e) =>
                  onWeightsChange(personIndex, weightIndex, e.target.value)
                }
              />
            </div>
          ))}
          {/* Submit Button */}
          <div className="col-sm-1">
            <button
              onClick={() => handleSubmit(personIndex)}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          {/* Amount Paid */}
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              value={person.amountPaid}
              readOnly
              placeholder="Amount Paid"
            />
          </div>
          {/* Transaction ID */}
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              value={person.transactionId}
              readOnly
              placeholder="Transaction ID"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeightsInputScreen;
