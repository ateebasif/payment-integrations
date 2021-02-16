import React from "react";
import CardInputForm from "./CardInputForm";

export default function index({ selectedPlanPrice, setIsPaymentSuccessfull }) {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <h4>Selected Plan Price is {selectedPlanPrice}$</h4>

      <div>
        <CardInputForm
          selectedPlanPrice={selectedPlanPrice}
          setIsPaymentSuccessfull={setIsPaymentSuccessfull}
        />
      </div>
    </div>
  );
}
