// src/BaggageTicket.js
import React from 'react';
import QRCode from 'react-qr-code';  // Use react-qr-code for QR code generation

function BaggageTicket({ person, onBack }) {
  return (
    <div className="container text-center">
      <h1>Baggage Ticket for {person.name}</h1>
      <div style={{ margin: '20px 0' }}>
        <h4>Transaction ID: {person.transactionId}</h4>
        <QRCode value={person.transactionId} size={256} />  {/* Display QR code */}
      </div>
      <button onClick={onBack} className="btn btn-primary">
        Back to Input
      </button>
    </div>
  );
}

export default BaggageTicket;
