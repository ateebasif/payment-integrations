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
    // width: "25%",
    width: "100%",
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

  rightSide: {
    backgroundImage: `url(https:static-01.daraz.pk/p/5866ec828fccbea4ac5b214f673e29f4.jpg)`,
    backgroundSize: "cover",
    borderRadius: "40px 0 0 40px",
    backgroundRepeat: "noRepeat",
    // height: "100vh",
    marginTop: "-2rem",
  },
}));

// stripe promise
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
  const classes = useStyles();

  // console.log(".env", process.env.REACT_APP_PUBLISHABLE_KEY);
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <div style={{ overflow: "scroll" }}>
            <div style={{ textAlign: "center" }}>
              <Plans />

              <h2 style={{ color: "#f8006f" }}>Select Your Payment Method</h2>
            </div>

            <SelectPaymentMethod test={"hello"} />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={8} className={classes.rightSide}>
          <div style={{ height: "97.3vh", margin: 0 }}>
            <h3>Hello</h3>
          </div>
        </Grid>
      </Grid>

      {/* 
      <div>
        <PaypalPayment />
      </div> */}
    </div>
  );
}

//  root: {
//     maxWidth: "40%",
//     width: "25%",
//     [theme.breakpoints.down("md")]: {
//       maxWidth: "60%",
//       width: "40%",
//     },
//     [theme.breakpoints.down("sm")]: {
//       maxWidth: "100%",
//       width: "90%",
//     },
//     // float: "center",
//   },

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
