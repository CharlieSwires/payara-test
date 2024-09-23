// src/App.js
import React, { useState } from 'react';
import WeightsInputScreen from './WeightsInputScreen';
import LuggageCalculator from './LuggageCalculator';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input' or 'calculator'
  const [selectedWeights, setSelectedWeights] = useState([]);  // Weights selected from Screen 1
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(null); // Index of selected person
  const [peopleList, setPeopleList] = useState(
    Array(5).fill().map(() => ({
      weights: Array(5).fill(0),
      amountPaid: '',
      transactionId: ''
    }))
  ); // Data for all people

  const handleWeightsChange = (personIndex, weightIndex, value) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex].weights[weightIndex] = value;
    setPeopleList(newPeopleList);
  };

  const handleWeightsSubmit = (personIndex) => {
    // Convert weights to numbers
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
    newPeopleList[personIndex].transactionId = transactionId;
    setPeopleList(newPeopleList);
  };

  return (
    <div className="App">
      {currentScreen === 'input' ? (
        <WeightsInputScreen
          peopleList={peopleList}
          onWeightsChange={handleWeightsChange}
          onWeightsSubmit={handleWeightsSubmit}
        />
      ) : (
        <LuggageCalculator
          weightsInput={selectedWeights}
          personIndex={selectedPersonIndex}
          onBack={handleBackToInput}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
}

export default App;
