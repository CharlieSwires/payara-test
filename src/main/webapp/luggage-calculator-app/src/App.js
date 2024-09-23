// src/App.js
import React, { useState } from 'react';
import WeightsInputScreen from './WeightsInputScreen';
import LuggageCalculator from './LuggageCalculator';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input' or 'calculator'
  const [selectedWeights, setSelectedWeights] = useState([]);  // Weights selected from Screen 1
  const [weightsList, setWeightsList] = useState(
    Array(5).fill().map(() => Array(5).fill(0))
  ); // Weights for all people

  const handleWeightsChange = (personIndex, weightIndex, value) => {
    const newWeightsList = [...weightsList];
    newWeightsList[personIndex][weightIndex] = value;
    setWeightsList(newWeightsList);
  };

  const handleWeightsSubmit = (personWeights) => {
    // Convert weights to numbers
    const parsedWeights = personWeights.map((w) => parseFloat(w) || 0);
    setSelectedWeights(parsedWeights);
    setCurrentScreen('calculator');
  };

  const handleBackToInput = () => {
    setCurrentScreen('input');
  };

  return (
    <div className="App">
      {currentScreen === 'input' ? (
        <WeightsInputScreen
          weightsList={weightsList}
          onWeightsChange={handleWeightsChange}
          onWeightsSubmit={handleWeightsSubmit}
        />
      ) : (
        <LuggageCalculator
          weightsInput={selectedWeights}
          onBack={handleBackToInput}
        />
      )}
    </div>
  );
}

export default App;
