import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
export function PayPalBtn(props) {
  const {
    amount,
    currency,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;
  //   const paypalKey = "<paypal-client-id>";
  const paypalKey =
    "ASe0KmsJ6AwDpeqkt11xrHp3-Aa5VlIHTpYm6ikjM1JBR-vRH9FaGFn4Enqz67wa0D8HORLWAG1HeCur&vault=true&intent=subscription";
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        //   vault: true,
        vault: true,
      }}
      //   style={{
      //     shape: "rect",
      //     color: "gold",
      //     layout: "vertical",
      //     label: "subscribe",
      //   }}
      style={{
        shape: "rect",
        color: "blue",
        layout: "horizontal",
        label: "subscribe",
      }}
    />
  );
}
export default PayPalBtn;

// <div id="paypal-button-container"></div>
// <script src="https://www.paypal.com/sdk/js?client-id=ASe0KmsJ6AwDpeqkt11xrHp3-Aa5VlIHTpYm6ikjM1JBR-vRH9FaGFn4Enqz67wa0D8HORLWAG1HeCur&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
// <script>
//   paypal.Buttons({
//       style: {
//           shape: 'rect',
//           color: 'gold',
//           layout: 'vertical',
//           label: 'subscribe'
//       },
//       createSubscription: function(data, actions) {
//         return actions.subscription.create({
//           'plan_id': 'P-06A37889TN3864439MAT3N5Q'
//         });
//       },
//       onApprove: function(data, actions) {
//         alert(data.subscriptionID);
//       }
//   }).render('#paypal-button-container');
// </script>
