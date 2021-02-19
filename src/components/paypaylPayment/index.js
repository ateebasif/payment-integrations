import React from "react";
import Paypal from "./PayPal";
import PaypalSubscription from "./PaypalSubscription";

export default function index({ selectedPlanPrice, setIsPaymentSuccessfull }) {
  return (
    <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
      {/*    <h1>Paypal Payment</h1>
      <h4>Selected Plan Price is {selectedPlanPrice}$</h4> */}
      {/*  <Paypal /> */}
      <PaypalSubscription setIsPaymentSuccessfull={setIsPaymentSuccessfull} />
    </div>
  );
}
