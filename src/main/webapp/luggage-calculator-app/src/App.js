// src/App.js
import React, { useState } from 'react';
import WeightsInputScreen from './WeightsInputScreen';
import LuggageCalculator from './LuggageCalculator';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter basename="/payara">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

function App() {
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input' or 'calculator'
  const [selectedWeights, setSelectedWeights] = useState([]);  // Weights selected from Screen 1
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(null); // Index of selected person
  const [peopleList, setPeopleList] = useState(
    Array(5).fill().map(() => ({
      name: '',                  // New name field
      passportNumber: '',         // New passport number field
      weights: Array(5).fill(0),  // Weights for each person
      amountPaid: '',
      transactionId: ''
    }))
  ); // Data for all people

  const [checkInBoothId, setCheckInBoothId] = useState(''); // New state for check-in booth ID
  const [error, setError] = useState(null); // Error state if needed

  const handleWeightsChange = (personIndex, weightIndex, value) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex].weights[weightIndex] = value;
    setPeopleList(newPeopleList);
  };

  const handleWeightsSubmit = (personIndex) => {
    const parsedWeights = peopleList[personIndex].weights.map((w) => parseFloat(w) || 0);
    setSelectedWeights(parsedWeights);
    setSelectedPersonIndex(personIndex);
    setCurrentScreen('calculator');
  };

  const handleBackToInput = () => {
    setCurrentScreen('input');
  };

  const handlePayment = (personIndex, amount, transactionId) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex].amountPaid = amount;
    newPeopleList[personIndex].transactionId = transactionId; // Includes booth ID
    setPeopleList(newPeopleList);
  };

  // New handler for check-in booth ID change
  const handleCheckInBoothIdChange = (value) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10); // Only digits, limit to 10
    setCheckInBoothId(sanitizedValue);
  };

  // New handler for name and passport number changes
  const handlePersonDetailsChange = (personIndex, field, value) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex][field] = value;
    setPeopleList(newPeopleList);
  };

  return (
    <div className="App">
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {currentScreen === 'input' ? (
        <WeightsInputScreen
          peopleList={peopleList}
          onWeightsChange={handleWeightsChange}
          onWeightsSubmit={handleWeightsSubmit}
          checkInBoothId={checkInBoothId}
          onCheckInBoothIdChange={handleCheckInBoothIdChange}
          onPersonDetailsChange={handlePersonDetailsChange} // Handle name and passport change
        />
      ) : (
        <LuggageCalculator
          weightsInput={selectedWeights}
          personIndex={selectedPersonIndex}
          onBack={handleBackToInput}
          onPayment={handlePayment}
          checkInBoothId={checkInBoothId}
        />
      )}
    </div>
  );
}

export default App;
