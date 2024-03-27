import React from "react";
import { Modal } from "react-bootstrap";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm';

const StripeModal = (props) => {
  // Load Stripe with your publishable key
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  // Options for Stripe Elements
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    appearance: {
      // Customize appearance if needed
    },
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Form is removed */}
        {/* onSubmit function is removed */}
        
        <Modal.Header closeButton>
          {/* Removed unnecessary div */}
          <h4>Stripe Payment</h4>
        </Modal.Header>
        
        <Modal.Body className="">
          {/* Wrap the CheckoutForm component with Elements to provide Stripe context */}
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </Modal.Body>

        {/* Removed Modal.Footer */}
      </Modal>
    </>
  );
};

export default StripeModal;
