import React, { useState } from 'react';
import WeightsInputScreen from './WeightsInputScreen';
import LuggageCalculator from './LuggageCalculator';
import BaggageTicket from './BaggageTicket';
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
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input', 'calculator', or 'ticket'
  const [selectedWeights, setSelectedWeights] = useState([]);  // Weights selected from Screen 1
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(null); // Index of selected person
  const [peopleList, setPeopleList] = useState(
    Array(5).fill().map(() => ({
      name: '',
      passportNumber: '',
      weights: Array(5).fill(0),
      amountPaid: '',
      transactionId: ''
    }))
  ); // Data for all people

  const [checkInBoothId, setCheckInBoothId] = useState(''); // Check-in booth ID

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
    newPeopleList[personIndex].transactionId = transactionId;
    setPeopleList(newPeopleList);
  };

  const handleCheckInBoothIdChange = (value) => {
    setCheckInBoothId(value);
  };

  const handlePersonDetailsChange = (personIndex, field, value) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex][field] = value;
    setPeopleList(newPeopleList);
  };

  // Handle Print Button Click for showing the Baggage Ticket
  const handleShowTicket = (personIndex) => {
    setSelectedPersonIndex(personIndex);
    setCurrentScreen('ticket');
  };

  return (
    <div className="App">
      {currentScreen === 'input' ? (
        <WeightsInputScreen
          peopleList={peopleList}
          onWeightsChange={handleWeightsChange}
          onWeightsSubmit={handleWeightsSubmit}
          checkInBoothId={checkInBoothId}
          onCheckInBoothIdChange={handleCheckInBoothIdChange}
          onPersonDetailsChange={handlePersonDetailsChange}
          onShowTicket={handleShowTicket}  // For showing the baggage ticket
        />
      ) : currentScreen === 'calculator' ? (
        <LuggageCalculator
          weightsInput={selectedWeights}
          personIndex={selectedPersonIndex}
          onBack={handleBackToInput}
          onPayment={handlePayment}
          checkInBoothId={checkInBoothId}
        />
      ) : (
        <BaggageTicket
          person={peopleList[selectedPersonIndex]}  // Pass the selected person’s data
          onBack={handleBackToInput}
        />
      )}
    </div>
  );
}

export default App;
