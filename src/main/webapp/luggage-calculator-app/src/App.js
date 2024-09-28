import React, { useState } from 'react';
import WeightsInputScreen from './WeightsInputScreen';
import LuggageCalculator from './LuggageCalculator';
import PaymentScreen from './PaymentScreen'; // PaymentScreen component
import BaggageTicket from './BaggageTicket';  // Import the BaggageTicket component
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input', 'calculator', 'payment'
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

  // Payment state
  const [paymentAmount, setPaymentAmount] = useState(null);

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
    setCurrentScreen('input'); // Go back to input screen after payment
  };

  const handleCheckInBoothIdChange = (value) => {
    setCheckInBoothId(value);
  };

  const handlePersonDetailsChange = (personIndex, field, value) => {
    const newPeopleList = [...peopleList];
    newPeopleList[personIndex][field] = value;
    setPeopleList(newPeopleList);
  };

  // Navigate to Payment Screen
  const handlePay = (personIndex, amount) => {
    setPaymentAmount(amount);  // Pass the amount to be paid
    setSelectedPersonIndex(personIndex);
    setCurrentScreen('payment');  // Navigate to payment screen
  };

  const handlePaymentAccepted = () => {
    const transactionId = generateUniqueId();  // Generate new transaction ID
    handlePayment(selectedPersonIndex, paymentAmount, transactionId);
  };

  const handlePaymentDeclined = () => {
	handlePayment(selectedPersonIndex, null, null);
  };
  // Function to handle showing ticket (screen 3)
  const handleShowTicket = (personIndex) => {
    setSelectedPersonIndex(personIndex); // Set the person to show ticket for
    setCurrentScreen('ticket'); // Navigate to ticket screen
  };

  // Generate unique transaction ID
  function generateUniqueId() {
    const timestamp = Date.now().toString(); // Milliseconds since epoch
    const randomNum = Math.floor(Math.random() * 1e11).toString(); // Random number up to 11 digits
    let transactionId = (timestamp + randomNum).slice(0, 20).padEnd(20, '0');
    // Append check-in booth ID with a "-" separator if provided
    if (checkInBoothId) {
      transactionId += `-${checkInBoothId}`;
    }
    return transactionId;
  }

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
		  onShowTicket={handleShowTicket} // Pass the ticket handling function
        />
      ) : currentScreen === 'calculator' ? (
        <LuggageCalculator
          weightsInput={selectedWeights}
          personIndex={selectedPersonIndex}
          onBack={handleBackToInput}
          onPay={handlePay}  // Handle payment navigation
          checkInBoothId={checkInBoothId}
        />
      ) : currentScreen === 'ticket' ? (
		<BaggageTicket
		  person={peopleList[selectedPersonIndex]} // Pass the person details to the ticket screen
		  onBack={handleBackToInput} // Add a back button to return to the input screen
		/>
	   ) : (
        <PaymentScreen
          amount={paymentAmount}
          onPaymentAccepted={handlePaymentAccepted}  // Navigate back with accepted payment
          onPaymentDeclined={handlePaymentDeclined}  // Navigate back with declined payment
        />
      )}
    </div>
  );
}

export default App;
