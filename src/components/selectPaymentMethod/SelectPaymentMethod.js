import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Stripe from "../stripePayment/index";
import Paypal from "../paypaylPayment/index";

import {
  Card,
  makeStyles,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    maxWidth: "40%",
    // float: "center",
  },
});

function SelectPaymentMethod() {
  const classes = useStyle();

  const [selectPaymentMethod, setselectPaymentMethod] = useState("");

  const [pay, setPay] = useState(false);
  const [stri, setStri] = useState(false);

  let s;

  const handleChange = (e) => {
    console.log("change", e.target.value);

    if (e.target.value === "paypal") {
      setselectPaymentMethod("paypal");
      setPay(true);
      setStri(false);
    } else if (e.target.value === "creditCard") {
      setselectPaymentMethod("creditCard");
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
              {pay && <Paypal />} {stri && <Stripe />}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default SelectPaymentMethod;
