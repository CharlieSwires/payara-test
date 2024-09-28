import React, { useState } from 'react';

function PaymentScreen({ amount, onPaymentAccepted, onPaymentDeclined }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cardName, setCardName] = useState('');
  const [paypalPressed, setPaypalPressed] = useState(false);

  function handlePaypal() {
    setPaypalPressed(!paypalPressed); // Toggle the PayPal button state
  }

  // Validate if PayPal is pressed or card details are filled correctly
  const isPaymentValid = paypalPressed || (cardNumber.length === 16 && cvv.length === 3 && expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) && cardName.length > 0);

  return (
    <div className="container text-center">
      <h1>Payment</h1>
      <p>Amount to be paid: <strong>${amount}</strong></p>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div>
          <button className="btn btn-primary" style={{ marginRight: '10px' }}>Visa</button>
          <button className="btn btn-primary" style={{ marginRight: '10px' }}>Mastercard</button>
          <button className="btn btn-primary" onClick={handlePaypal}>
            {paypalPressed ? 'PayPal Selected' : 'PayPal'}
          </button>
        </div>
      </div>

      {/* Show card details only if PayPal is not selected */}
      {!paypalPressed && (
        <div className="payment-form" style={{ marginTop: '20px' }}>
          <h4>Card Details</h4>

          {/* Cardholder Name */}
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              className="form-control"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Cardholder Name"
              required
            />
          </div>

          {/* Card Number */}
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="16-digit Card Number"
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date (MM/YY)</label>
            <input
              type="text"
              id="expiry"
              className="form-control"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value.replace(/[^0-9\/]/g, '').slice(0, 5))}
              placeholder="MM/YY"
              required
            />
          </div>

          {/* CVV */}
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              className="form-control"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="3-digit CVV"
              required
            />
          </div>
        </div>
      )}

      <div className="payment-actions" style={{ marginTop: '20px' }}>
        <button
          onClick={onPaymentAccepted}
          className="btn btn-success"
          style={{ marginRight: '10px' }}
          disabled={!isPaymentValid} // Disable if payment info is not valid
        >
          Payment Accepted
        </button>
        <button onClick={onPaymentDeclined} className="btn btn-danger">
          Payment Declined
        </button>
      </div>
    </div>
  );
}

export default PaymentScreen;
