import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import PayPalBtn from "./PayPalBtn";

function PaypalSubscription({ setIsPaymentSuccessfull }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);

  const paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-06A37889TN3864439MAT3N5Q",
      // plan_id: "<plan-id>",
    });
  };
  const paypalOnError = (err) => {
    console.log("Error", err);
    setError(err);
  };

  const paypalOnCancel = (err) => {
    console.log("Canceled", err);
    setCancel(true);
    // setError(err);
  };
  const paypalOnApprove = (data, detail) => {
    // call the backend api to store transaction details
    setPaidFor(true);
    console.log("Payapl approved");
    console.log(data.subscriptionID);
    setIsPaymentSuccessfull(true);
  };

  if (paidFor) {
    return <div>Thanks for your purchase.</div>;
  }

  if (cancel) {
    return <div> Processing payment Canceld.</div>;
  }

  if (error) {
    return <div>Error in Processing payment. Please try again!</div>;
  }

  return (
    <div className="App">
      <PayPalBtn
        // amount="<amount>"
        amount="20.00"
        currency="USD"
        createSubscription={paypalSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnCancel}
      />
    </div>
  );
}
export default PaypalSubscription;
