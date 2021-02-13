import React from "react";
import Paypal from "./PayPal";
import PaypalSubscription from "./PaypalSubscription";

export default function index() {
  return (
    <div>
      <h1>Paypal Payment</h1>
      {/*  <Paypal /> */}
      <PaypalSubscription />
    </div>
  );
}
