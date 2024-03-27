import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { cartdataslice } from "./ReduxToolkit/CartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    dispatch(cartdataslice(""));
    localStorage.removeItem("cartdataslice");
    navigate("/dashboard");
    window.location.reload();
   
    event.preventDefault();
   
    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const res = await fetch("/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/checkout",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Customer will be redirected to the return_url
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="mt-4 w-100 btn btn-btn btn-btn btn_get btn_get_two primary "
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
