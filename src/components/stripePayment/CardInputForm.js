import React, { useState } from "react";
import axios from "axios";

// importing card input field from stripe
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// div styled containers for cardElement
import { CardElementContainer, Row } from "./DivCardContainers";

import {
  // Card,
  makeStyles,
  // Typography,
  Button,
  // Grid,
  // Divider,
  // Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  payBtn: {
    marginTop: "1.5rem",
    // marginRight: "1.5rem",
    marginLeft: "6rem",
    background: "linear-gradient(#42ADD5, #77D6EC)",
    borderRadius: 26,
    color: "#fff",
    boxShadow: "0 5px 25px rgba(66, 173, 213, 0.25)",
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    width: 100,
    [theme.breakpoints.down("md")]: {
      marginLeft: "12rem",
    },
    [theme.breakpoints.down("sm")]: {},
  },
  processingBtn: {
    marginTop: "1.5rem",
    // marginRight: "1.5rem",
    marginLeft: "5rem",
    // background: "linear-gradient(#42ADD5, #77D6EC)",
    background: "linear-gradient(#FBD786,#f7797d)",
    borderRadius: 26,
    color: "#fff",
    // color: "red",
    boxShadow: "0 5px 25px rgba(66, 173, 213, 0.25)",
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    width: 150,
    [theme.breakpoints.down("md")]: {
      marginLeft: "12rem",
    },
    [theme.breakpoints.down("sm")]: {},
  },
}));

export default function CardInputForm({
  selectedPlanPrice,
  setIsPaymentSuccessfull,
}) {
  const classes = useStyles();

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const price = 2;

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError("");
  };

  const handleSUbmit = async (e) => {
    e.preventDefault();
    console.log("submit clicked");

    const billing_details = {
      name: "some",
      email: "some@gmail.com",
      address: {
        city: "san fransisco",
        line1: "185 Berry st",
        state: "california",
        postal_code: 94103,
      },
    };

    setProcessingTo(true);
    const cardElement = elements.getElement("card");

    try {
      // 1 first get client secret
      const { data: clientSecret } = await axios.post(
        "http://localhost:4000/getIntent",
        {
          amount: price * 100,
        }
      );

      // 2  need reference to cardElement
      //    after client secret create a payment method
      //    to create payment_method need stripe.js

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billing_details,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      // 3 confirm the card payment
      //   for that we need payment method id
      //   client_secret

      const confirmedCardPayment = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      console.log("confirmedCardPayment", confirmedCardPayment);

      const { error } = confirmedCardPayment;

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      // onSuccessfulCheckout();
      setProcessingTo(false);

      alert("success");
      setPaymentSuccess(true);
      setIsPaymentSuccessfull(true);
    } catch (err) {
      setCheckoutError(err.message);
    }

    // setisProcessing(false);
  };

  // documentation at // stripe.com/docs/js
  // styling Card Element
  const CardElementOptions = {
    style: {
      // styles for base or as it appears on screen
      base: {
        fontSize: "16px",
        // color: "#fff",
        "::placeholder": {
          //   color: "#87bbfd",
        },
      },
      // styles for invalid input of card
      invalid: {
        color: "#FFC7EE",
        // iconColor: "#FFC7EE",
      },
    },
    // to hide the zip code field in cardElement
    hidePostalCode: true,
  };

  //   console.log("cehckout error", checkoutError);

  return (
    <div>
      {paymentSuccess && (
        <h4 style={{ color: "green", textAlign: "center" }}>
          Payment SuccessFull
        </h4>
      )}
      <form onSubmit={handleSUbmit}>
        <Row>
          <CardElementContainer>
            <CardElement
              options={CardElementOptions}
              onChange={handleCardDetailsChange}
            />
          </CardElementContainer>
        </Row>
        {checkoutError.length < 0 ? (
          ""
        ) : (
          <p style={{ color: "red" }}>{checkoutError}</p>
        )}
        <Button
          className={isProcessing ? classes.processingBtn : classes.payBtn}
          onClick={handleSUbmit}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing...." : `Pay $${selectedPlanPrice}`}
        </Button>
      </form>
    </div>
  );
}
