import React, { useState } from 'react';
import axios from 'axios';
import './Bkash.css';

const Bkash = () => {
  const [payerReference, setPayerReference] = useState('');
  const [amount, setAmount] = useState('');
  const [merchantInvoiceNumber, setMerchantInvoiceNumber] = useState('');
  const [paymentID, setPaymentID] = useState('');
  const [bkashURL, setBkashURL] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [error, setError] = useState('');

const handleCreatePayment = async () => {
  try {
    const response = await axios.post('https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-payment', {
      mode: '0011',
      payerReference,
      callbackURL: 'https://amarjinis.vercel.app/',
      amount,
      currency: "BDT",
      intent: 'sale',
      merchantInvoiceNumber
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*'
        // Remove 'Authorization', 'X-App-Key', and 'Origin' headers
      }
    });

    const responseData = response.data;
    setPaymentID(responseData.paymentID);
    setBkashURL(responseData.bkashURL);
    setTransactionStatus(responseData.transactionStatus);
    setError('');
  } catch (error) {
    console.error('Error:', error.response.data);
    setError(error.response.data.errorMessage);
  }
};


  return (
    <div className="bkash-main-container">
      <div className="bkash-container">
        <div className="bkash-header">
          <h1>Create Payment</h1>
        </div>
        <div className="bkash-form">
          <input
            type="text"
            placeholder="Payer Reference"
            value={payerReference}
            onChange={(e) => setPayerReference(e.target.value)}
            className="form-control"
          />
          <input
            type="number"
            placeholder="Amount (BDT)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
   
          <input
            type="text"
            placeholder="Merchant Invoice Number"
            value={merchantInvoiceNumber}
            onChange={(e) => setMerchantInvoiceNumber(e.target.value)}
            className="form-control"
          />
          <button className="bkash-button" onClick={handleCreatePayment}>Create Payment</button>
        </div>
        {paymentID && (
          <div className="bkash-response">
            <p>Payment ID: {paymentID}</p>
            <p>Transaction Status: {transactionStatus}</p>
            <a href={bkashURL} target="_blank" rel="noopener noreferrer" className="bkash-link">Proceed to bKash</a>
          </div>
        )}
        {error && <p className="bkash-error">Error: {error}</p>}
      </div>
    </div>
  );
};

export default Bkash;
