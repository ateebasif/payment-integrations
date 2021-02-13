import React, { useState, useRef, useEffect } from "react";
import { act } from "react-dom/test-utils";

export default function PayPal() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const subscriptionRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Sweat Checkout",
                amount: {
                  currency_code: "USD",
                  value: 10.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onCancel: (data) => {
          console.log("The Payment Canceled", data);
        },
        onError: (err) => {
          setError(err);
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paidFor) {
    return <div>Thanks for your purchase.</div>;
  }

  if (error) {
    return <div>Error in Processing payment. Please try again!</div>;
  }

  return (
    <div>
      <h1>pypal componet</h1>
      <div ref={paypalRef} />
    </div>
  );
}
