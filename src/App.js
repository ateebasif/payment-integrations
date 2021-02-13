import React, { useState } from "react";
import Plans from "./components/plan";
import StripePayment from "./components/stripePayment/index";
import PaypalPayment from "./components/paypaylPayment";
// import SelectPaymentMethod from "./components/selectPaymentMethod/SelectPaymentMethod";
// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  Card,
  makeStyles,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "40%",
    width: "25%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "60%",
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "90%",
    },
    // float: "center",
  },
}));

// stripe promise
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
  // console.log(".env", process.env.REACT_APP_PUBLISHABLE_KEY);
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Plans />

      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#f8006f" }}>Select Your Payment Method</h2>
      </div>

      <SelectPaymentMethod test={"hello"} />

      {/* 
      <div>
        <PaypalPayment />
      </div> */}
    </div>
  );
}

export default App;

function SelectPaymentMethod({ test }) {
  // console.log("prop test", test);
  const classes = useStyles();
  const [pay, setPay] = useState(false);
  const [stri, setStri] = useState(false);

  const handleChange = (e) => {
    console.log("change", e.target.value);

    if (e.target.value === "paypal") {
      setPay(true);
      setStri(false);
    } else if (e.target.value === "creditCard") {
      setPay(false);
      setStri(true);
    }
  };
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <Card className={classes.root}>
          <CardContent>
            <FormControl component="fieldset">
              {/*   <FormLabel component="legend">labelPlacement</FormLabel> */}
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio color="primary" />}
                  label="Credit Card"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio color="primary" />}
                  label="Paypal"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <br />
            <div>
              {pay && <PaypalPayment />}{" "}
              {stri && (
                <Elements stripe={stripePromise}>
                  <StripePayment />{" "}
                </Elements>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

//  <Elements stripe={stripePromise}>
//    <StripePayment />
//  </Elements>;
